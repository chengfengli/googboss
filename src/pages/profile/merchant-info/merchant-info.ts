import {MerchantDetailInfoModalPage} from "./../../../components/merchant-detail-info-modal/merchant-detail-info-modal";
import {ConfigService} from "../../../providers/config-service";
import {DailyLoanService} from "./../../../requests/loan/daily-loan-service";
import {FastLoanService} from "./../../../requests/loan/fast-loan-service";
import {LoanType} from "../../../enums/loan-type";
import {Merchant} from "./../../../models/merchant/merchant";
import {AddMerchantPage} from "./../add-merchant/add-merchant";
import {StubService} from "./../../../requests/stub/stub-service";
import {HudService} from "./../../../providers/hud-service";
import {Component, trigger, state, animate, transition, style, ViewChild} from "@angular/core";
import { NavParams, Platform, Refresher, Events, ModalController, Alert } from "ionic-angular";
import {PermissionPage} from "./../../base/permission/permission";
import {MerchantService} from "../../../requests/merchant/merchant-service";
import {UserMerchant} from "../../../models/merchant/user-merchant";
import {MerchantSerchInfo} from "../../../models/network/request/merchant/merchant-serch-info";
import {Util} from "../../../utils/util";
import {BindMerchantInfo} from "../../../models/network/request/merchant/bind-merchant-info";

/*
 Generated class for the MerchantInfo page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-merchant-info',
    templateUrl: 'merchant-info.html',
    animations: [
        trigger('editState', [
            state('hide', style({
                marginLeft: '-31px'
            })),
            state('show', style({
                marginLeft: 0
            })),
            transition('show => hide', animate('200ms ease-in')),
            transition('hide => show', animate('200ms ease-out'))
        ])
    ]
})
export class MerchantInfoPage extends PermissionPage {
    isSelect = false;
    edit = 'hide';
    merchants: UserMerchant[] = [];
    @ViewChild(Refresher) refresher: Refresher;
    loanType: LoanType;
    alertHud: Alert;

    constructor(public hudService: HudService, public fastLoanService: FastLoanService, public dailyLoanService: DailyLoanService, public events: Events, public navParams: NavParams, public stubService: StubService, public merchantService: MerchantService, public platform: Platform, public modalCtrl: ModalController) {
        super(stubService);
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'MerchantInfoPage';
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        super.ionViewWillLeave();
        console.log('ionViewDidLoad MerchantInfoPage');
        this.isSelect = this.navParams.get('isSelect');
        this.loanType = this.navParams.get('loanType');
    }
    
    ionViewWillLeave() {
        super.ionViewWillLeave();
        if (this.alertHud) {
            this.alertHud.dismiss();
        }
    }


    ionViewDidEnter() {
        super.ionViewDidEnter();
        this.beginRefresh();
    }

    doRefresh(refresher) {
        this.listMyMerchants();
    }

    remove(event, merchant) {
        event.preventDefault();
      this.alertHud = this.hudService.getAlert('提示', '确定删除该商户吗？', [
            {
                text: '取消',
                role: 'cancel',
                handler: () => {

                }
            },
            {
                text: '确定',
                handler: () => {
                    this.removeMerchant(merchant);
                }
            }
        ]);
        this.alertHud.present();
    }

    shouldShowEdit() {
        if (this.loanType === LoanType.DailyLoan || this.loanType === LoanType.FastLoan) {
            return false;
        }
        return true;
    }

    shouldShowAdd() {
        if (this.loanType === LoanType.DailyLoan || this.loanType === LoanType.FastLoan || this.edit !== 'hide') {
            return false;
        }
        return true;
    }

    listMyMerchants() {
        if (this.loanType === LoanType.DailyLoan) {
            this.dailyLoanService.listQualifiedMerchants((merchants) => {
                this.shouldShowNetError = false;
                if (Util.isNotNullOrUndefined(merchants)) {
                    this.merchants = merchants;
                } else {
                    this.merchants = [];
                }
                this.refresher.complete();
                this.updateNoDateStatus();
            }, () => {
                this.shouldShowNetError = false;
                this.refresher.complete();
                this.updateNoDateStatus();
            }, () => {
                this.updateNetworkErrorShade();
            });
        } else if (this.loanType === LoanType.FastLoan) {
            this.fastLoanService.listQualifiedMerchants(merchants => {
                this.shouldShowNetError = false;
                if (Util.isNotNullOrUndefined(merchants)) {
                    this.merchants = merchants;
                } else {
                    this.merchants = [];
                }
                this.refresher.complete();
                this.updateNoDateStatus();
            }, () => {
                this.shouldShowNetError = false;
                this.refresher.complete();
                this.updateNoDateStatus();
            }, () => {
                this.updateNetworkErrorShade();
            });
        } else {
            let merchantSerchInfo = new MerchantSerchInfo();
            merchantSerchInfo.pageNo = -1;
            merchantSerchInfo.pageSize = -1;
            this.merchantService.listUserMerchans(merchantSerchInfo, merchants => {
                this.shouldShowNetError = false;
                if (Util.isNotNullOrUndefined(merchants)) {
                    this.merchants = merchants;
                } else {
                    this.merchants = [];
                }
                this.refresher.complete();
                this.updateNoDateStatus();
            }, () => {
                this.shouldShowNetError = false;
                this.refresher.complete();
                this.updateNoDateStatus();
            }, () => {
                this.updateNetworkErrorShade();
            });
        }
    }

    updateNetworkErrorShade() {
        this.refresher.complete();
        this.shouldShowNetError = true;
        this.shouldShowNoData = false;
    }

    shouldShowBigAmount(merchant: UserMerchant) {
        if (this.merchants.length === 1) {
            return false;
        }
        merchant.preCredit
        let preCredits = this.merchants.map((merchant) => {
            return merchant.preCredit;
        });
        let bigPreCredit = Math.max(...preCredits);
        if (merchant.preCredit === bigPreCredit) {
            return true;
        }
        return false;
    }

    updateNoDateStatus() {
        if (this.merchants.length === 0) {
            this.shouldShowNoData = true;
        } else {
            this.shouldShowNoData = false;
        }
    }

    removeMerchant(merchant: UserMerchant) {
        let bindMerchantInfo = new BindMerchantInfo();
        bindMerchantInfo.tid = merchant.tid;

        this.merchantService.removeMerchant(bindMerchantInfo, () => {
            let toast = this.hudService.getToast('删除成功');
            toast.onDidDismiss(() => {
                this.beginRefresh();
            });
            toast.present();
        });
    }

    editMerchant() {
        this.edit = this.edit === 'hide' ? 'show' : 'hide';
    }

    addMcht() {
        this.push(AddMerchantPage);
    }

    select(merchant: UserMerchant, event: Event) {
        event.preventDefault();
        if (this.isSelect) {
            if (merchant.status !== Merchant.Status.CERTIFIED) {
                this.hudService.getToast('只能选择已审核的商户').present();
                return;
            }
            this.events.publish('merchant:selected', merchant);
            this.pop();
        }
    }

    beginRefresh() {
        this.refresher._beginRefresh();
    }

    goMchtDetail(e, name, id) {
        e.preventDefault();
        e.stopPropagation();
        let myModal = this.modalCtrl.create(MerchantDetailInfoModalPage, {mchtName: name, mchtCd: id});
        myModal.onDidDismiss((data) => {
            this.shouldShowShade = false;
        })
        myModal.present();
        this.shouldShowShade = true;
    }
}

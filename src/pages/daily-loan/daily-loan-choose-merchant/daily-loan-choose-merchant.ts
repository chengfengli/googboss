import {MerchantDetailInfoModalPage} from "./../../../components/merchant-detail-info-modal/merchant-detail-info-modal";
import {ForgetPwdFirstPage} from "./../../login/forget-pwd-first/forget-pwd-first";
import {LoanType} from "../../../enums/loan-type";
import {UserMerchant} from "../../../models/merchant/user-merchant";
import {Component, ElementRef} from "@angular/core";
import {NavParams, ModalController, Events} from "ionic-angular";
import {Util} from "../../../utils/util";
import {PermissionPage} from "../../base/permission/permission";
import {HudService} from "../../../providers/hud-service";
import {StubService} from "../../../requests/stub/stub-service";
import {MerchantService} from "../../../requests/merchant/merchant-service";
import {MerchantRequestInfo} from "../../../models/network/request/loan/merchant-request-info";
import {EnterPwdModalPage} from "../../../components/enter-pwd-modal/enter-pwd-modal";
import {DailyLoanVerifyInfo} from "../../../models/network/request/loan/daily-loan-verify-info";
import {DailyLoanService} from "../../../requests/loan/daily-loan-service";
import {DailyLoanApplyStatusPage} from "../daily-loan-apply-status/daily-loan-apply-status";
import {DailyLoanStatusRequestInfo} from "../../../models/network/request/loan/daily-loan-status-request-info";
import {MerchantInfoPage} from "../../profile/merchant-info/merchant-info";
import {ConfigService} from "../../../providers/config-service";

/*
 Generated class for the ChooseMerchant page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-daily-loan-choose-merchant',
    templateUrl: 'daily-loan-choose-merchant.html'
})
export class DailyLoanChooseMerchantPage extends PermissionPage {
    merchant: UserMerchant;
    bankNo: string;
    myExtraBankNo = "";
    password: string;
    inputNow: boolean;

    constructor(public hudService: HudService, public events: Events, public stubService: StubService, public merchantService: MerchantService, public navParams: NavParams, public modalCtrl: ModalController, public dailyLoanService: DailyLoanService, public el: ElementRef) {
        super(stubService);
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        this.merchant = this.navParams.get('selectedMerchant');
        this.getDefaultMerchant();
        this.events.subscribe('merchant:selected', (merchant) => {
            if (Util.isNotNullOrUndefined(merchant)) {
                if (!Util.isEqualsValue(this.merchant, merchant)) {
                    this.merchant = merchant;
                    this.myExtraBankNo = '';
                    this.bankNo = ''
                    this.getMchtStlmBank();
                }
            }
        });
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'DailyLoanChooseMerchantPage';
    }

    ionViewWillUnload() {
        super.ionViewWillUnload();
        this.events.unsubscribe('merchant:selected');
    }

    shouldShowMerchantInfo() {
        if (Util.isNotNullOrUndefined(this.merchant)) {
            return true;
        }
        return false;
    }

    ionViewDidEnter() {
        super.ionViewDidEnter();
    }

    goMerchantList() {
        this.push(MerchantInfoPage, {isSelect: true, loanType: LoanType.DailyLoan});
    }

    showEnterPwd() {
        let myModal = this.modalCtrl.create(EnterPwdModalPage);
        myModal.onDidDismiss((passwordInfo) => {
            this.shouldShowShade = false;
            if (Util.isNotNullOrUndefined(passwordInfo) && passwordInfo.goForget) {
                setTimeout(() => {
                    this.push(ForgetPwdFirstPage, {mobile: passwordInfo.mobile});
                }, 500)
            } else {
                if (Util.isNotNullOrUndefined(passwordInfo)) {
                    this.password = passwordInfo.password;
                    this.submitDailyLoanVerifyInfo();
                }
            }
        });
        myModal.present();
        this.shouldShowShade = true;
    }

    getDefaultMerchant() {
        if (!Util.isNotNullOrUndefined(this.merchant)) {
            this.dailyLoanService.listQualifiedMerchants(merchants => {
                if (Util.isNotNullOrUndefined(merchants) && merchants.length !== 0) {
                    if (merchants.length === 1) {
                        this.merchant = merchants[0];
                        this.getMchtStlmBank();
                    }
                }
            });
        } else {
            this.getMchtStlmBank();
        }
    }

    getMchtStlmBank() {
        let merchantInfo = new MerchantRequestInfo(this.merchant.mchtCd);
        this.merchantService.getMchtStlmBank(merchantInfo, (bankNo) => {
            this.bankNo = bankNo;
        });
    }

    submitDailyLoanVerifyInfo() {
        let dailyLoanVerifyInfo = new DailyLoanVerifyInfo(this.merchant.mchtCd, this.bankNo, this.password);
        this.dailyLoanService.submitDailyLoanVerify(dailyLoanVerifyInfo, (dailyLoanVerifyResult) => {
            this.push(DailyLoanApplyStatusPage, {
                dailyLoanStatusRequestInfo: new DailyLoanStatusRequestInfo(dailyLoanVerifyResult.applicationTid),
                dailyLoanVerifyResult: dailyLoanVerifyResult,
                selectedMchtCd: this.merchant.mchtCd
            });
        });
    }

    importNum(event) {
        // event.stopPropagation();
        // event.preventDefault();
        // this.myExtraBankNo = this.myExtraBankNo0 + this.myExtraBankNo1 + this.myExtraBankNo2 + this.myExtraBankNo3;
        // let aInputs = this.el.nativeElement.querySelectorAll(".account-box .account-num");
        // if (this.myExtraBankNo.length === 4) {
        //     aInputs[3].focus();
        //     return false;
        // }
        // for (let i = 0; i < aInputs.length; i++) {
        //     if (this.myExtraBankNo.length === i) {
        //         aInputs[i].focus();
        //         return false;
        //     }
        // }
        this.myExtraBankNo = this.myExtraBankNo.replace(/\s/g, "");
        if (this.myExtraBankNo.length === 4) {
            event.target.blur();
        }
    }

    accountFocus() {
        this.el.nativeElement.querySelector("#account-num input").focus();
    }

    // deleteNum(event) {
    //     if (event.keyCode === 8) {
    //         let nowBankNo = this.myExtraBankNo0 + this.myExtraBankNo1 + this.myExtraBankNo2 + this.myExtraBankNo3;
    //         if (nowBankNo.length !== 4 && nowBankNo.length !== 0) {
    //             this.myExtraBankNo = nowBankNo.substring(0, nowBankNo.length - 1);
    //             let aInputs = this.el.nativeElement.querySelectorAll(".account-box .account-num");
    //             for (let i = 0; i < aInputs.length; i++) {
    //                 if (this.myExtraBankNo.length === i) {
    //                     aInputs[i].focus();
    //                     break;
    //                 }
    //             }
    //         }
    //     }
    // }

    goNext() {
        if (this.myExtraBankNo === '' || this.myExtraBankNo.length !== 4) {
            this.hudService.getToast('请填写后放款账户后四位').present();
            return;
        }

        if (this.bankNo.slice(-4) !== this.myExtraBankNo) {
            this.hudService.getToast('放款账户后四位不正确').present();
            return;
        }
        this.showEnterPwd();
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

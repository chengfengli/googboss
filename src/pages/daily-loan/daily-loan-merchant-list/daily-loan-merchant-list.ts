import {MerchantDetailInfoModalPage} from "./../../../components/merchant-detail-info-modal/merchant-detail-info-modal";
import {Observable} from "rxjs";
import {DailyLoanSettingsPage} from "../daily-loan-settings/daily-loan-settings";
import {DailyLoanWithdrawRecordSearchInfo} from "./../../../models/network/request/loan/daily-loan-withdraw-record-search-info";
import {DailyLoanWithdrawRecord} from "./../../../models/network/response/loan/daily-loan-withdraw-record";
import {Component, ViewChild, trigger, state, animate, transition, style, enableProdMode} from "@angular/core";
import {NavParams, Slides, InfiniteScroll, ModalController} from "ionic-angular";
import {PermissionPage} from "../../base/permission/permission";
import {HudService} from "../../../providers/hud-service";
import {UserData} from "../../../storages/user-data";
import {StubService} from "../../../requests/stub/stub-service";
import {DailyLoanService} from "../../../requests/loan/daily-loan-service";
import {DailyLoanDeposit} from "../../../models/network/response/loan/daily-loan-deposit";
import {Util} from "../../../utils/util";
import {DailyLoanWithdrawDepositPage} from "../daily-loan-withdraw-deposit/daily-loan-withdraw-deposit";
import {ConfigService} from "../../../providers/config-service";
enableProdMode();

/*
 Generated class for the TtrMerchantList page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-daily-loan-merchant-list',
    templateUrl: 'daily-loan-merchant-list.html',
    animations: [
        trigger('slideState', [
            state('unactive', style({
                opacity: 0.5,
                transform: "scaleY(0.8)"
            })),
            state('active', style({
                opacity: 1,
                transform: "scaleY(1)"
            })),
            transition('unactive => active', animate('200ms ease-in')),
            transition('active => unactive', animate('200ms ease-out'))
        ])
    ]
})

export class DailyLoanMerchantListPage extends PermissionPage {
    @ViewChild(Slides) slides: Slides;
    @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
    nowTab = 'property';
    currentDailyLoanDeposit: DailyLoanDeposit;
    dailyLoanDeposits: DailyLoanDeposit[] = [new DailyLoanDeposit()];
    withdrawRecords: DailyLoanWithdrawRecord[] = [];
    selectedMchtCd: string;
    pageNo = 1;
    selectedIndex = 0;
    startDate: string;
    endsDate: string;
    nameChangeTimer: Observable<any>;
    nameState: string;
    boxWidth: any;
    nameWidth: any;

    constructor(public navParams: NavParams, public hudService: HudService, public userData: UserData, public stubService: StubService, public dailyLoanService: DailyLoanService, public modalCtrl: ModalController) {
        super(stubService);
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        this.selectedMchtCd = this.navParams.get('selectedMchtCd');
        let nowTab = this.navParams.get('nowTab');
        if (Util.isNotNullOrUndefined(nowTab)) {
            this.nowTab = nowTab;
        }
        this.currentDailyLoanDeposit = this.dailyLoanDeposits[0];
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'DailyLoanMerchantListPage';
    }

    ionViewDidEnter() {
        super.ionViewDidEnter();
        this.getDailyLoanDeposits();
        this.updateSlides();
    }

    ionViewWillLeave() {
        super.ionViewWillLeave()
    }

    updateSlides() {
        this.currentDailyLoanDeposit = this.dailyLoanDeposits[this.selectedIndex];
        this.slides.slideTo(this.selectedIndex);
    }

    nowTabProperty() {
        this.nowTab = 'property';
        this.hasMoreData = false;
    }

    nowTabWithdraw() {
        this.nowTab = 'withdraw';
        this.filterRecords();
        this.hasMoreData = true;
    }

    slideChanged() {
        if (this.slides.getActiveIndex() === this.slides.length()) return false;
        let currentIndex = this.slides.getActiveIndex();
        this.currentDailyLoanDeposit = this.dailyLoanDeposits[currentIndex];
        if (this.nowTab === 'withdraw') {
            this.refresher._beginRefresh();
        }
    }

    getDailyLoanDeposits() {
        this.dailyLoanService.getPassedMchtLoan((dailyLoanDeposits) => {
            if (Util.isNotNullOrUndefined(dailyLoanDeposits)) {
                this.dailyLoanDeposits = dailyLoanDeposits;
                this.currentDailyLoanDeposit = this.dailyLoanDeposits[0];
                if (Util.isNotNullOrUndefined(this.selectedMchtCd)) {
                    this.dailyLoanDeposits.forEach((dailyLoanDeposit, index) => {
                        if (dailyLoanDeposit.mchtCd === this.selectedMchtCd) {
                            this.selectedIndex = index;
                            this.currentDailyLoanDeposit = this.dailyLoanDeposits[this.selectedIndex];
                            setTimeout(() => {
                                this.slides.slideTo(this.selectedIndex);
                            }, 200);
                        }
                    });
                }
                if (this.nowTab === 'withdraw') {
                    this.refresher._beginRefresh();
                }
            }
        });


    }

    getWithdrawRecords() {
        let dailyLoanWithdrawRecordSearchInfo = new DailyLoanWithdrawRecordSearchInfo();
        dailyLoanWithdrawRecordSearchInfo.startTime = this.startDate;
        dailyLoanWithdrawRecordSearchInfo.endTime = this.endsDate;
        dailyLoanWithdrawRecordSearchInfo.mchtCd = this.currentDailyLoanDeposit.mchtCd;
        dailyLoanWithdrawRecordSearchInfo.pageNo = this.pageNo;
        setTimeout(() => {
            this.refresher.complete();
        }, 3000);
        this.dailyLoanService.getWithdrawRecords(dailyLoanWithdrawRecordSearchInfo, (records) => {
            this.refresher.complete();
            this.infiniteScroll.complete();
            if (this.pageNo === 1) {
                if (records && records.length > 0) {
                    this.withdrawRecords = records;
                } else {
                    this.withdrawRecords = [];
                }
                this.hasMoreData = true;
            } else {
                if (records && records.length > 0) {
                    this.withdrawRecords = this.withdrawRecords.concat(records);
                } else {
                    this.hasMoreData = false;
                }
            }
        }, () => {
            this.refresher.complete();
            this.infiniteScroll.complete();
        });
    }

    goToWithdraw(dailyLoanDeposit: DailyLoanDeposit) {
        if (dailyLoanDeposit.withDrawalsAllowoAmt === 0) {
            this.hudService.getToast('可提现金额不足，无法提现').present();
            return;
        }
        this.push(DailyLoanWithdrawDepositPage, {dailyLoanDeposit: dailyLoanDeposit});
    }

    toogleSlideState(dailyLoanDeposit) {
        if (this.currentDailyLoanDeposit === dailyLoanDeposit) {
            return 'active';
        }
        return 'unactive';
    }

    popRoot() {
        this.popToRoot();
    }

    goToSettings() {
        this.push(DailyLoanSettingsPage, {currentDailyLoanDeposit: this.currentDailyLoanDeposit});
    }

    doRefresh(event) {
        this.filterRecords();
    }

    filterRecords() {
        this.pageNo = 1;
        this.withdrawRecords = [];
        this.getWithdrawRecords();
    }

    loadMore(event) {
        this.pageNo = this.pageNo + 1;
        this.getWithdrawRecords();
    }

    showMchtName(i) {
        this.boxWidth = document.querySelector(".merchant-name-box");
        this.nameWidth = document.querySelectorAll(".my-merchant-name");
        if (this.nameWidth[i].offsetWidth >= (this.boxWidth.offsetWidth - 30)) {
            return true;
        } else {
            return false;
        }
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

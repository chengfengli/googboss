import {BrowserPage} from "./../../components/browser/browser";
import {UserService} from "./../../requests/user/user-service";
import {JoinAllinpayPage} from "./../boss/join-allinpay/join-allinpay";
import {BusinessService} from "./../../requests/business/business-service";
import {LoanType} from "../../enums/loan-type";
import {PerfectInfoPage} from "./../profile/perfect-info/perfect-info";
import {ConfigService} from "./../../providers/config-service";
import {FastLoanTabsPage} from "../fast-loan/fast-loan-tabs/fast-loan-tabs";
import {MerchantFundsChartsPage} from "./../business/merchant-funds-charts/merchant-funds-charts";
import {BusinessData} from "../../storages/business-data";
import {BusinessIntroPage} from "./../business/business-intro/business-intro";
import {GetMoneyStatusPage} from "../fast-loan/fast-loan-get-money-status/fast-loan-get-money-status";
import {FastLoanDeposit} from "./../../models/network/response/loan/fast-loan-deposit";
import {FastLoanService} from "./../../requests/loan/fast-loan-service";
import {DailyLoanIntroPage} from "../daily-loan/daily-loan-intro/daily-loan-intro";
import {DailyLoanStatus} from "./../../models/network/response/loan/daily-loan-status";
import {DailyLoanApplyStatusPage} from "../daily-loan/daily-loan-apply-status/daily-loan-apply-status";
import {DailyLoanMerchantListPage} from "../daily-loan/daily-loan-merchant-list/daily-loan-merchant-list";
import {Util} from "./../../utils/util";
import {UserData} from "./../../storages/user-data";
import {DailyLoanService} from "./../../requests/loan/daily-loan-service";
import {FastLoanIntroPage} from "../fast-loan/fast-loan-intro/fast-loan-intro";
import {Component, ViewChild, trigger, state, animate, transition, style} from "@angular/core";
import {Refresher, Events, App, ModalController} from "ionic-angular";
import {SocialSharing} from "ionic-native";
import {BasePage} from "../base/base/base";
import {StubService} from "../../requests/stub/stub-service";
import {DailyLoanMerchantStatus} from "../../models/network/response/loan/daily-loan-merchant-status";
import {DailyLoanContractPage} from "../daily-loan/daily-loan-contract/daily-loan-contract";
import {FastLoanMerchantStatus} from "../../models/network/response/loan/fast-loan-merchant-status";
import {FastLoanApplyInfo} from "../../models/network/response/loan/fast-loan-apply-info";
import {FastLoanApplyStatusPage} from "../fast-loan/fast-loan-apply-status/fast-loan-apply-status";
import {DailyLoanStatusRequestInfo} from "../../models/network/request/loan/daily-loan-status-request-info";


@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    animations: [
        trigger('myBoard', [
            state('next', style({
                top: "100%", display: "block", zIndex: 2
            })),
            state('prev', style({
                top: "-100%", display: "block", zIndex: 1
            })),
            state('now', style({
                top: "0", display: "block", zIndex: 3
            })),
            state('off', style({
                display: "none", top: "0", zIndex: 0
            })),
            transition('next => now', animate('500ms')),
            transition('now => prev', animate('500ms'))
        ])
    ]
})
export class HomePage extends BasePage {
    resetCurrentName(): void {
        ConfigService.currentName = "HomePage";
    }

    banner = 'assets/images/img/banner@2x.png';
    ttrBackground = 'assets/images/img/ttr_p@2x.png';
    kkdBackground = 'assets/images/img/kkd_p@2x.png';
    syjBackground = 'assets/images/img/syj_p@2x.png';
    hasLogin: boolean;
    firstUseBusiness: boolean;
    boardTimer: any;
    boardIndex: number = 0;
    boardTitles = [];
    dailyLoanMerchants: DailyLoanMerchantStatus[] = ConfigService.dailyLoanMerchants;
    fastLoanMerchants: FastLoanMerchantStatus[] = ConfigService.fastLoanMerchants;
    @ViewChild(Refresher) refresher: Refresher;

    constructor(public modalCtrl: ModalController, public app: App, public events: Events, public stubService: StubService, public dailyLoanService: DailyLoanService, public fastLoanService: FastLoanService, public userdData: UserData, public businessData: BusinessData, public businessService: BusinessService, public userService: UserService) {
        super(stubService);
    }

    shareSocial() {
        SocialSharing.share('测试下分享', '测试', 'assets/icon/favicon.ico', 'https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin');
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        this.events.subscribe('refresh:loanlist', () => {
            this.getLatesStatus();
        });
    }

    ionViewDidEnter() {
        super.ionViewDidEnter();
        //TODO: 刷新逻辑优化
        // if (!ConfigService.shouldReloadHome) {
        //     return;
        // }
        this.boardIndex = 0;
        this.userService.getBoardMessage((data) => {
            this.boardTitles = data.results;
            if (this.boardTitles.length < 2) {
                return
            }
            ;
            if (this.boardTitles.length === 2) {
                this.boardTitles = this.boardTitles.concat(this.boardTitles);
            }
            ;
            this.boardTimer = setInterval(() => {
                if (this.boardIndex === this.boardTitles.length - 1) this.boardIndex = -1;
                this.boardIndex++;
            }, 4000)
        });
        this.getLatesStatus();
    }

    ionViewWillLeave() {
        super.ionViewWillLeave();
        clearInterval(this.boardTimer);
    }

    doRefresh(event) {
        this.getLatesStatus();
    }

    changeBoardStatus(index) {
        if (index === this.boardIndex) {
            return "now";
        } else if (index === this.boardIndex + 1 || (this.boardIndex === this.boardTitles.length - 1 && index === 0)) {
            return "next";
        } else if (index === this.boardIndex - 1 || (this.boardIndex === 0 && index === this.boardTitles.length - 1)) {
            return "prev";
        } else {
            return "off";
        }
    }

    getLatesStatus() {
        this.userdData.hasLoggedIn().subscribe((hasLogin) => {
            if (Util.isNotNullOrUndefined(hasLogin)) {
                this.hasLogin = hasLogin;
            } else {
                this.hasLogin = false;
            }
            if (this.hasLogin) {
                ConfigService.shouldReloadHome = false;
                this.getDailyLoanBindMerchantStatus();
                this.getFastLoanBindMerchantStatus();
            }
            setTimeout(() => {
                this.refresher.complete();
            }, 2000);
        });
    }

    goKKD() {
        this.push(FastLoanIntroPage);
    }

    goTTR() {
        this.push(DailyLoanIntroPage);
    }

    goSyj() {
        this.businessData.getFirstUse().subscribe(data => {
            if (data && this.hasLogin) {
                this.businessService.enterBusiness((data) => {
                    if (data) {
                        this.push(MerchantFundsChartsPage);
                    } else {
                        this.push(PerfectInfoPage, {loanType: LoanType.Business});
                    }
                })
            } else {
                this.push(BusinessIntroPage)
            }
        });
    }

    goToDailyLoanApplyStatusPage(dailyLoanMerchant: DailyLoanMerchantStatus) {
        if (!dailyLoanMerchant.dailyLoan) {
            this.push(DailyLoanIntroPage, {selectedDailyLoanMerchant: dailyLoanMerchant});
            return;
        }

        if (dailyLoanMerchant.dailyLoan.applyStatus === DailyLoanStatus.LoanApplyStatus.APPLY_SUCCESSED) {
            this.push(DailyLoanMerchantListPage, {selectedMchtCd: dailyLoanMerchant.mchtCd});
        } else if (dailyLoanMerchant.dailyLoan.applyStatus === DailyLoanStatus.LoanApplyStatus.WAITING_SIGN) {
            this.push(DailyLoanContractPage, {dailyLoanStatusRequestInfo: new DailyLoanStatusRequestInfo(dailyLoanMerchant.dailyLoan.tid)});
        } else {
            this.push(DailyLoanApplyStatusPage, {
                dailyLoanStatusRequestInfo: new DailyLoanStatusRequestInfo(dailyLoanMerchant.dailyLoan.tid),
                selectedMchtCd: dailyLoanMerchant.mchtCd
            });
        }
    }

    getDailyLoanBindMerchantStatus() {
        this.dailyLoanService.getBindMerchantStatus((data) => {
            if (Util.isNotNullOrUndefined(data)) {
                if (!Util.isEqualsValue(this.dailyLoanMerchants, data)) {
                    this.dailyLoanMerchants = data;
                    ConfigService.dailyLoanMerchants = this.dailyLoanMerchants;
                }
            } else {
                if (this.dailyLoanMerchants.length !== 0) {
                    this.dailyLoanMerchants = [];
                    ConfigService.dailyLoanMerchants = this.dailyLoanMerchants;
                }
            }
        });
    }

    shouldShowDailyLoanIntro(): boolean {
        return !this.hasLogin || this.dailyLoanMerchants.length === 0;
    }

    goToFastLoanApplyStatusPage(fastLoanMerchant: FastLoanMerchantStatus) {
        if (Util.isNotNullOrUndefined(fastLoanMerchant.application)) {
            if (fastLoanMerchant.application.applyStatus === FastLoanApplyInfo.ApplyStatus.LOAN_FINISHED || fastLoanMerchant.application.applyStatus === FastLoanApplyInfo.ApplyStatus.LOAN_TERMINATE) {
                this.app.getRootNav().push(FastLoanTabsPage, {selectedMchtCd: fastLoanMerchant.application.mchtCd});
            } else if (fastLoanMerchant.application.applyStatus === FastLoanApplyInfo.ApplyStatus.APPLY_SUCCESSED) {
                if (fastLoanMerchant.application.loanCashedStatus == FastLoanDeposit.LoanAuditStatus.ESTABLISH) {
                    this.app.getRootNav().push(FastLoanTabsPage, {selectedMchtCd: fastLoanMerchant.application.mchtCd});
                } else {
                    this.push(GetMoneyStatusPage, {fastLoanApplyInfo: fastLoanMerchant.application});
                }
            } else {
                this.push(FastLoanApplyStatusPage, {fastLoanApplyInfo: fastLoanMerchant.application, backPage: "home"});
            }
        } else {
            this.push(FastLoanIntroPage, {selectedFastLoanMerchant: fastLoanMerchant});
        }
    }

    shouldShowApplyStatus(fastLoanMerchant: FastLoanMerchantStatus): boolean {
        if (Util.isNotNullOrUndefined(fastLoanMerchant.application) && fastLoanMerchant.application.applyStatus !== FastLoanApplyInfo.ApplyStatus.APPLY_SUCCESSED) {
            return true;
        }
        return false;
    }

    showBillInfo(fastLoanMerchant: FastLoanMerchantStatus): boolean {
        if (Util.isNotNullOrUndefined(fastLoanMerchant.application)) {
            if (fastLoanMerchant.application.applyStatus === FastLoanApplyInfo.ApplyStatus.APPLY_SUCCESSED) {
                if (fastLoanMerchant.application.loanCashedStatus === FastLoanDeposit.LoanAuditStatus.ESTABLISH) {
                    return true;
                }
            }
        }
        return false;
    }

    shouldShowPaymentStatus(fastLoanMerchant: FastLoanMerchantStatus): boolean {
        if (Util.isNotNullOrUndefined(fastLoanMerchant.application)) {
            if (fastLoanMerchant.application.applyStatus === FastLoanApplyInfo.ApplyStatus.APPLY_SUCCESSED) {
                if (fastLoanMerchant.application.loanCashedStatus !== FastLoanDeposit.LoanAuditStatus.ESTABLISH) {
                    return true;
                }
            }
        }
        return false;
    }

    shouldCurrentShowRepayment(fastLoanMerchant: FastLoanMerchantStatus) {
        if (Util.isNotNullOrUndefined(fastLoanMerchant.deposit)) {
            if (fastLoanMerchant.deposit.curNeedRepayedTotalAmt > 0) {
                return true;
            }
        }
        return false;
    }

    shouldShowSuccess(dailyLoanMerchant: DailyLoanMerchantStatus) {
        if (!dailyLoanMerchant.dailyLoan) {
            return false;
        }

        if (dailyLoanMerchant.dailyLoan.applyStatus === DailyLoanStatus.LoanApplyStatus.APPLY_SUCCESSED) {
            return true;
        }
        return false;
    }

    shouldShowGoToApply(dailyLoanMerchant: DailyLoanMerchantStatus) {
        if (!dailyLoanMerchant.dailyLoan) {
            return true;
        }
        return false;
    }

    //认证失败
    // shouldShowGoToReason(dailyLoanMerchant: DailyLoanMerchantStatus) {
    //     if (dailyLoanMerchant.dailyLoan.applyStatus === DailyLoanStatus.LoanApplyStatus.NOT_APPLY_YET && dailyLoanMerchant.qualifiedForApply && Util.isNotNullOrUndefined(dailyLoanMerchant.loanStatus.authStatus)) {
    //         return true;
    //     }
    //     return false;
    // }

    getFastLoanBindMerchantStatus() {
        this.fastLoanService.getBindMerchantStatus((data) => {
            if (Util.isNotNullOrUndefined(data)) {
                if (!Util.isEqualsValue(this.fastLoanMerchants, data)) {
                    this.fastLoanMerchants = data;
                    ConfigService.fastLoanMerchants = this.fastLoanMerchants;
                }
            } else {
                if (this.fastLoanMerchants.length !== 0) {
                    this.fastLoanMerchants = [];
                    ConfigService.fastLoanMerchants = this.fastLoanMerchants;
                }
            }
        });
    }

    shouldShowFastLoanIntro(): boolean {
        return !this.hasLogin || this.fastLoanMerchants.length === 0;
    }

    goJoinAllinpay() {
        this.push(JoinAllinpayPage)
    }

    goBoardDetail(id) {
        this.stubService.push(BrowserPage, {
            browser: {
                title: '',
                url: ConfigService.hostURL + '/announcement/detail/' + id + '.htm'
            }
        });
    }
}
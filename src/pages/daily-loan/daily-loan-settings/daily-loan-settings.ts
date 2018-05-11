import {HudService} from "./../../../providers/hud-service";
import {MerchantRequestInfo} from "./../../../models/network/request/loan/merchant-request-info";
import {DailyLoanService} from "./../../../requests/loan/daily-loan-service";
import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";
import {BasePage} from "../../base/base/base";
import {StubService} from "../../../requests/stub/stub-service";
import {DailyLoanDeposit} from "../../../models/network/response/loan/daily-loan-deposit";
import {DailyLoanAntiTransactionStatus} from "../../../models/network/response/loan/daily-loan-anti-transaction-status";
import {DailyLoanAntiTransactionApplyStatus} from "../../../models/network/response/loan/daily-loan-anti-transaction-apply-status";
import {DailyLoanCancelAntiTransactionResponse} from "../../../models/network/response/loan/daily-loan-cancel-anti-transaction-response";
import {DailyLoanAntiTransactionRequestInfo} from "../../../models/network/response/loan/daily-loan--anti-transaction-request-info";
import {Util} from "../../../utils/util";
import {ConfigService} from "../../../providers/config-service";

/*
 Generated class for the TtrSettings page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-daily-loan-settings',
    templateUrl: 'daily-loan-settings.html'
})
export class DailyLoanSettingsPage extends BasePage {
    currentDailyLoanDeposit: DailyLoanDeposit;
    dailyLoanAntiTransactionStatus: DailyLoanAntiTransactionStatus;
    dailyLoanAntiTransactionApplyStatus: DailyLoanAntiTransactionApplyStatus;
    requestLoaded = false;

    constructor(public hudService: HudService, public navParams: NavParams, public stubService: StubService, public dailyLoanService: DailyLoanService) {
        super(stubService);
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'DailyLoanSettingsPage';
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        console.log('ionViewDidLoad DailyLoanSettingsPage');
        this.currentDailyLoanDeposit = this.navParams.get('currentDailyLoanDeposit');
    }

    ionViewDidEnter() {
        super.ionViewDidEnter();
        this.refresher._beginRefresh();
    }

    shouldShowApplyStatus(): boolean {
        if (Util.isNotNullOrUndefined(this.dailyLoanAntiTransactionApplyStatus) && this.dailyLoanAntiTransactionApplyStatus.proStatus !== '') {
            return true;
        }
        return false;
    }

    getAntiTransactionStatus() {
        let merchantRequestInfo = new MerchantRequestInfo(this.currentDailyLoanDeposit.mchtCd);
        this.dailyLoanService.getAntiTransactionStatus(merchantRequestInfo, dailyLoanAntiTransactionStatus => {
            this.dailyLoanAntiTransactionStatus = dailyLoanAntiTransactionStatus;
        });
    }

    getAntiTransactionApplyStatus() {
        let merchantRequestInfo = new MerchantRequestInfo(this.currentDailyLoanDeposit.mchtCd);
        this.dailyLoanService.getAntiTransactionApplyStatus(merchantRequestInfo, dailyLoanAntiTransactionApplyStatus => {
            this.requestLoaded = true;
            this.dailyLoanAntiTransactionApplyStatus = dailyLoanAntiTransactionApplyStatus;
        })
    }

    cancelAntiTransactionApply() {
        let merchantRequestInfo = new MerchantRequestInfo(this.currentDailyLoanDeposit.mchtCd);
        this.dailyLoanService.cancelAntiTransactionApply(merchantRequestInfo, dailyLoanCancelAntiTransactionResponse => {
            if (dailyLoanCancelAntiTransactionResponse.request === DailyLoanCancelAntiTransactionResponse.Request.SUCCESS) {
                let toast = this.hudService.getToast('撤销成功,请稍后下拉查看状态');
                this.requestLoaded = false;
                toast.onDidDismiss(() => {
                    this.refresher._beginRefresh();
                });

                toast.present();
            } else {
                this.hudService.getToast('撤销失败').present();
            }
        });
    }

    doRefresh(event) {
        this.getAntiTransactionApplyStatus();
        this.getAntiTransactionStatus();
                    setTimeout(() => {
                this.refresher.complete();
            }, 2000);
    }

    applyAntiTransaction(dailyLoanAntiTransactionRequestInfo: DailyLoanAntiTransactionRequestInfo) {
        this.dailyLoanService.applyAntiTransaction(dailyLoanAntiTransactionRequestInfo, result => {
            if (result) {
                let toast = this.hudService.getToast('申请成功');
                this.requestLoaded = false;
                toast.onDidDismiss(() => {
                    this.refresher._beginRefresh();
                });
                toast.present();
            } else {
                this.hudService.getToast('申请失败').present();
            }
        });
    }

    shouldShowOpen(): boolean {
        if (Util.isNotNullOrUndefined(this.dailyLoanAntiTransactionStatus) && this.dailyLoanAntiTransactionStatus.retCode === DailyLoanAntiTransactionStatus.RetCode.CLOSE) {

            if (Util.isNotNullOrUndefined(this.dailyLoanAntiTransactionApplyStatus) && this.dailyLoanAntiTransactionApplyStatus.proStatus !== '') {
                if (this.dailyLoanAntiTransactionApplyStatus.proStatus === DailyLoanAntiTransactionApplyStatus.ProStatus.FAILED || this.dailyLoanAntiTransactionApplyStatus.proStatus === DailyLoanAntiTransactionApplyStatus.ProStatus.SUCCESS) {
                    return true;
                }
            } else {
                if (this.requestLoaded) {
                    return true;
                }
            }
        }
        return false;
    }

    shouldShowClose(): boolean {
        if (Util.isNotNullOrUndefined(this.dailyLoanAntiTransactionStatus) && this.dailyLoanAntiTransactionStatus.retCode === DailyLoanAntiTransactionStatus.RetCode.OPEN) {

            if (Util.isNotNullOrUndefined(this.dailyLoanAntiTransactionApplyStatus) && this.dailyLoanAntiTransactionApplyStatus.proStatus !== '') {
                if (this.dailyLoanAntiTransactionApplyStatus.proStatus === DailyLoanAntiTransactionApplyStatus.ProStatus.FAILED || this.dailyLoanAntiTransactionApplyStatus.proStatus === DailyLoanAntiTransactionApplyStatus.ProStatus.SUCCESS) {
                    return true;
                }
            } else {
                if (this.requestLoaded) {
                    return true;
                }
            }
        }
        return false;
    }

    shouldShowCancel(): boolean {
        if (Util.isNotNullOrUndefined(this.dailyLoanAntiTransactionStatus)) {

            if (Util.isNotNullOrUndefined(this.dailyLoanAntiTransactionApplyStatus) && this.dailyLoanAntiTransactionApplyStatus.proStatus !== '') {
                if (this.dailyLoanAntiTransactionApplyStatus.proStatus === DailyLoanAntiTransactionApplyStatus.ProStatus.NEW || this.dailyLoanAntiTransactionApplyStatus.proStatus === DailyLoanAntiTransactionApplyStatus.ProStatus.PROCESSING) {
                    if (this.dailyLoanAntiTransactionStatus.retCode === DailyLoanAntiTransactionStatus.RetCode.CLOSE) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    goToOpen(event: Event) {
        event.preventDefault();
        let dailyLoanAntiTransactionRequestInfo = new DailyLoanAntiTransactionRequestInfo();
        dailyLoanAntiTransactionRequestInfo.mchtCd = this.currentDailyLoanDeposit.mchtCd;
        dailyLoanAntiTransactionRequestInfo.operType = DailyLoanAntiTransactionRequestInfo.OperType.OPEN;
        this.applyAntiTransaction(dailyLoanAntiTransactionRequestInfo);
    }

    goToClose(event: Event) {
        event.preventDefault();
        let dailyLoanAntiTransactionRequestInfo = new DailyLoanAntiTransactionRequestInfo();
        dailyLoanAntiTransactionRequestInfo.mchtCd = this.currentDailyLoanDeposit.mchtCd;
        dailyLoanAntiTransactionRequestInfo.operType = DailyLoanAntiTransactionRequestInfo.OperType.CLOSE;
        this.applyAntiTransaction(dailyLoanAntiTransactionRequestInfo);
    }

    goToCancel(event: Event) {
        event.preventDefault();
        this.cancelAntiTransactionApply();
    }
}

import {Util} from "./../../../utils/util";
import {DailyLoanMerchantListPage} from "../daily-loan-merchant-list/daily-loan-merchant-list";
import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";
import {BasePage} from "../../base/base/base";
import {StubService} from "../../../requests/stub/stub-service";
import {DailyLoanService} from "../../../requests/loan/daily-loan-service";
import {Observable} from "rxjs";
import {DailyLoanStatus} from "../../../models/network/response/loan/daily-loan-status";
import {DailyLoanContractPage} from "../daily-loan-contract/daily-loan-contract";
import {DailyLoanVerifyResult} from "../../../models/network/response/loan/daily-loan-verify-result";
import {DailyLoanStatusRequestInfo} from "../../../models/network/request/loan/daily-loan-status-request-info";
import {ConfigService} from "../../../providers/config-service";

/*
 Generated class for the TtrApplyStatus page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-daily-loan-apply-status',
    templateUrl: 'daily-loan-apply-status.html'
})
export class DailyLoanApplyStatusPage extends BasePage {
    applyStatus: string = 'NOT_LOAD';
    dailyLoanStatusRequestInfo: DailyLoanStatusRequestInfo;
    dailyLoanVerifyResult: DailyLoanVerifyResult;
    timer: Observable<any>;
    subscription: any;
    selectedMchtCd: string;
    searchImg = "assets/images/img/chaxunzhong@2x.png";
    signingImg = "assets/images/img/qianyuezhong@2x.png";

    constructor(public navParams: NavParams, public stubService: StubService, public dailyLoanService: DailyLoanService) {
        super(stubService);
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        this.dailyLoanStatusRequestInfo = this.navParams.get('dailyLoanStatusRequestInfo');
        this.dailyLoanVerifyResult = this.navParams.get('dailyLoanVerifyResult');
        this.selectedMchtCd = this.navParams.get('selectedMchtCd');
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'DailyLoanApplyStatusPage';
    }

    ionViewWillEnter() {
        super.ionViewWillEnter();
    }

    ionViewDidEnter() {
        super.ionViewDidEnter();
        this.timer = Observable.timer(0, 3000);
        this.subscription = this.timer.subscribe((t) => {
            this.getLoanApplyStatus();
        });
    }

    ionViewWillLeave() {
        super.ionViewWillLeave()
        this.subscription.unsubscribe();
    }

    getLoanApplyStatus() {
        if (Util.isNotNullOrUndefined(this.dailyLoanVerifyResult)) {
            if (this.dailyLoanVerifyResult.retCode === 'F') {
                this.applyStatus = DailyLoanStatus.LoanApplyStatus.APPLY_FAILED;
                return;
            }
            if (this.dailyLoanVerifyResult.retCode === 'W') {
                this.applyStatus = DailyLoanStatus.LoanApplyStatus.APPLY_VERIFING;
            }

            if (this.dailyLoanVerifyResult.retCode === 'S') {
                this.dailyLoanService.getLoanApplyStatus(this.dailyLoanStatusRequestInfo, (dailyLoanStatus) => {
                    this.applyStatus = dailyLoanStatus.loanApplyStatus;
                    if (this.applyStatus === DailyLoanStatus.LoanApplyStatus.WAITING_SIGN) {
                        this.push(DailyLoanContractPage, {dailyLoanStatusRequestInfo: this.dailyLoanStatusRequestInfo});
                    }
                });
            }
        } else {
            this.dailyLoanService.getLoanApplyStatus(this.dailyLoanStatusRequestInfo, (dailyLoanStatus) => {
                this.applyStatus = dailyLoanStatus.loanApplyStatus;
                if (this.applyStatus === DailyLoanStatus.LoanApplyStatus.WAITING_SIGN) {
                    this.push(DailyLoanContractPage, {dailyLoanStatusRequestInfo: this.dailyLoanStatusRequestInfo});
                }
            });
        }

        if (this.applyStatus === DailyLoanStatus.LoanApplyStatus.APPLY_SUCCESSED) {
            setTimeout(() => {
                this.push(DailyLoanMerchantListPage, {selectedMchtCd: this.selectedMchtCd});
            }, 3000);
        }
    }

    popRoot() {
        if (this.applyStatus === DailyLoanStatus.LoanApplyStatus.APPLY_SUCCESSED) {
            this.push(DailyLoanMerchantListPage, {selectedMchtCd: this.selectedMchtCd});
        } else {
            this.popToRoot();
        }
    }

}

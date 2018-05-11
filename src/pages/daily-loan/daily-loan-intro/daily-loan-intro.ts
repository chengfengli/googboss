import {DailyLoanService} from "./../../../requests/loan/daily-loan-service";
import {Util} from "../../../utils/util";
import {UserMerchant} from "./../../../models/merchant/user-merchant";
import {LoanType} from "../../../enums/loan-type";
import {StubService} from "./../../../requests/stub/stub-service";
import {BasePage} from "./../../base/base/base";
import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";
import {PerfectInfoPage} from "../../profile/perfect-info/perfect-info";
import {DailyLoanMerchantStatus} from "../../../models/network/response/loan/daily-loan-merchant-status";
import {MerchantRequestInfo} from "../../../models/network/request/loan/merchant-request-info";
import {FastLoanUnavailablePage} from "../../fast-loan/fast-loan-unavailable/fast-loan-unavailable";
import {ConfigService} from "../../../providers/config-service";

/*
 Generated class for the TtrIntro page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-daily-loan-intro',
    templateUrl: 'daily-loan-intro.html'
})
export class DailyLoanIntroPage extends BasePage {
    banner = "assets/images/img/ttr_intro@2x.png";
    selectedDailyLoanMerchant: DailyLoanMerchantStatus;

    constructor(public navParams: NavParams, public stubService: StubService, public dailyLoanService: DailyLoanService) {
        super(stubService);
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        this.selectedDailyLoanMerchant = this.navParams.get('selectedDailyLoanMerchant');
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'DailyLoanIntroPage';
    }

    goProfile() {
        if (Util.isNotNullOrUndefined(this.selectedDailyLoanMerchant)) {
            let merchantRequestInfo = new MerchantRequestInfo(this.selectedDailyLoanMerchant.mchtCd);
            this.dailyLoanService.isQualifiedForApply(merchantRequestInfo, result => {
                if (result.qualified) {
                    let userMerchant = new UserMerchant(this.selectedDailyLoanMerchant.mchtCd, this.selectedDailyLoanMerchant.mchtName)
                    this.push(PerfectInfoPage, {loanType: LoanType.DailyLoan, selectedMerchant: userMerchant});
                } else {
                    this.push(FastLoanUnavailablePage, {errorMsg: result.errorMsg, loanType: LoanType.DailyLoan});
                }
            });
        } else {
            this.push(PerfectInfoPage, {loanType: LoanType.DailyLoan});
        }
    }
}

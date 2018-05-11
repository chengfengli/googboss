import {FastLoanUnavailablePage} from "./../fast-loan-unavailable/fast-loan-unavailable";
import {MerchantRequestInfo} from "./../../../models/network/request/loan/merchant-request-info";
import {FastLoanService} from "./../../../requests/loan/fast-loan-service";
import {Util} from "./../../../utils/util";
import {FastLoanMerchantStatus} from "./../../../models/network/response/loan/fast-loan-merchant-status";
import {LoanType} from "../../../enums/loan-type";
import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";
import {StubService} from "../../../requests/stub/stub-service";
import {BasePage} from "../../base/base/base";
import {PerfectInfoPage} from "../../profile/perfect-info/perfect-info";
import {UserMerchant} from "../../../models/merchant/user-merchant";
import {ConfigService} from "../../../providers/config-service";

/*
 Generated class for the FastLoanIntro page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-fast-loan-intro',
    templateUrl: 'fast-loan-intro.html'
})
export class FastLoanIntroPage extends BasePage {
    banner = "assets/images/img/kkd_intro@2x.png";
    selectedFastLoanMerchant: FastLoanMerchantStatus;
    btnActive = true;

    constructor(public navParams: NavParams, public stubService: StubService, public fastLoanService: FastLoanService) {
        super(stubService);
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        this.selectedFastLoanMerchant = this.navParams.get('selectedFastLoanMerchant');
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'FastLoanIntroPage';
    }

    goProfile() {
        if (Util.isNotNullOrUndefined(this.selectedFastLoanMerchant)) {
            let merchantRequestInfo = new MerchantRequestInfo(this.selectedFastLoanMerchant.mchtCd);
            this.fastLoanService.isQualifiedForApply(merchantRequestInfo, result => {
                if (result.qualified) {
                    let userMerchant = new UserMerchant(this.selectedFastLoanMerchant.mchtCd, this.selectedFastLoanMerchant.mchtName)
                    this.push(PerfectInfoPage, {loanType: LoanType.FastLoan, selectedMerchant: userMerchant});
                } else {
                    this.push(FastLoanUnavailablePage, {errorMsg: result.errorMsg, loanType: LoanType.FastLoan});
                }
            });
        } else {
            this.push(PerfectInfoPage, {loanType: LoanType.FastLoan});
        }
    }
}

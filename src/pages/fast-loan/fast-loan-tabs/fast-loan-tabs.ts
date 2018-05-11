import {Component} from "@angular/core";
import {FastLoanMerchantListPage} from "../fast-loan-merchant-list/fast-loan-merchant-list";
import {FastLoanRepaymentPlanPage} from "../fast-loan-repayment-plan/fast-loan-repayment-plan";
import {FastLoanRepaymentDetailsPage} from "../fast-loan-repayment-details/fast-loan-repayment-details";
import {NavParams} from "ionic-angular";
import {FastLoanMchtDeposit} from "../../../models/network/response/loan/fast-loan-mcht-deposit";

/*
 Generated class for the FastLoanTabs page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-fast-loan-tabs',
    templateUrl: 'fast-loan-tabs.html'
})
export class FastLoanTabsPage {

    tab1Root: any = FastLoanMerchantListPage;
    tab2Root: any = FastLoanRepaymentPlanPage;
    tab3Root: any = FastLoanRepaymentDetailsPage;

    selectedMchtCd: string;
    currentFastLoanMchtDeposit = new FastLoanMchtDeposit();

    constructor(public navParams: NavParams) {
        this.selectedMchtCd = this.navParams.get('selectedMchtCd');
    }

}

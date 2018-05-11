import {FastLoanRepaymentPage} from "../fast-loan-repayment/fast-loan-repayment";
import {FastLoanMchtDeposit} from "./../../../models/network/response/loan/fast-loan-mcht-deposit";
import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";
import {BasePage} from "../../base/base/base";
import {StubService} from "../../../requests/stub/stub-service";
import {ConfigService} from "../../../providers/config-service";

/*
 Generated class for the FastLoanBillingDetails page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-fast-loan-billing-details',
    templateUrl: 'fast-loan-billing-details.html'
})
export class FastLoanBillingDetailsPage extends BasePage {

    fastLoanMchtDeposit: FastLoanMchtDeposit;

    constructor(public navParams: NavParams, public stubService: StubService) {
        super(stubService);
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'FastLoanBillingDetailsPage';
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        this.fastLoanMchtDeposit = this.navParams.get('fastLoanMchtDeposit');
    }

    gotoRepayment() {
        this.push(FastLoanRepaymentPage, {fastLoanMchtDeposit: this.fastLoanMchtDeposit});
    }
}

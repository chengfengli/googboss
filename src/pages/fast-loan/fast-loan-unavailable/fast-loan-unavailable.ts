import {NavParams} from "ionic-angular";
import {StubService} from "./../../../requests/stub/stub-service";
import {BasePage} from "./../../base/base/base";
import {Component} from "@angular/core";
import {ConfigService} from "../../../providers/config-service";
import {LoanType} from "../../../enums/loan-type";

/*
 Generated class for the FastLoanUnavailable page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-fast-loan-unavailable',
    templateUrl: 'fast-loan-unavailable.html'
})
export class FastLoanUnavailablePage extends BasePage {

    errorMsg: string;
    loanType: LoanType;
    loanTypeText: string;

    constructor(public stubService: StubService, public navParams: NavParams) {
        super(stubService);
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        this.errorMsg = this.navParams.get('errorMsg');
        this.loanType = this.navParams.get('loanType');
        if (this.loanType === LoanType.DailyLoan) {
            this.loanTypeText = '天天融';
        } else if (this.loanType === LoanType.FastLoan) {
            this.loanTypeText = '快快贷';
        }
    }

    goBack() {
        this.popToRoot();
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'FastLoanUnavailablePage';
    }
}

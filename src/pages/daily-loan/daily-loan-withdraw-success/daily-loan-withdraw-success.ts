import {DailyLoanMerchantListPage} from "../daily-loan-merchant-list/daily-loan-merchant-list";
import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";
import {BasePage} from "../../base/base/base";
import {StubService} from "../../../requests/stub/stub-service";
import {ConfigService} from "../../../providers/config-service";

/*
 Generated class for the TtrWithdrawSuccess page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-daily-loan-withdraw-success',
    templateUrl: 'daily-loan-withdraw-success.html'
})
export class DailyLoanWithdrawSuccessPage extends BasePage {

    bankNo: string;
    withdrawAmt: string;
    selectedMchtCd: string;

    constructor(public stubService: StubService, public navParams: NavParams) {
        super(stubService);
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        this.bankNo = this.navParams.get('bankNo');
        this.withdrawAmt = this.navParams.get('withdrawAmt');
        this.selectedMchtCd = this.navParams.get('selectedMchtCd');
    }

    gotoTTRList() {
        this.push(DailyLoanMerchantListPage, {selectedMchtCd: this.selectedMchtCd, nowTab: 'withdraw'});
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'DailyLoanWithdrawSuccessPage';
    }
}

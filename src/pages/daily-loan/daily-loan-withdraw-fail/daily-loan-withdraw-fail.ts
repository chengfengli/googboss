import {NavParams} from "ionic-angular";
import {PermissionPage} from "./../../base/permission/permission";
import {StubService} from "./../../../requests/stub/stub-service";
import {Component} from "@angular/core";
import {DailyLoanMerchantListPage} from "../daily-loan-merchant-list/daily-loan-merchant-list";
import {ConfigService} from "../../../providers/config-service";

/*
 Generated class for the TtrWithdrawFail page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-daily-loan-withdraw-fail',
    templateUrl: 'daily-loan-withdraw-fail.html'
})
export class DailyLoanWithdrawFailPage extends PermissionPage {

    failReason: string;

    constructor(public stubService: StubService, public navParams: NavParams) {
        super(stubService);
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        this.failReason = this.navParams.get('failReason');
    }

    gotoTTRList() {
        this.popTo(DailyLoanMerchantListPage);
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'DailyLoanWithdrawFailPage';
    }
}

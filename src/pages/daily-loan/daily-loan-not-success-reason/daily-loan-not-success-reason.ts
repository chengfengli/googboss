import {DailyLoanService} from "../../../requests/loan/daily-loan-service";
import {StubService} from "../../../requests/stub/stub-service";
import {UserData} from "../../../storages/user-data";
import {HudService} from "../../../providers/hud-service";
import {PermissionPage} from "../../base/permission/permission";
import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";
import {DailyLoanMerchantStatus} from "../../../models/network/response/loan/daily-loan-merchant-status";
import {DailyLoanIntroPage} from "../daily-loan-intro/daily-loan-intro";
import {ConfigService} from "../../../providers/config-service";

/*
 Generated class for the DailyLoanNotSuccessReason page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-daily-loan-not-success-reason',
    templateUrl: 'daily-loan-not-success-reason.html'
})

export class DailyLoanNotSuccessReasonPage extends PermissionPage {
    selectedDailyLoanMerchant: DailyLoanMerchantStatus;
    reason: string;

    constructor(public navParams: NavParams, public hudService: HudService, public userData: UserData, public stubService: StubService, public dailyLoanService: DailyLoanService) {
        super(stubService);
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'DailyLoanNotSuccessReasonPage';
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        this.selectedDailyLoanMerchant = this.navParams.get('selectedDailyLoanMerchant');
        // this.reason = this.selectedDailyLoanMerchant.loanStatus.responseDesc;
    }

    ionViewWillEnter() {
        super.ionViewWillEnter();
    }

    goToDailyLoanIntro() {
        this.push(DailyLoanIntroPage, {selectedDailyLoanMerchant: this.selectedDailyLoanMerchant});
    }

}
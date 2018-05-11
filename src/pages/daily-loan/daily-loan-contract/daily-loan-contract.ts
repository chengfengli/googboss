import {DailyLoanService} from "../../../requests/loan/daily-loan-service";
import {StubService} from "../../../requests/stub/stub-service";
import {PermissionPage} from "../../base/permission/permission";
import {Component} from "@angular/core";
import {DailyLoanApplyStatusPage} from "../daily-loan-apply-status/daily-loan-apply-status";
import {DailyLoanStatusRequestInfo} from "../../../models/network/request/loan/daily-loan-status-request-info";
import {NavParams} from "ionic-angular";
import {DailyLoanContractInfo} from "../../../models/network/response/loan/daily-loan-contract-info";
import {ConfigService} from "../../../providers/config-service";

/*
 Generated class for the TtrContract page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-daily-loan-contract',
    templateUrl: 'daily-loan-contract.html'
})
export class DailyLoanContractPage extends PermissionPage {
    dailyLoanStatusRequestInfo: DailyLoanStatusRequestInfo;
    dailyLoanContractInfo: DailyLoanContractInfo;

    constructor(public navParams: NavParams, public stubService: StubService, public dailyLoanService: DailyLoanService) {
        super(stubService);
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        this.dailyLoanStatusRequestInfo = this.navParams.get('dailyLoanStatusRequestInfo');
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'DailyLoanContractPage';
    }

    ionViewWillEnter() {
        super.ionViewWillEnter();
    }

    ionViewDidEnter() {
        super.ionViewDidEnter();
        this.getContactInfo();

    }

    signContract() {
        this.dailyLoanService.submitDailyLoanSign(this.dailyLoanStatusRequestInfo.applicationTid, (dailyLoanApplySignResult) => {
            this.push(DailyLoanApplyStatusPage, {
                dailyLoanStatusRequestInfo: this.dailyLoanStatusRequestInfo,
                selectedMchtCd: this.dailyLoanContractInfo.mchtNo
            });
        });
    }

    goBack() {
        this.popToRoot();
    }

    getContactInfo() {
        this.dailyLoanService.getDailyLoanSignContractInfo(this.dailyLoanStatusRequestInfo, dailyLoanContractInfo => {
            this.dailyLoanContractInfo = dailyLoanContractInfo;
        });
    }

}

import {ConfigService} from "./../../../providers/config-service";
import {LoanType} from "../../../enums/loan-type";
import {BusinessService} from "./../../../requests/business/business-service";
import {UserData} from "./../../../storages/user-data";
import {MyRepaymentListPage} from "./../my-repayment-list/my-repayment-list";
import {MyFastLoanListPage} from "../my-fast-loan-list/my-fast-loan-list";
import {MyTtrListPage} from "../my-daily-loan-list/my-daily-loan-list";
import {BusinessIntroPage} from "./../../business/business-intro/business-intro";
import {PerfectInfoPage} from "./../../profile/perfect-info/perfect-info";
import {MyCustomServicePage} from "./../my-custom-service/my-custom-service";
import {Component} from "@angular/core";
import {NavParams, App} from "ionic-angular";
import {BasePage} from "../../base/base/base";
import {StubService} from "../../../requests/stub/stub-service";
import {BusinessData} from "../../../storages/business-data";
import {MerchantFundsChartsPage} from "../../business/merchant-funds-charts/merchant-funds-charts";
import {Util} from "../../../utils/util";

/*
 Generated class for the BossHome page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-boss-home',
    templateUrl: 'boss-home.html'
})
export class BossHomePage extends BasePage {
    resetCurrentName(): void {
        ConfigService.currentName = "BossHomePage";
    }

    hasLogin: boolean;

    constructor(public app: App, public businessData: BusinessData, public businessService: BusinessService, public navParams: NavParams, public stubService: StubService, public userdData: UserData) {
        super(stubService);
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        this.userdData.hasLoggedIn().subscribe((hasLogin) => {
            if (Util.isNotNullOrUndefined(hasLogin)) {
                this.hasLogin = hasLogin;
            } else {
                this.hasLogin = false;
            }
        });
    }

    ionViewDidEnter() {
        super.ionViewDidEnter();
    }

    goToCallCenter() {
        this.push(MyCustomServicePage);
    }

    goToProfile() {
        this.push(PerfectInfoPage, {myPraise: true});
    }

    goToBusinessHome() {
        this.businessData.getFirstUse().subscribe(data => {
            if (data && this.hasLogin) {
                this.businessService.enterBusiness((data) => {
                    if (data) {
                        this.push(MerchantFundsChartsPage);
                    } else {
                        this.push(PerfectInfoPage, {loanType: LoanType.Business});
                    }
                })
            } else {
                this.push(BusinessIntroPage)
            }
        });
    }

    goToMyDailyLoans() {
        this.push(MyTtrListPage);
    }

    goToMyFastLoans() {
        this.push(MyFastLoanListPage);
    }

    goToMyRepayments() {
        this.push(MyRepaymentListPage);
    }
}

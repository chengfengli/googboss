import { HudService } from './../../../providers/hud-service';
import {ConfigService} from "./../../../providers/config-service";
import {MerchantFundsChartsPage} from "./../merchant-funds-charts/merchant-funds-charts";
import {BusinessService} from "./../../../requests/business/business-service";
import {BusinessData} from "./../../../storages/business-data";
import {PerfectInfoPage} from "./../../profile/perfect-info/perfect-info";
import {LoanType} from "../../../enums/loan-type";
import {UserMerchant} from "./../../../models/merchant/user-merchant";
import {Util} from "./../../../utils/util";
import {FastLoanMerchantStatus} from "./../../../models/network/response/loan/fast-loan-merchant-status";
import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";
import {BasePage} from "../../base/base/base";
import {StubService} from "../../../requests/stub/stub-service";
import { UserData } from "../../../storages/user-data";
import { LoginPage } from "../../login/login/login";

/*
 Generated class for the BusinessIntro page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-business-intro',
    templateUrl: 'business-intro.html'
})
export class BusinessIntroPage extends BasePage {
    resetCurrentName(): void {
        ConfigService.currentName = "BusinessIntroPage";
    }

    introImg1 = 'assets/images/img/p1@2x.png';
    introImg2 = 'assets/images/img/p2@2x.png';
    introImg3 = 'assets/images/img/p3@2x.png';
    introImg4 = 'assets/images/img/p4@2x.png';
    selectedFastLoanMerchant: FastLoanMerchantStatus;

    constructor(public hudService: HudService, public userData: UserData, public navParams: NavParams, public stubService: StubService, public businessData: BusinessData, public businessService: BusinessService) {
        super(stubService);
    }

    ionViewWillEnter() {
        this.selectedFastLoanMerchant = this.navParams.get('selectedFastLoanMerchant');
    }

    goProfile() {
        this.userData.hasLoggedIn().subscribe(hasLoggedIn => {
            if (!hasLoggedIn) {
                let toast = this.hudService.getToast("请先登录！");
                toast.onDidDismiss(() => {
                    this.push(LoginPage);
                });
                toast.present();
                return;
            } else {
                this.businessService.enterBusiness((data) => {
                    if (data) {
                        this.push(MerchantFundsChartsPage);
                        this.businessData.setFirstUse();
                    } else {
                        if (Util.isNotNullOrUndefined(this.selectedFastLoanMerchant)) {
                            this.push(PerfectInfoPage, {
                                loanType: LoanType.Business,
                                selectedMerchant: new UserMerchant(this.selectedFastLoanMerchant.mchtCd, this.selectedFastLoanMerchant.mchtName)
                            });
                        } else {
                            this.push(PerfectInfoPage, { loanType: LoanType.Business });
                        }
                    }
                });
            }
        });
    }
}

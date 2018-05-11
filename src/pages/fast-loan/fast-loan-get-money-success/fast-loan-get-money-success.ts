import {GetMoneyStatusPage} from "../fast-loan-get-money-status/fast-loan-get-money-status";
import {Component} from "@angular/core";
import {NavParams, NavController, App} from "ionic-angular";
import {BasePage} from "../../base/base/base";
import {StubService} from "../../../requests/stub/stub-service";
import {FastLoanApplyInfo} from "../../../models/network/response/loan/fast-loan-apply-info";
import {ConfigService} from "../../../providers/config-service";

/*
 Generated class for the GetMoneySuccess page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-get-money-success',
    templateUrl: 'fast-loan-get-money-success.html'
})
export class GetMoneySuccessPage extends BasePage {

    fastLoanApplyInfo: FastLoanApplyInfo;

    constructor(public stubService: StubService, public navParams: NavParams, public navCtrl: NavController, public app: App) {
        super(stubService);
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'GetMoneySuccessPage';
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        this.fastLoanApplyInfo = this.navParams.get('fastLoanApplyInfo');
        console.log('ionViewDidLoad GetMoneySuccessPage');
        setTimeout(() => {
            this.push(GetMoneyStatusPage, {fastLoanApplyInfo: this.fastLoanApplyInfo});
        }, 3000);
    }

    goBack() {
        this.push(GetMoneyStatusPage, {fastLoanApplyInfo: this.fastLoanApplyInfo});
    }

}

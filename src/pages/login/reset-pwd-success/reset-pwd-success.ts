import {ConfigService} from "./../../../providers/config-service";
import {Component} from "@angular/core";
import {StubService} from "../../../requests/stub/stub-service";
import {BasePage} from "../../base/base/base";
import {LoginPage} from "../login/login";

/*
 Generated class for the ResetPwdSuccess page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-reset-pwd-success',
    templateUrl: 'reset-pwd-success.html'
})
export class ResetPwdSuccessPage extends BasePage {
    hasGoLogin = false;

    resetCurrentName(): void {
        ConfigService.currentName = "ResetPwdSuccessPage";
    }


    constructor(public stubService: StubService) {
        super(stubService);
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        console.log('ionViewDidLoad SignupSuccessPage');
        setTimeout(() => {
            if (!this.hasGoLogin) {
                this.goLoginPage();
            }
        }, 3000);
    }

    goLoginPage() {
        this.hasGoLogin = true;
        this.setRoot(LoginPage, {shouldHideBackButton: true});
    }

}

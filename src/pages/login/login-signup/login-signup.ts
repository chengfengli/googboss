import {ConfigService} from "./../../../providers/config-service";
import {HudService} from "./../../../providers/hud-service";
import {Platform, App} from "ionic-angular";
import {TabsPage} from "./../../tabs/tabs";
import {Component} from "@angular/core";
import {LoginPage} from "../login/login";
import {SignupPage} from "../signup/signup";
import {BasePage} from "../../base/base/base";
import {StubService} from "../../../requests/stub/stub-service";


/*
 Generated class for the LoginSignup page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-login-signup',
    templateUrl: 'login-signup.html'
})
export class LoginSignupPage extends BasePage {
    resetCurrentName(): void {
        ConfigService.currentName = "LoginSignupPage";
    }

    exitTime = 0;

    constructor(private platform: Platform, public stubService: StubService, public app: App, public hudService: HudService) {
        super(stubService);
    }

    ionViewDidEnter() {
        super.ionViewDidEnter();
    }

    doLogin() {
        this.push(LoginPage);
    }

    doSignup() {
        this.push(SignupPage);
    }

    doLook() {
        this.setRoot(TabsPage);
    }
}

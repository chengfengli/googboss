import {ConfigService} from "./../../../providers/config-service";
import {Component, forwardRef, Inject} from "@angular/core";
import {NavParams} from "ionic-angular";
import {BasePage} from "../../base/base/base";
import {StubService} from "../../../requests/stub/stub-service";
import {FormGroup, FormBuilder} from "@angular/forms";
import {MyValidators} from "../../../validators/my-validators";
import {HudService} from "../../../providers/hud-service";
import {UserService} from "../../../requests/user/user-service";
import {ForgetPwdFirstPage} from "../forget-pwd-first/forget-pwd-first";
import {ResetPwdPage} from "../reset-pwd/reset-pwd";
import {LoginMobile} from "../../../models/network/request/user/login-mobile";

/*
 Generated class for the ForgetPwdHome page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-forget-pwd-home',
    templateUrl: 'forget-pwd-home.html'
})
export class ForgetPwdHomePage extends BasePage {
    resetCurrentName(): void {
        ConfigService.currentName = "ForgetPwdHomePage";
    }

    private myForm: FormGroup
    oldUser: boolean;
    kefuImg = "assets/images/img/kefu@2x.png";

    constructor(private formBuilder: FormBuilder, public stubService: StubService, public hudService: HudService, @Inject(forwardRef(() => UserService)) public userServcice: UserService, public navParams: NavParams) {
        super(stubService);
        this.myForm = this.formBuilder.group({
            mobile: ['', MyValidators.getPhoneValidators()]
        });
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        this.oldUser = this.navParams.get('oldUser');
        console.log(this.oldUser);
    }

    nextStep() {
        let mobileControl = this.myForm.controls['mobile'];
        if (!MyValidators.checkPhoneIsValid(mobileControl)) {
            this.hudService.getToast('请先输入正确的手机号').present();
            return;
        }
        let loginMobile = new LoginMobile(mobileControl.value);
        this.userServcice.checkVerified(loginMobile, (verified) => {
            if (verified) {
                this.push(ForgetPwdFirstPage, {mobile: loginMobile.loginMobile});
            } else {
                this.push(ResetPwdPage, {mobile: loginMobile.loginMobile});
            }
        });
    }
}

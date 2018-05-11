import {BindPhonePage} from "./../bind-phone/bind-phone";
import {ConfigService} from "./../../../providers/config-service";
import {HttpService} from "./../../../providers/http-service";
import {SignupPage} from "../signup/signup";
import {TIPS} from "../../../constants/constants";
import {TabsPage} from "../../tabs/tabs";
import {HudService} from "../../../providers/hud-service";
import {Component, forwardRef, Inject} from "@angular/core";
import {App, NavParams} from "ionic-angular";
import {FormBuilder, FormGroup} from "@angular/forms";
import {BasePage} from "../../base/base/base";
import {StubService} from "../../../requests/stub/stub-service";
import {UserService} from "../../../requests/user/user-service";
import {LoginInfo} from "../../../models/network/request/user/login-info";
import {LoginType} from "../../../enums/login-type";
import {MyValidators} from "../../../validators/my-validators";
import {ForgetPwdHomePage} from "../forget-pwd-home/forget-pwd-home";
import {Util} from "../../../utils/util";
import {UserData} from "../../../storages/user-data";

/*
 Generated class for the Login page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage extends BasePage {
    resetCurrentName(): void {
        ConfigService.currentName = "LoginPage";
    }

    backgroundImg = "assets/images/img/bg_t@2x.png";
    loginForm: FormGroup;
    merchantForm: FormGroup;
    isPhoneLogin = true;
    mobile = '';
    mobilePassword = '';
    merchantNo = '';
    merchantPassword = '';
    public shouldHideBackButton = false;

    constructor(@Inject(forwardRef(() => UserService)) public userService: UserService, public stubService: StubService, public util: Util, public formBuilder: FormBuilder,
                public hudService: HudService, public app: App, public navParams: NavParams, public userData: UserData) {
        super(stubService);

        this.initialForm();
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        let hideParam = this.navParams.get('shouldHideBackButton');
        if (Util.isNotNullOrUndefined(hideParam)) {
            this.shouldHideBackButton = hideParam;
        }
        this.mobile = this.navParams.get('mobile');
        this.userData.getAccount().subscribe(account => {
            if (Util.isNotNullOrUndefined(account)) {
                if (account.isPhoneLogin) {
                    this.mobile = account.userName;
                    // this.mobilePassword = account.password;
                } else {
                    this.merchantNo = account.userName;
                    // this.merchantPassword = account.password;
                }
            }
        });
    }

    ionViewDidLeave() {
        HttpService.hasShowLoginPage = false;
    }

    private initialForm() {
        this.loginForm = this.formBuilder.group({
            mobile: ['', MyValidators.getPhoneValidators()],
            password: ['', MyValidators.getPasswordValidators()]
        });
        this.merchantForm = this.formBuilder.group({
            merchant: ['', MyValidators.getMerchantNoValidators()],
            password: ['', MyValidators.getPasswordValidators()]
        });
    }

    private checkFormValid() {
        if (this.isPhoneLogin) {
            this.util.checkFormValid(this.loginForm);
        } else {
            this.util.checkFormValid(this.merchantForm);
        }
    }

    public doLogin(event) {
        event.preventDefault();
        this.checkFormValid();
        let formValue;
        let loginType: LoginType;
        let loginInfo = new LoginInfo();

        if (this.isPhoneLogin) {
            if (!this.loginForm.valid) {
                return;
            }
            formValue = this.loginForm.value;
            loginType = LoginType.Phone;

            // this.userData.getAccount().subscribe((account) => {
            //     loginInfo.password = Util.md5Str(formValue.password);
            //     // if (Util.isNotNullOrUndefined(account)) {
            //     //     if (account.userName === formValue.mobile) {
            //     //         if (account.password === formValue.password) {
            //     //             loginInfo.password = formValue.password;
            //     //         }
            //     //     }
            //     // }
            // });
            loginInfo.loginMobile = formValue.mobile;
            loginInfo.password = Util.md5Str(formValue.password);
            this.login(loginInfo, loginType);
        } else {
            if (!this.merchantForm.valid) {
                return;
            }
            formValue = this.merchantForm.value;
            loginType = LoginType.MerchantNo;
            loginInfo.mchtCd = formValue.merchant;
            loginInfo.password = formValue.password;
            this.login(loginInfo, loginType);
        }
    }

    private login(loginInfo: LoginInfo, loginType: LoginType) {
        this.userService.login(loginInfo, loginType, (authenticationInfo) => {

            if (!Util.isNotNullOrUndefined(authenticationInfo.loginMobile)) {
                this.hudService.getAlert('提示', '登录成功，老商户需要先绑定手机号才能使用', [
                    {
                        text: '确定',
                        handler: () => {
                            this.push(BindPhonePage);
                        }
                    }
                ]).present();
            } else {
                let toast = this.hudService.getToast(TIPS.LOGIN_SUCCESS);
                toast.onDidDismiss(() => {
                    if (this.app.getRootNav().getViews()[0].instance instanceof TabsPage) {
                        this.pop();
                        HttpService.hasShowLoginPage = false;
                    } else {
                        this.setRoot(TabsPage);
                        HttpService.hasShowLoginPage = false;
                    }
                });
                toast.present();
            }
        });
    }

    public goForgetPwd(event) {
        event.preventDefault();
        this.push(ForgetPwdHomePage);
    }

    public goSignup(event) {
        event.preventDefault();
        this.push(SignupPage);
    }

    public oldGoForgetPwd(event) {
        event.preventDefault();
        this.push(ForgetPwdHomePage, {oldUser: true});
    }

    popBack() {
        this.pop();
    }

    preventEenter(event) {
        if (event.keyCode === 13) {
            return false;
        }
    }
}
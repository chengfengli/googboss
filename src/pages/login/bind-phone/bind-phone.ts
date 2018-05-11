import {LoginType} from "../../../enums/login-type";
import {LoginInfo} from "./../../../models/network/request/user/login-info";
import {ConfigService} from "./../../../providers/config-service";
import {UserService} from "./../../../requests/user/user-service";
import {Component, forwardRef, Inject} from "@angular/core";
import {App, ModalController} from "ionic-angular";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {StubService} from "../../../requests/stub/stub-service";
import {BasePage} from "../../base/base/base";
import {UserData} from "../../../storages/user-data";
import {MyValidators} from "../../../validators/my-validators";
import {HudService} from "../../../providers/hud-service";
import {SmsRequest} from "../../../models/network/request/user/sms-request";
import {SmsService} from "../../../requests/sms/sms-service";
import {BindInfo} from "../../../models/network/request/user/bind-info";
import {TabsPage} from "../../tabs/tabs";
import {Util} from "../../../utils/util";
import {Account} from "../../../models/user/account";
import {EnterCaptchaPage} from "../../../components/enter-captcha/enter-captcha";
/*
 Generated class for the BindPhone page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-bind-phone',
    templateUrl: 'bind-phone.html'
})
export class BindPhonePage extends BasePage {
    resetCurrentName(): void {
        ConfigService.currentName = "BindPhonePage";
    }

    private myForm: FormGroup;
    myMobile: string;
    captchaStr: string;

    constructor(public modalCtrl: ModalController, private formBuilder: FormBuilder, public stubService: StubService, public hudService: HudService, public smsService: SmsService, public userData: UserData, @Inject(forwardRef(() => UserService)) public userService: UserService, public app: App, public util: Util) {
        super(stubService);
        this.myForm = this.formBuilder.group({
            mobile: ['', MyValidators.getPhoneValidators()],
            verCode: ['', Validators.required]
        });
    }

    ionViewDidEnter() {
        super.ionViewDidEnter();
        this.userService.getRegisterPhone((data) => {
            this.myMobile = data;
        });
    }

    ionViewWillEnter() {
        super.ionViewWillEnter();
    }

    sendCode(event: Event) {
        event.preventDefault();
        let mobileControl = this.myForm.controls['mobile'];
        if (!MyValidators.checkPhoneIsValid(mobileControl)) {
            this.hudService.getToast('请先输入正确的手机号').present();
            return;
        }

        this.showEnterCaptcha(event);
    }

    showEnterCaptcha(event: Event) {
        let myModal = this.modalCtrl.create(EnterCaptchaPage);
        myModal.onDidDismiss(captchaStr => {
            this.shouldShowShade = false;
            if (Util.isNotNullOrUndefined(captchaStr)) {
                this.captchaStr = captchaStr;
                this.sendCodeToPhone(event);
            }
        });
        myModal.present();
        this.shouldShowShade = true;
    }

    sendCodeToPhone(event: Event) {
        let formValue = this.myForm.value;
        let loginMobile = new SmsRequest(formValue.mobile, this.captchaStr);
        this.smsService.sendCodeForBindPhone(loginMobile, () => {
            Util.codeButtonCountdown(event.target);
        });
    }

    bindPhone(event) {
        event.preventDefault();

        this.util.checkFormValid(this.myForm);

        if (!this.myForm.valid) {
            return;
        }

        let formValue = this.myForm.value;
        this.userData.getAccount().subscribe((account) => {
            if (Util.isNotNullOrUndefined(account)) {
                let password = account.password;
                let bindInfo = new BindInfo(formValue.mobile, formValue.verCode, Util.md5Str(password));
                this.userService.bindPhone(bindInfo, () => {
                    let newAccount = new Account(formValue.mobile, Util.md5Str(password));
                    this.userData.setAccount(newAccount);
                    let loginInfo = new LoginInfo();
                    loginInfo.loginMobile = newAccount.userName;
                    loginInfo.password = newAccount.password;
                    let toast = this.hudService.getToast('绑定成功');
                    toast.onDidDismiss(() => {
                        this.userService.login(loginInfo, LoginType.Phone, (authenticationInfo) => {
                            if (this.app.getRootNav().getViews()[0].instance instanceof TabsPage) {
                                let prePage = this.getNavCtrl().getPrevious();
                                let views = this.getNavCtrl().getViews();
                                let preIndex = views.indexOf(prePage);
                                let popPage = views[preIndex - 1];
                                if (popPage) {
                                    this.getNavCtrl().popTo(popPage);
                                } else {
                                    this.popToRoot();
                                }
                            } else {
                                this.setRoot(TabsPage);
                            }
                        }, () => {
                            this.hudService.getAlert('提示', '绑定成功，请使用绑定的手机号重新登录', [
                                {
                                    text: '确定',
                                    handler: () => {
                                        this.pop();
                                    }
                                }
                            ]).present();

                        });
                    });
                    toast.present();
                });
            }
        });
    }
}

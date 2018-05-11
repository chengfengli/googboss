import {ConfigService} from "./../../../providers/config-service";
import {Component, forwardRef, Inject} from "@angular/core";
import {NavParams, ModalController} from "ionic-angular";
import {Validators, FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {ResetPwdSuccessPage} from "../reset-pwd-success/reset-pwd-success";
import {BasePage} from "../../base/base/base";
import {StubService} from "../../../requests/stub/stub-service";
import {MyValidators} from "../../../validators/my-validators";
import {CustomValidators} from "ng2-validation";
import {SmsRequest} from "../../../models/network/request/user/sms-request";
import {HudService} from "../../../providers/hud-service";
import {SmsService} from "../../../requests/sms/sms-service";
import {UpdatetPasswordInfo} from "../../../models/network/request/user/updatet-password-info";
import {UserService} from "../../../requests/user/user-service";
import {Util} from "../../../utils/util";
import {Captcha} from "../../../models/network/response/captcha/captcha";
import {EnterCaptchaPage} from "../../../components/enter-captcha/enter-captcha";

/*
 Generated class for the ResetPwd page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-reset-pwd',
    templateUrl: 'reset-pwd.html'
})
export class ResetPwdPage extends BasePage {
    resetCurrentName(): void {
        ConfigService.currentName = "ResetPwdPage";
    }

    private myForm: FormGroup;
    mobileNo: string;
    captcha = new Captcha();
    captchaStr: string;

    constructor(public modalCtrl: ModalController, public hudService: HudService, public util: Util, public smsService: SmsService, @Inject(forwardRef(() => UserService)) public userServcice: UserService, private formBuilder: FormBuilder, public stubService: StubService, public navParams: NavParams) {
        super(stubService);
        let password = new FormControl('', MyValidators.getPasswordValidators());
        this.myForm = this.formBuilder.group({
            mobile: [''],
            verCode: ['', Validators.required],
            password: password,
            confirmPassword: ['', [Validators.required, CustomValidators.equalTo(password)]],
        });
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        this.mobileNo = this.navParams.get('mobile');
        console.log(this.navParams.get('mobile'));
    }

    ionViewWillEnter() {
        super.ionViewWillEnter();
    }

    sendCode(event) {
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
        let loginMobile = new SmsRequest(this.mobileNo, this.captchaStr);
        this.smsService.sendCodeForUpdatePassword(loginMobile, () => {
            Util.codeButtonCountdown(event.target);
        });
    }

    updatePassword(event) {
        event.preventDefault();
        this.util.checkFormValid(this.myForm);
        if (!this.myForm.valid) {
            return;
        }
        let formValue = this.myForm.value;
        let passwordInfo = new UpdatetPasswordInfo(this.mobileNo, formValue.verCode, Util.md5Str(formValue.password));

        this.userServcice.updatePassword(passwordInfo, () => {
            this.push(ResetPwdSuccessPage);
        });
    }
}

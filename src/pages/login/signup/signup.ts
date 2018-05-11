import {ConfigService} from "./../../../providers/config-service";
import {EnterCaptchaPage} from "./../../../components/enter-captcha/enter-captcha";
import {Platform, ModalController} from "ionic-angular";
import {Component, ElementRef, forwardRef, Inject} from "@angular/core";
import {Validators, FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {BasePage} from "../../base/base/base";
import {StubService} from "../../../requests/stub/stub-service";
import {MyValidators} from "../../../validators/my-validators";
import {CustomValidators} from "ng2-validation";
import {HudService} from "../../../providers/hud-service";
import {UserService} from "../../../requests/user/user-service";
import {RegisterInfo} from "../../../models/network/request/user/register-info";
import {SignupSuccessPage} from "../signup-success/signup-success";
import {SmsService} from "../../../requests/sms/sms-service";
import {SmsRequest} from "../../../models/network/request/user/sms-request";
import {RegistrationAgreementPage} from "../registration-agreement/registration-agreement";
import {Util} from "../../../utils/util";

/*
 Generated class for the Signup page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
})
export class SignupPage extends BasePage {
    resetCurrentName(): void {
        ConfigService.currentName = "SignupPage";
    }

    myExtraBankNo = "";
    private signupForm: FormGroup;
    isCheck = false;
    chooseBg: string = "url(assets/images/img/choose@2x.png)";
    chooseNoneBg: string = "url(assets/images/img/choose-none@2x.png)";
    captchaStr: string;

    constructor(public modalCtrl: ModalController, public platform: Platform, private formBuilder: FormBuilder, public util: Util, public stubService: StubService, public hudService: HudService, @Inject(forwardRef(() => UserService)) public userServcice: UserService, public smsService: SmsService, public el: ElementRef) {
        super(stubService);
        let password = new FormControl('', MyValidators.getPasswordValidators());
        this.signupForm = this.formBuilder.group({
            mobile: ['', MyValidators.getPhoneValidators()],
            verCode: ['', Validators.required],
            password: password,
            confirmPassword: ['', [Validators.required, CustomValidators.equalTo(password)]],
            referral: ['', Validators.pattern(/0?(1)[0-9]{10}$/)]
        });
    }

    ionViewWillEnter() {
        super.ionViewWillEnter();
    }

    agree(event) {
        let oAgree = event.target;
        if (!this.isCheck) {
            oAgree.style.backgroundImage = this.chooseBg;
            this.isCheck = true;
        } else {
            oAgree.style.backgroundImage = this.chooseNoneBg;
            this.isCheck = false;
        }
    }

    goAgreementPage(event: Event) {
        event.preventDefault();
        this.push(RegistrationAgreementPage);
    }

    sendCode(event: Event) {
        event.preventDefault();
        let mobileControl = this.signupForm.controls['mobile'];
        if (!MyValidators.checkPhoneIsValid(mobileControl)) {
            this.hudService.getToast('请先输入正确的手机号').present();
            return;
        }

        this.showEnterCaptcha(event);
    }

    sendCodeToPhone(event: Event) {
        let formValue = this.signupForm.value;
        let loginMobile = new SmsRequest(formValue.mobile, this.captchaStr);
        this.smsService.sendCodeForRegister(loginMobile, () => {
            Util.codeButtonCountdown(event.target);
        });
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

    doSignup(event) {
        event.preventDefault();
        this.util.checkFormValid(this.signupForm);
        if (!this.signupForm.valid) {
            return;
        }
        if (!this.isCheck) {
            this.hudService.getToast('请接受用户使用条款').present();
            return;
        }
        let formValue = this.signupForm.value;
        let registerInfo = new RegisterInfo(formValue.mobile, formValue.verCode, Util.md5Str(formValue.password), formValue.referral);

        this.userServcice.registerUser(registerInfo, () => {
            this.push(SignupSuccessPage, {mobile: formValue.mobile, password: formValue.password});
        });
    }
}

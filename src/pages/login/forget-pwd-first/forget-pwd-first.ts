import {ConfigService} from "./../../../providers/config-service";
import {Component, forwardRef, Inject} from "@angular/core";
import {NavParams, ModalController} from "ionic-angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StubService} from "../../../requests/stub/stub-service";
import {BasePage} from "../../base/base/base";
import {ResetPwdPage} from "../reset-pwd/reset-pwd";
import {MyValidators} from "../../../validators/my-validators";
import {SmsRequest} from "../../../models/network/request/user/sms-request";
import {SmsService} from "../../../requests/sms/sms-service";
import {HudService} from "../../../providers/hud-service";
import {BankVerificationInfo} from "../../../models/network/request/user/bank-verification-info";
import {UserService} from "../../../requests/user/user-service";
import {Util} from "../../../utils/util";
import {Captcha} from "../../../models/network/response/captcha/captcha";
import {EnterCaptchaPage} from "../../../components/enter-captcha/enter-captcha";
/*
 Generated class for the ForgetPwd page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-forget-pwd-first',
    templateUrl: 'forget-pwd-first.html'
})
export class ForgetPwdFirstPage extends BasePage {
    resetCurrentName(): void {
        ConfigService.currentName = "ForgetPwdFirstPage";
    }

    private forgetPwdForm: FormGroup;
    mobileNo: string;
    captcha = new Captcha();
    captchaStr: string;

    constructor(public modalCtrl: ModalController, public navParams: NavParams, private formBuilder: FormBuilder, public stubService: StubService, public configService: ConfigService, public smsService: SmsService, public hudService: HudService, @Inject(forwardRef(() => UserService)) public userService: UserService, public util: Util) {
        super(stubService);
        this.forgetPwdForm = this.formBuilder.group({
            legalEntityName: ['', Validators.required],
            cardNum: ['', Validators.required],
            bankNum: ['', Validators.required],
            bankMobile: ['', MyValidators.getPhoneValidators()],
            bankVerCode: ['', Validators.required]
        });
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        this.mobileNo = this.navParams.get('mobile');
    }

    ionViewWillEnter() {
        super.ionViewWillEnter();
    }

    sendCode(event) {
        event.preventDefault();
        let mobileControl = this.forgetPwdForm.controls['bankMobile'];
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
        let formValue = this.forgetPwdForm.value;
        let bankMobile = new SmsRequest(formValue.bankMobile, this.captchaStr);
        this.smsService.sendCodeForBankVerification(bankMobile, () => {
            Util.codeButtonCountdown(event.target);
        });
    }


    nextStep(event) {
        event.preventDefault();
        this.util.checkFormValid(this.forgetPwdForm);
        if (!this.forgetPwdForm.valid) {
            return;
        }
        let formValue = this.forgetPwdForm.value;
        if (!this.IdentityCodeValid(formValue.cardNum)) {
            return;
        }
        let bankVerificationInfo = new BankVerificationInfo(formValue.legalEntityName, "I",
            formValue.cardNum, formValue.bankNum, formValue.bankMobile, formValue.bankVerCode, this.mobileNo);
        this.userService.saveBankCertificationForRestPwd(bankVerificationInfo, () => {
            this.push(ResetPwdPage, {mobile: this.mobileNo});
        });
    }

    IdentityCodeValid(code): boolean {
        let tip = "";
        let pass = true;

        if (!code || !/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/i.test(code)) {
            tip = "您输入的身份证号格式错误";
            pass = false;
        }
        if (!pass) {
            this.hudService.getToast(tip).present();
        }
        ;
        return pass;
    }
}

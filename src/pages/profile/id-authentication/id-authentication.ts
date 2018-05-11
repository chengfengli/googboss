import {UserData} from "../../../storages/user-data";
import {HudService} from "./../../../providers/hud-service";
import {StubService} from "./../../../requests/stub/stub-service";
import {PermissionPage} from "./../../base/permission/permission";
import {Component, Inject, forwardRef} from "@angular/core";
import {NavParams, ModalController} from "ionic-angular";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {MyValidators} from "../../../validators/my-validators";
import {SmsRequest} from "../../../models/network/request/user/sms-request";
import {Util} from "../../../utils/util";
import {BankVerificationInfo} from "../../../models/network/request/user/bank-verification-info";
import {IdAuthenticateSuccessPage} from "../id-authenticate-success/id-authenticate-success";
import {ConfigService} from "../../../providers/config-service";
import {SmsService} from "../../../requests/sms/sms-service";
import {UserService} from "../../../requests/user/user-service";
import {UserAuthenticationInfo} from "../../../models/user/user-authentication-info";
import {EnterCaptchaPage} from "../../../components/enter-captcha/enter-captcha";
/*
 Generated class for the IdAuthentication page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-id-authentication',
    templateUrl: 'id-authentication.html'
})
export class IdAuthenticationPage extends PermissionPage {
    private authenForm: FormGroup;
    mobileNo: string;
    captchaStr: string;

    constructor(public modalCtrl: ModalController, public userData: UserData, public util: Util, public navParams: NavParams, private formBuilder: FormBuilder, public stubService: StubService, public configService: ConfigService, public smsService: SmsService, public hudService: HudService, @Inject(forwardRef(() => UserService)) public userService: UserService) {
        super(stubService);
        this.authenForm = this.formBuilder.group({
            legalEntityName: ['', [Validators.required, Validators.maxLength(15)]],
            cardNum: ['', Validators.required],
            bankNum: ['', [Validators.required, Validators.maxLength(30)]],
            bankMobile: ['', MyValidators.getPhoneValidators()],
            bankVerCode: ['', Validators.required]
        });
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'IdAuthenticationPage';
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        this.userData.getAccount().subscribe((account) => {
            if (Util.isNotNullOrUndefined(account)) {
                this.mobileNo = account.userName;
            }
        });
        // this.bankTypes = this.configService.getBankTypes();
    }

    ionViewWillEnter() {
        super.ionViewWillEnter();
    }

    sendCode(event) {
        event.preventDefault();
        let mobileControl = this.authenForm.controls['bankMobile'];
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
        let formValue = this.authenForm.value;
        let bankMobile = new SmsRequest(formValue.bankMobile, this.captchaStr);
        this.smsService.sendCodeForBankVerification(bankMobile, () => {
            Util.codeButtonCountdown(event.target);
        });
    }

    nextStep(event) {
        event.preventDefault();
        this.util.checkFormValid(this.authenForm);
        if (!this.authenForm.valid) {
            return;
        }
        let formValue = this.authenForm.value;
        if (!this.IdentityCodeValid(formValue.cardNum)) {
            return
        }
        let bankVerificationInfo = new BankVerificationInfo(formValue.legalEntityName, 'I',
            formValue.cardNum, formValue.bankNum, formValue.bankMobile, formValue.bankVerCode, this.mobileNo);
        this.userService.saveBankCertification(bankVerificationInfo, () => {
            let userAuthenticationInfo = new UserAuthenticationInfo(formValue.legalName, formValue.mobileNo, formValue.cardNum, "I");
            this.push(IdAuthenticateSuccessPage, {userAuthenticationInfo: userAuthenticationInfo});
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

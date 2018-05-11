import {ConfigService} from "../../../providers/config-service";
import {UpdatePhoneResetPage} from "../update-phone-reset/update-phone-reset";
import {UpdatetMobileVerificationInfo} from "./../../../models/network/request/user/update-mobile-verification-info";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {Component, forwardRef, Inject} from "@angular/core";
import {PermissionPage} from "../../base/permission/permission";
import {HudService} from "../../../providers/hud-service";
import {StubService} from "../../../requests/stub/stub-service";
import {MyValidators} from "../../../validators/my-validators";
import {SmsService} from "../../../requests/sms/sms-service";
import {Util} from "../../../utils/util";
import {SmsRequest} from "../../../models/network/request/user/sms-request";
import {UserService} from "../../../requests/user/user-service";
import {ModalController} from "ionic-angular";
import {EnterCaptchaPage} from "../../../components/enter-captcha/enter-captcha";

/*
 Generated class for the UpdatePhoneVerification page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-update-phone-verification',
    templateUrl: 'update-phone-verification.html'
})
export class UpdatePhoneVerificationPage extends PermissionPage {

    private myForm: FormGroup;
    captchaStr: string;

    constructor(public modalCtrl: ModalController, public hudService: HudService, private formBuilder: FormBuilder, public stubService: StubService, public smsService: SmsService, public util: Util, @Inject(forwardRef(() => UserService)) public userServcice: UserService) {
        super(stubService);

        this.myForm = this.formBuilder.group({
            mobile: ['', MyValidators.getPhoneValidators()],
            verCode: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'UpdatePhoneVerificationPage';
    }


    ionViewDidLoad() {
        super.ionViewDidLoad();
        console.log('ionViewDidLoad UpdatePhoneVerificationPage');
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

        let formValue = this.myForm.value;
        let loginMobile = new SmsRequest(formValue.mobile, this.captchaStr);

        this.smsService.sendSmsForChangeMobileToOld(loginMobile, () => {
            Util.codeButtonCountdown(event.target);
        });
    }

    goToNext(event) {
        event.preventDefault();

        this.util.checkFormValid(this.myForm);
        if (!this.myForm.valid) {
            return;
        }
        let formValue = this.myForm.value;
        let updatetMobileVerificationInfo = new UpdatetMobileVerificationInfo(formValue.mobile, formValue.verCode, Util.md5Str(formValue.password));
        this.userServcice.changeMobileStep1(updatetMobileVerificationInfo, () => {
            this.push(UpdatePhoneResetPage);
        });
    }
}

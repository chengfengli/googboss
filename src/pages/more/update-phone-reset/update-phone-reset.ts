import {ConfigService} from "../../../providers/config-service";
import {LoginType} from "../../../enums/login-type";
import {LoginInfo} from "./../../../models/network/request/user/login-info";
import {UpdatetMobileInfo} from "./../../../models/network/request/user/update-mobile-info";
import {Account} from "./../../../models/user/account";
import {Component, forwardRef, Inject} from "@angular/core";
import {PermissionPage} from "../../base/permission/permission";
import {HudService} from "../../../providers/hud-service";
import {UserData} from "../../../storages/user-data";
import {StubService} from "../../../requests/stub/stub-service";
import {SmsService} from "../../../requests/sms/sms-service";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {MyValidators} from "../../../validators/my-validators";
import {SmsRequest} from "../../../models/network/request/user/sms-request";
import {Util} from "../../../utils/util";
import {UserService} from "../../../requests/user/user-service";
import {ModalController} from "ionic-angular";
import {EnterCaptchaPage} from "../../../components/enter-captcha/enter-captcha";

/*
 Generated class for the UpdatePhoneReset page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-update-phone-reset',
    templateUrl: 'update-phone-reset.html'
})
export class UpdatePhoneResetPage extends PermissionPage {
    private myForm: FormGroup;
    private account: Account;
    captchaStr: string;

    constructor(public modalCtrl: ModalController, @Inject(forwardRef(() => UserService)) public userService: UserService, public util: Util, private formBuilder: FormBuilder, public smsService: SmsService, public hudService: HudService, public userData: UserData, public stubService: StubService) {
        super(stubService);

        this.myForm = this.formBuilder.group({
            mobile: ['', MyValidators.getPhoneValidators()],
            verCode: ['', Validators.required]
        });
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'UpdatePhoneResetPage';
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        console.log('ionViewDidLoad UpdatePhoneResetPage');
        this.userData.getAccount().subscribe(account => {
            this.account = account;
        });
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
        let smsRequest = new SmsRequest(formValue.mobile, this.captchaStr);
        this.smsService.sendSmsForChangeMobileToNew(smsRequest, () => {
            Util.codeButtonCountdown(event.target);
        });
    }

    resetPhone(event) {
        event.preventDefault();

        this.util.checkFormValid(this.myForm);

        if (!this.myForm.valid) {
            return;
        }

        let formValue = this.myForm.value;
        let updatetMobileInfo = new UpdatetMobileInfo(formValue.mobile, formValue.verCode);

        let loginInfo = new LoginInfo();
        loginInfo.loginMobile = updatetMobileInfo.newMobile;
        loginInfo.password = this.account.password;

        this.userService.changeMobile(updatetMobileInfo, () => {
            this.userService.login(loginInfo, LoginType.Phone, () => {
                let toast = this.hudService.getToast('更换手机号成功');
                toast.onDidDismiss(() => {
                    this.popToRoot();
                });
                toast.present();
            });
        });
    }

}

import {Component} from "@angular/core";
import {NavController, NavParams, ViewController} from "ionic-angular";
import {BasePage} from "../../pages/base/base/base";
import {StubService} from "../../requests/stub/stub-service";
import {Captcha} from "../../models/network/response/captcha/captcha";
import {SmsService} from "../../requests/sms/sms-service";
import {HudService} from "../../providers/hud-service";
import {ConfigService} from "../../providers/config-service";

/*
 Generated class for the EnterCaptcha page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-enter-captcha',
    templateUrl: 'enter-captcha.html'
})
export class EnterCaptchaPage extends BasePage {

    captcha = new Captcha();
    captchaStr = '';

    constructor(public hudService: HudService, public smsService: SmsService, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public stubService: StubService) {
        super(stubService);
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'EnterCaptchaPage';
    }

    ionViewWillEnter() {
        super.ionViewWillEnter();
        this.getCaptchaCode();
    }

    closeModal() {
        this.viewCtrl.dismiss();
    }

    sendCaptchaCode(event: Event) {
        event.preventDefault();
        this.getCaptchaCode();
    }

    getCaptchaCodeBack(event: Event) {
        event.preventDefault();
        if (this.captchaStr === '') {
            this.hudService.getToast('图形验证码不能为空').present();
            return;
        }
        this.viewCtrl.dismiss(this.captchaStr);
    }

    getCaptchaCode() {
        this.smsService.captchaString((captcha) => {
            this.captcha = captcha;
        });
    }

}

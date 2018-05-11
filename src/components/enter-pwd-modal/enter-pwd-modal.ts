import {ConfigService} from "./../../providers/config-service";
import {PasswordInfo} from "../../models/network/request/user/password-info";
import {UserService} from "../../requests/user/user-service";
import {Util} from "../../utils/util";
import {PermissionPage} from "../../pages/base/permission/permission";
import {StubService} from "../../requests/stub/stub-service";
import {UserData} from "../../storages/user-data";
import {HudService} from "../../providers/hud-service";
import {Component, forwardRef, Inject} from "@angular/core";
import {NavParams, ViewController, Events} from "ionic-angular";
import {LoginMobile} from "../../models/network/request/user/login-mobile";
import {ResetPwdPage} from "../../pages/login/reset-pwd/reset-pwd";

/*
 Generated class for the EnterPwdModal page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-enter-pwd-modal',
    templateUrl: 'enter-pwd-modal.html'
})
export class EnterPwdModalPage extends PermissionPage {
    enterStatu = 'import';
    password: string;
    inputDescription = '为保证您的账户安全，请输入您的密码';

    constructor(public userData: UserData, public hudService: HudService, @Inject(forwardRef(() => UserService)) public userServcice: UserService, public events: Events, public stubService: StubService, public viewCtrl: ViewController, public params: NavParams, @Inject(forwardRef(() => UserService)) public userService: UserService) {
        super(stubService);
        let inputParams = this.params.get('inputDescription');
        if (Util.isNotNullOrUndefined(inputParams)) {
            this.inputDescription = inputParams;
        }
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'EnterPwdModalPage';
    }

    ionViewDidEnter() {
        super.ionViewDidEnter();
        this.events.subscribe('user:loginExpired', () => {
            this.viewCtrl.dismiss();
        });
    }

    ionViewWillLeave() {
        super.ionViewWillLeave();
        this.events.unsubscribe('user:loginExpired');
    }

    closeModal() {
        this.viewCtrl.dismiss();
    }

    goForgetPwd() {
        this.userData.getAccount().subscribe(account => {
            let loginMobile = new LoginMobile(account.userName);
            this.userServcice.checkVerified(loginMobile, (verified) => {
                if (verified) {
                    this.viewCtrl.dismiss({mobile: account.userName, goForget: true});
                } else {
                    this.push(ResetPwdPage, {mobile: account.userName});
                }
            });
        });
    }

    sendPassword() {
        if (!Util.isNotNullOrUndefined(this.password)) {
            this.hudService.getToast('密码不能为空').present();
            return;
        }

        let passwordInfo = new PasswordInfo();
        passwordInfo.password = Util.md5Str(this.password);
        this.enterStatu = 'loading';

        this.userService.checkPassword(passwordInfo, (right) => {
            if (right) {
                this.enterStatu = 'success';
                setTimeout(() => {
                    this.viewCtrl.dismiss(passwordInfo);
                }, 1000);
            } else {
                this.enterStatu = 'import';
                let toast = this.hudService.getToast('密码不正确');
                toast.present();
            }
        }, () => {
            this.enterStatu = 'import';
        });
    }
}

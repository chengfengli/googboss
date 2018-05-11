import {HudService} from "./../../../providers/hud-service";
import {UserData} from "./../../../storages/user-data";
import {Account} from "../../../models/user/account";
import {NavParams, App} from "ionic-angular";
import {ConfigService} from "./../../../providers/config-service";
import {Component} from "@angular/core";
import {BasePage} from "../../base/base/base";
import {StubService} from "../../../requests/stub/stub-service";
import {LoginPage} from "../login/login";
import {Util} from "../../../utils/util";
import {LoginInfo} from "../../../models/network/request/user/login-info";
import {UserService} from "../../../requests/user/user-service";
import {LoginType} from "../../../enums/login-type";
import {TabsPage} from "../../tabs/tabs";

/*
 Generated class for the SignupSuccess page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-signup-success',
    templateUrl: 'signup-success.html'
})
export class SignupSuccessPage extends BasePage {

    password: string;
    mobile: string;

    resetCurrentName(): void {
        ConfigService.currentName = "SignupSuccessPage";
    }

    constructor(public app: App, public userService: UserService, public hudService: HudService, public userData: UserData, public stubService: StubService, public navParams: NavParams) {
        super(stubService);
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        console.log('ionViewDidLoad SignupSuccessPage');
        this.mobile = this.navParams.get('mobile');
        this.password = this.navParams.get('password');
        setTimeout(() => {
            this.goLoginPage();
        }, 3000);
    }

    goLoginPage() {
        {
            let newAccount = new Account(this.mobile, Util.md5Str(this.password));
            this.userData.setAccount(newAccount);
            let loginInfo = new LoginInfo();
            loginInfo.loginMobile = newAccount.userName;
            loginInfo.password = newAccount.password;
            this.userService.login(loginInfo, LoginType.Phone, (authenticationInfo) => {
                if (this.app.getRootNav().getViews()[0].instance instanceof TabsPage) {
                    let prePage = this.getNavCtrl().getPrevious();
                    let views = this.getNavCtrl().getViews();
                    let preIndex = views.indexOf(prePage);
                    let popPage = views[preIndex - 2];
                    if (popPage) {
                        this.getNavCtrl().popTo(popPage);
                    } else {
                        this.popToRoot();
                    }
                } else {
                    this.setRoot(TabsPage);
                }
            }, () => {
                let toast = this.hudService.getToast('自动登录失败，请手动登录');
                toast.onDidDismiss(() => {
                    this.setRoot(LoginPage, {shouldHideBackButton: true, mobile: this.navParams.get('mobile')});
                });
                toast.present();
            });
        }
    }
}

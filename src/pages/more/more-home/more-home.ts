import {SocialSharing} from "@ionic-native/social-sharing";
import {ConfigService} from "../../../providers/config-service";
import {LoginPage} from "./../../login/login/login";
import {Account} from "./../../../models/user/account";
import {UpdatePasswordPage} from "./../update-password/update-password";
import {UpdatePhoneVerificationPage} from "./../update-phone-verification/update-phone-verification";
import {MessagePage} from "./../message/message";
import {AboutAllinpayPage} from "./../about-allinpay/about-allinpay";
import {Component, forwardRef, Inject} from "@angular/core";
import {NavParams, App, Platform} from "ionic-angular";
import {BasePage} from "../../base/base/base";
import {StubService} from "../../../requests/stub/stub-service";
import {UserService} from "../../../requests/user/user-service";
import {LoginSignupPage} from "../../login/login-signup/login-signup";
import {UserData} from "../../../storages/user-data";
import {CodePush} from "@ionic-native/code-push";
import {HudService} from "../../../providers/hud-service";
/*
 Generated class for the MoreHome page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-more-home',
    templateUrl: 'more-home.html'
})
export class MoreHomePage extends BasePage {
    account: Account;
    hasLoggedIn: boolean;

    constructor(public hudService: HudService, private codePush: CodePush, public platForm: Platform, public socialSharing: SocialSharing, public userData: UserData, @Inject(forwardRef(() => UserService)) public userService: UserService, public navParams: NavParams, public stubService: StubService, public app: App) {
        super(stubService);
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        console.log('ionViewDidLoad MoreHomePage');
    }

    ionViewWillEnter() {
        super.ionViewWillEnter();
        this.userData.getAccount().subscribe((account) => {
            this.account = account;
        });
        this.userData.hasLoggedIn().subscribe(data => {
            this.hasLoggedIn = data;
        });
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'MoreHomePage';
    }

    logout() {
        this.userService.logout(() => {
            this.app.getRootNav().setRoot(LoginSignupPage);
        }, () => {
            this.app.getRootNav().setRoot(LoginSignupPage);
        });
    }

    goToAbout() {
        this.push(AboutAllinpayPage);
    }

    goToMessage() {
        this.push(MessagePage);
    }

    isLogin() {
        return this.hasLoggedIn;
    }

    goToLogin() {
        this.push(LoginPage);
    }

    goToUpdatePhoneVerification() {
        this.push(UpdatePhoneVerificationPage);
    }

    gotToRestPassword() {
        this.push(UpdatePasswordPage, {account: this.account});
    }

    shareToFriends() {
        if (this.platForm.is('ios')) {
            this.socialSharing.share('好老板, 您口袋里的商户财资管家!', '好老板', 'http://7u2gvh.com1.z0.glb.clouddn.com/wx_share.png', 'http://a.app.qq.com/o/simple.jsp?pkgname=com.happyfi.allinfi');
        } else {
            this.socialSharing.share('好老板, 您口袋里的商户财资管家!', '好老板', '', 'http://a.app.qq.com/o/simple.jsp?pkgname=com.happyfi.allinfi');
        }
    }

    shouldShowCheckUpdate() {
        if (this.platForm.is('android')) {
            return true;
        }
        return false;
    }

    checkUpload() {
        this.codePush.sync({}).subscribe((syncStatus) => console.log(syncStatus));
        let credit = (<any>window).plugins.credit;
        credit.checkUpload([], () => {
        }, () => {
        });
    }

}

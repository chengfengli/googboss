import {ConfigService} from "../../../providers/config-service";
import {UserService} from "./../../../requests/user/user-service";
import {PermissionPage} from "./../../base/permission/permission";
import {StubService} from "./../../../requests/stub/stub-service";
import {Component, forwardRef, Inject} from "@angular/core";
import {NavParams} from "ionic-angular";
import {UserAuthenticationInfo} from "../../../models/user/user-authentication-info";
import {PerfectInfoPage} from "../perfect-info/perfect-info";

/*
 Generated class for the IdAuthenticateSuccess page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-id-authenticate-success',
    templateUrl: 'id-authenticate-success.html'
})
export class IdAuthenticateSuccessPage extends PermissionPage {
    authenticationInfo: UserAuthenticationInfo;

    constructor(public navParams: NavParams, public stubService: StubService, @Inject(forwardRef(() => UserService)) public userService: UserService) {
        super(stubService);
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'IdAuthenticateSuccessPage';
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        this.authenticationInfo = this.navParams.get('userAuthenticationInfo');
    }

    ionViewDidEnter() {
        super.ionViewDidEnter();
        this.getUserVerificationInfo();
    }

    goBack() {
        // let index = this.getNavCtrl().getViews().length - 3;
        // let page = this.getNavCtrl().getByIndex(index);
        this.popTo(PerfectInfoPage);
    }

    getUserVerificationInfo() {
        this.userService.getUserVerificationInfo(userVerificationInfo => {
            this.authenticationInfo = new UserAuthenticationInfo(userVerificationInfo.legalName, userVerificationInfo.mobilePhone, userVerificationInfo.legalIdNo, userVerificationInfo.legalIdType);
        });
    }
}

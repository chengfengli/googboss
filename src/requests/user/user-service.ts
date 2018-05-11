import {HudService} from "./../../providers/hud-service";
import {LoanTypeInfo} from "./../../models/network/request/user/loan-type-info";
import {PasswordInfo} from "./../../models/network/request/user/password-info";
import {UserProfile} from "./../../models/user/user-profile";
import {Injectable, forwardRef, Inject} from "@angular/core";
import "rxjs/add/operator/map";
import {LoginInfo} from "../../models/network/request/user/login-info";
import {UserData} from "../../storages/user-data";
import {HttpService} from "../../providers/http-service";
import {HttpMethod} from "../../enums/http-method";
import {LoginType} from "../../enums/login-type";
import {ContentType} from "../../enums/content-type";
import {RegisterInfo} from "../../models/network/request/user/register-info";
import {UpdatetPasswordInfo} from "../../models/network/request/user/updatet-password-info";
import {BankVerificationInfo} from "../../models/network/request/user/bank-verification-info";
import {Account} from "../../models/user/account";
import {BindInfo} from "../../models/network/request/user/bind-info";
import {AuthenticationInfo} from "../../models/user/authentication-info";
import {LoginMobile} from "../../models/network/request/user/login-mobile";
import {UpdatetMobileVerificationInfo} from "../../models/network/request/user/update-mobile-verification-info";
import {UpdatetMobileInfo} from "../../models/network/request/user/update-mobile-info";
import {Util} from "../../utils/util";
import {UserVerificationInfo} from "../../models/user/user-verification-info";
import {ConfigService} from "../../providers/config-service";
import {JPushService} from "ionic2-jpush";
/*
 Generated class for the AccountService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class UserService {

    constructor(@Inject(forwardRef(() => HttpService)) public httpService: HttpService, @Inject(forwardRef(() => UserData)) public userData: UserData, private jPushPlugin: JPushService, public hudService: HudService) {
        console.log('Hello AccountService Provider');
    }

    public login(loginInfo: LoginInfo, loginType: LoginType, success: (authenticationInfo: AuthenticationInfo) => void, fail?: () => void) {
        // let data: any = {};

        let account: Account;

        if (!Util.isNotNullOrUndefined(loginInfo.loginDeviceId)) {
            loginInfo.loginDeviceId = "";
            loginInfo.loginDeviceChannel = "PC"
        }

        if (loginType == LoginType.Phone) {
            account = new Account(loginInfo.loginMobile, loginInfo.password, true);
        } else {
            account = new Account(loginInfo.mchtCd, loginInfo.password, false);
        }

        this.httpService.httpRequest('/users/login.htm', loginInfo, HttpMethod.Post, ContentType.JSON, (authenticationInfo) => {
            if (loginType == LoginType.Phone) {
                this.userData.setHasLoggedIn(true);
                ConfigService.shouldReloadHome = true;
                this.jPushPlugin.setAlias(authenticationInfo.userId + '');
            }
            this.userData.setAccount(account);
            success(authenticationInfo);
        }, (data) => {
            if (fail) {
                fail();
            }
        });
    }

    public logout(success: () => void, fail: () => void) {
        this.httpService.httpRequest('/users/logout.htm', null, HttpMethod.Get, ContentType.Form, () => {
            this.userData.clearUserInfo().subscribe(() => {
                ConfigService.shouldReloadHome = true;
                success();
                this.jPushPlugin.setAlias('');
            });
        }, () => {
            fail();
        });
    }

    public registerUser(registerInfo: RegisterInfo, success: () => void) {
        if (!Util.isNotNullOrUndefined(registerInfo.deviceId)) {
            registerInfo.deviceId = "";
            registerInfo.registerChannel = "PC";
        }
        this.httpService.httpRequest('/users.htm', registerInfo, HttpMethod.Post, ContentType.JSON, () => {
            success();
        });
    }

    public updatePassword(passwordInfo: UpdatetPasswordInfo, success: () => void) {
        this.httpService.httpRequest('/users/passwords.htm', passwordInfo, HttpMethod.Put, ContentType.JSON, () => {
            success();
        });
    }

    public resetPassword(passwordInfo: UpdatetPasswordInfo, success: () => void) {
        this.httpService.httpRequest('/users/newpasswords.htm', passwordInfo, HttpMethod.Put, ContentType.JSON, () => {
            success();
        });
    }

    public bindPhone(bindPhoneInfo: BindInfo, success: () => void) {
        this.httpService.httpRequest('/users/bind/mobile.htm', bindPhoneInfo, HttpMethod.Put, ContentType.JSON, () => {
            success();
        });
    }

    public saveBankCertificationForRestPwd(bankInfo: BankVerificationInfo, success: () => void) {
        this.httpService.httpRequest('/users/verifications/banks.htm', bankInfo, HttpMethod.Put, ContentType.JSON, () => {
            success();
        });
    }

    public saveBankCertification(bankInfo: BankVerificationInfo, success: () => void) {
        this.httpService.httpRequest('/users/verifications/banks.htm', bankInfo, HttpMethod.Post, ContentType.JSON, () => {
            success();
        });
    }

    public checkVerified(loginMobile: LoginMobile, success: (verified: boolean) => void) {
        this.httpService.httpRequest('/users/verifications/verified.htm', loginMobile, HttpMethod.Get, ContentType.Form, (verified) => {
            success(verified);
        });
    }

    public checkPassword(passwordInfo: PasswordInfo, success: (right: boolean) => void, fail: () => void) {
        this.httpService.httpRequest('/users/password/check.htm', passwordInfo, HttpMethod.Get, ContentType.Form, (verified) => {
            success(verified);
        }, (data) => {
            fail();
        }, false);
    }

    public changeMobileStep1(updatetMobileVerificationInfo: UpdatetMobileVerificationInfo, success: () => void) {
        this.httpService.httpRequest('/users/change/mobile/check.htm', updatetMobileVerificationInfo, HttpMethod.Post, ContentType.Form, () => {
            success();
        });
    }

    public changeMobile(updatetMobileInfo: UpdatetMobileInfo, success: () => void) {
        this.httpService.httpRequest('/users/change/mobile.htm', updatetMobileInfo, HttpMethod.Put, ContentType.Form, () => {
            success();
        });
    }

    public profiles(loanType: LoanTypeInfo, success: (profile) => void) {
        this.httpService.httpRequest('/userinfo/profiles.htm', loanType, HttpMethod.Get, ContentType.Form, (data: UserProfile) => {
            success(data);
        });
    }

    public getUserVerificationInfo(success: (userVerificationInfo: UserVerificationInfo) => void) {
        this.httpService.httpRequest('/userinfo/verification/bank.htm', null, HttpMethod.Get, ContentType.Form, userVerificationInfo => {
            success(userVerificationInfo);
        });
    }

    public getRegisterPhone(success: (phoneNum: string) => void) {
        this.httpService.httpRequest('/users/register/mobile.htm', null, HttpMethod.Get, ContentType.Form, data => {
            success(data);
        }, null, false);
    }

    public getBoardMessage(success: (data) => void) {
        this.httpService.httpRequest('/announcement/list.htm', null, HttpMethod.Get, ContentType.Form, (data) => {
            success(data);
        }, null, false);
    }
}

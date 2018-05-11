/**
 * Created by Allen on 2017/2/28.
 */
export class UpdatetPasswordInfo {
    loginMobile: string;
    smsCode: string;
    newPassword: string;
    oldPassword: string;

    constructor(loginMobile: string, smsCode: string, newPassword: string, oldPassword?: string) {
        this.loginMobile = loginMobile;
        this.smsCode = smsCode;
        this.newPassword = newPassword;
        this.oldPassword = oldPassword;
    }
}
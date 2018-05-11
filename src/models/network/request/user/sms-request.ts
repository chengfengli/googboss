/**
 * Created by Allen on 2017/3/1.
 */
export class SmsRequest {
    loginMobile: string;
    captchaCode: string;

    constructor(loginMobile: string, captchaCode: string) {
        this.loginMobile = loginMobile;
        this.captchaCode = captchaCode;
    }
}
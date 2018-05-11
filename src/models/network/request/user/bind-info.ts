/**
 * Created by Allen on 2017/3/2.
 */
export class BindInfo {
    mobile: string;
    smsCode: string;
    password: string;

    constructor(mobile: string, smsCode: string, password: string) {
        this.mobile = mobile;
        this.smsCode = smsCode;
        this.password = password;
    }
}
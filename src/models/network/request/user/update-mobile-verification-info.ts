export class UpdatetMobileVerificationInfo {
    oldMobile: string;
    smsCode: string;
    password: string;

    constructor(oldMobile: string, smsCode: string, password: string) {
        this.oldMobile = oldMobile;
        this.smsCode = smsCode;
        this.password = password;
    }
}
export class UpdatetMobileInfo {
    newMobile: string;
    smsCode: string;

    constructor(newMobile: string, smsCode: string) {
        this.newMobile = newMobile;
        this.smsCode = smsCode;
    }
}
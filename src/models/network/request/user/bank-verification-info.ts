/**
 * Created by Allen on 2017/2/28.
 */
export class BankVerificationInfo {
    legalName: string;
    legalIdType: string;
    legalIdNo: string;
    bankName: string;
    bankAccount: string;
    mobilePhone: string;
    smsCode: string;
    loginMobile: string;
    bankUserName: string;

    constructor(legalName: string, legalIdType: string, legalIdNo: string, bankAccount: string, mobilePhone: string, smsCode: string, loginMobile: string) {
        this.legalName = legalName;
        this.legalIdType = legalIdType;
        this.legalIdNo = legalIdNo;
        this.bankAccount = bankAccount;
        this.mobilePhone = mobilePhone;
        this.smsCode = smsCode;
        this.loginMobile = loginMobile;
        this.bankUserName = this.legalName;
    }
}
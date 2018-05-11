export class DailyLoanVerifyInfo {
    mchtCd: string;
    backAccountNo: string;
    password: string;

    constructor(mchtCd: string, backAccountNo: string, password: string) {
        this.mchtCd = mchtCd;
        this.backAccountNo = backAccountNo;
        this.password = password;
    }
}
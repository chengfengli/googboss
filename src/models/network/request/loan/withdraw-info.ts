/**
 * Created by Allen on 2017/3/8.
 */
export class WithdrawInfo {
    private mchtCd: string;
    private withdrawAmt: string;
    private password: string;

    constructor($mchtCd: string, $withdrawAmt: string, $password: string) {
        this.mchtCd = $mchtCd;
        this.withdrawAmt = $withdrawAmt;
        this.password = $password;
    }
}
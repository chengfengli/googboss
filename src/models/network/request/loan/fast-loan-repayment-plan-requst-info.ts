/**
 * Created by Allen on 2017/3/17.
 */

export class FastLoanRepaymentPlanRequstInfo {
    mchtCd: string;
    firstRow: number;
    lastRow: number;

    constructor(mchtCd: string, firstRow: number, lastRow: number) {
        this.mchtCd = mchtCd;
        this.firstRow = firstRow;
        this.lastRow = lastRow;
    }
}
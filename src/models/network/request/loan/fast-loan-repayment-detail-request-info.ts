/**
 * Created by Allen on 2017/3/17.
 */
export class FastLoanRepaymentDetailRequestInfo {
    mchtCd: string;
    firstRow: number;
    lastRow: number;
    startDate: string;
    endDate: string;

    constructor(mchtCd: string, firstRow: number, lastRow: number, startDate?: string, endDate?: string) {
        this.mchtCd = mchtCd;
        this.firstRow = firstRow;
        this.lastRow = lastRow;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
/**
 * Created by Allen on 2017/3/17.
 */
export class RepaymentInfo {
    inAmount: string;
    tid: string;

    constructor(inAmount: string, tid: string) {
        this.inAmount = inAmount;
        this.tid = tid;
    }
}
/**
 * Created by Allen on 2017/3/17.
 */
export class FastLoanRepaymentSchedule {
    /** 期数 */
    termNbr: number;
    /** 应还本金 */
    loanTermPrin: number;
    /** 应还费用 */
    loanTermFee: number;
    /** 应还利息 */
    loanTermInterest: number;
    /** 到期还款日期 */
    loanPmtDueDate: Date;
}
import {FastLoanRepaymentSchedule} from "./fast-loan-repayment-schedule";
/**
 * Created by Allen on 2017/3/17.
 */

export class FastLoanRepaymentPlan {
    /** 是否有下一页标识 Y - 是 N - 否 */
    nextPageFlag: string;
    /** 开始位置 */
    firstRow: number;
    /** 结束位置 */
    lastRow: number;
    /** 总条数 */
    totalRow: number;
    /** 借据号 */
    dueBillNo: string;
    /** 贷款总期数 */
    totalTerms: number;
    /** 贷款总本金 */
    loanInitPrin: number;
    /** 计划 */
    schedules: FastLoanRepaymentSchedule[];
}
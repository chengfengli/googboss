/**
 * Created by Allen on 2017/3/17.
 */
import {FastLoanPaymentStatusInfo} from "./fast-loan-payment-status-info";

export class FastLoanRepaymentDetail {
    /** 是否有下一页标识 Y - 是 N - 否 */
    nextPageFlag: string;
    /** 商户号 */
    mchtCd: string;
    /** 开始位置 */
    firstRow: number;
    /** 结束位置 */
    lastRow: number;
    /** 总条数 */
    totalRow: number;
    /** 还款明细 */
    paymentStatusList: FastLoanPaymentStatusInfo[];
}
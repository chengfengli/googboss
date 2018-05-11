export class BusinessDetailFund {
    /** 交易日期 */
    transDate: Date;
    /** 交易来源 */
    transPaymentSource: string;
    /** 交易来源名称 */
    transPaymentSourceName: string;
    /** 收入金额 */
    incomeAmt: number;
    /** 支出金额 */
    repaymentAmt: number;
    /** 实收金额 */
    actualIncomeAmt: number;
}

export class FastLoanPaymentStatusInfo {

    static RepaymentStatus = {
        /** 还款中 */
        PAYING: "P004",
        /** 还款成功 */
        PAY_SUCCESSED: "S000",
    }

    static RepaymentSource = {
        /** POS流水还款 */
        POS: "P",
        /** 通联通线上还款 */
        REPAMENT: "T",
        ALLINPAY_WALLET: "W",
        /** 线下还款 */
        OFFLINE: "O",
        /** 系统产生 */
        SYSTEM: "S",
    }

    /** 订单号 */
    orderNo: string;
    /** 借据号 */
    dueBillNo: string;
    /** 请求还款金额 */
    reqRepaymentAmt: number;
    /** 实际还款金额 */
    actualRepaymentAmt: number;
    /** 请求还款时间 */
    reqRepaymentTime: Date;
    /** 时间还款时间 */
    actualRepaymentTime: Date;
    /** 还款状态 */
    repaymentStatus: string;
    /** 还款类型/还款渠道 */
    repaymentSource: string;
}


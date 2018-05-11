export class FastLoanRealtimePayment {
    /** POS流水还款 */
    posPayAmt: number;
    /** 银行贷扣还款 */
    tltPayAmt: number;
    /** 在线支付还款 */
    onlinePayAmt: number;
    /** 线下还款 */
    offlinePayAmt: number;
    /** 剩余还款金额 */
    leftPayAmt: number;
}
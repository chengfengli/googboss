/**
 * Created by Allen on 2017/3/8.
 */
export class DailyLoanDeposit {
    // private String mchtCd;
    // /** 交易流水号 */
    // private String transSn;
    // /** 交易日期 */
    // private Date transDate;
    // /** 交易时间 */
    // private Date transTime;
    // /** 交易流水总额 */
    // private BigDecimal totalAmt;
    // /** 当前可提现金额 */
    // private BigDecimal withDrawalsAllowoAmt;
    // /** 当日限额 */
    // private BigDecimal dayQuota;
    // /** 管理费率 */
    // private BigDecimal managementRate;
    // /** 单笔最小额 */
    // private BigDecimal singleAmt;
    // /** 当日提现功能状态 */
    // private String dayStatus;
    // /** 次日提现功能状态 */
    // private String nextDayStatus;
    // /** 当前欠款总额 */
    // private BigDecimal debtAmt;
    // /** 手续费 */
    // private BigDecimal commissionAmt;
    // /** 已提现金额 */
    // private BigDecimal withDrawal;
    // /** 起始日 */
    // private Date startDate;
    // /** 还款日 */
    // private Date endDate;
    // /** 融资天数 */
    // private Integer financingDays;
    // /** 滞纳金费率 */
    // private BigDecimal lateRate;

    mchtCd: string;
    mchtName: string;
    transSn: string;
    transDate: Date;
    transTime: Date;
    totalAmt: number = -1;
    withDrawalsAllowoAmt: number = -1;
    dayQuota: number;
    managementRate: number;
    singleAmt: number;
    dayStatus: string;
    nextDayStatus: string;
    debtAmt: number;
    commissionAmt: number;
    withDrawal: number = -1;
    startDate: Date;
    endDate: Date;
    financingDays: number;
    lateRate: number;
}
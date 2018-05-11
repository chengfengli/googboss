export class FastLoanDeposit {
    static LoanAuditStatus = {
        /** 征审拒绝 */
        CREDIT_REJECTED: "L01",
        /** 待人工审批 */
        MANUAL_REVIEW: "L02",
        /** 审批通过待签约 */
        REVIEW_PASSED: "L03",
        /** 审批拒绝 */
        REVIEW_REJECTED: "L04",
        /** 放款成功 */
        PAYMENT_SUCCESSED: "L05",
        ESTABLISH: "L99",
        /** 放款失败 */
        PAYMENT_FAILED: "L06",
        /** 开户成功放款中 */
        PAYMENT_PROCESSING: "L07",
        /** 校验失败 */
        VERIFY_FAILED: "L08",
    }

    static LoanStatus = {
        /** 注册但未活动 */
        INACTIVE: "I",
        /** 活动状态 */
        ACTIVE: "A",
        /** 终止 */
        TERMINATE: "T",
        /** 完成 */
        FINISH: "F",
    }

    /** 商户号 */
    mchtCd: string;
    /** 商户名称 */
    mchtName: string;
    /** 贷款审核状态 */
    loanAuditStatus: string;
    /** 贷款状态 */
    loanStatus: string;
    /** 申请额度 */
    applyLimit: number = -1;
    /** 申请日期 */
    applyDate: Date;
    /** 审批额度 */
    approveLimit: number;
    /** 审核日期 */
    approveDate: Date;
    /** 放款金额 */
    repaymentAmt: number = -1;
    /** 放款日期 */
    repaymentDate: Date;
    /** 账款管理费率 - 基础费率 */
    manageFeeRate: number;
    /** 加收账款管理费率1 - 即只还清最小还款额，惩罚费率 */
    extraManageFeeRate1: number;
    /** 加收账款管理费率2 - 滞纳金费率 */
    extraManageFeeRate2: number;
    /** 周期乘数 */
    loanCycleIer: number;
    /** 周期类型 - D|日 W|周 H|双周 M|月 */
    loanCycleType: string;
    /** 贷款期限(月) */
    loanDuration: number;
    /** 本期还款时间 */
    ctdRepaymentTime: Date;
    /** 本期最低还款金额 */
    ctdLowRepaymentAmt: number = -1;
    /** 下期扣款时间 */
    ntdRepaymentDate: Date;
    /** 下期扣款金额 */
    ntdRepaymentAmt: number;
    /** 总期数 */
    totalTerms: number;
    /** 当前期数 */
    currentTerm: number;
    /** 档期应还款额 - 当前应还款总额 */
    curNeedRepayedTotalAmt: number = -1;
    /** 当前应还本金 */
    curNeedRepayedPrincipal: number = -1;
    /** 当前应还账款管理费用 */
    curNeedRepayedManageFee: number;
    /** 当前应还加收账款管理费用1 - 罚息 */
    curNeedRepayedExtraManageFee1: number;
    /** 当前应还加收账款管理费用2 */
    curNeedRepayedExtraManageFee2: number;
    /** 最大逾期数 */
    overdueMaxTerm: number;
    /** 业务类型 */
    buinessType: string;
    /** 贷款本金余额 */
    surplusPrin: number;
    /** 激活日期 - 即贷款起始日期 */
    activeDate: Date;
    /** 贷款到期日 - 即正常贷款到期日 */
    endDate: Date;
    /** 签约有效剩余天数 */
    signRemainDays: number;

}
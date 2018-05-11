export class FastLoanApplyInfo {

    static ApplyType = {
        /** 首次贷款 */
        FIRST_APPLY: "1",
        /** 普通再贷 */
        CONTINUE_APPLY: "2",
        /** 一键再贷 */
        ONE_KEY_APPLY: "3"
    }

    static ApplyStatus = {
        /** 接口调用失败 */
        CALL_FAILED: "-1",
        /** 申请中 */
        APPLYING: "0",
        /** 预审拒绝 */
        PRE_ADUIT_REFUSED: "1",
        /** 预审通过 */
        PRE_ADUIT_PASSED: "2",
        /** 预审拒绝但是特例商户提交审核中 */
        PRE_ADUIT_SPECIAL_REVIEW: "3",
        /** 初审拒绝 (红灯) */
        ADUIT_REFUSED: "4",
        /** 初审通过 (绿灯) */
        ADUIT_PASSED: "5",
        /** 大额审批 (黄灯) */
        BIG_AMOUNT_REVIEW: "6",
        /** 规则触发 (黄灯) */
        RULE_REVIEW: "7",
        /** 初审拒绝但是特例商户提交审核中 */
        ADUIT_SPECIAL_REVIEW: "8",
        /** 违例进件审核中 */
        INLEGAL_APPLY_REVIEW: "9",
        /** 审核通过待签约 */
        REVIEW_PASSED: "10",
        /** 申请完成|签约完成 */
        APPLY_SUCCESSED: "11",
        /** 审核拒绝 */
        REVIEW_REFUSED: "12",
        /** 超时未签约 */
        SIGN_TIMEOUT: "13",
        /** 贷款终止 */
        LOAN_TERMINATE: "14",
        /** 贷款完成 */
        LOAN_FINISHED: "15",
    }

    tid: string;

    mchtTid: number;

    mchtCd: string;
    mchtName: string;
    signRemainDays: number;

    productTid: number;

    applySource: string;

    applyNo: string;

    applyTime: Date;

    submitTime: Date;

    applyType: string;

    applyStatus: string;

    applyStatusChangeTime: Date;

    bankAccount: string;
    bankName: string;

    loanAmount: number;

    loanDuration: string;

    paymentType: string;

    eduLevel: string;

    maritalStatus: string;

    houseStatus: string;

    preAuditTime: Date;

    preAuditResult: string;

    ftTime: Date;

    ftLoanAmount: number;

    ftLoanDuration: number;

    ftPaymentType: string;

    ftLoanRate: number;

    ftManageFeeRate: number;

    ftDecisionCode: string;

    ftStatus: string;

    reviewTime: Date;

    reviewAmount: number;

    reviewDuration: number;

    reviewPaymentType: string;

    reviewManageFeeRate: number;

    reviewRate: number;

    reviewLoanAuditStatus: string;

    contractNo: string;

    contractLocation: string;

    mchtType: string;

    dueBillNo: string;

    loanCashedStatus: string;

    loanCashedStatusChangeTime: Date;

    'delete': boolean;

    createTime: Date;

    lastUpdateTime: Date;

    lastUpdateUserId: number;
}
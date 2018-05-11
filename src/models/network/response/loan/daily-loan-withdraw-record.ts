/**
 * Created by Allen on 2017/3/9.
 */
export class DailyLoanWithdrawRecord {
    tid: number;
    applicationTid: number;
    mchtTid: number;
    serviceSn: string;
    applyTime: Date;
    submitTime: Date;
    dueBillNo: string;
    applyStatus: string;
    applyAmount: number;
    arrivalAmount: number;
    applyFailedReason: string;
    delete: boolean;
    createTime: Date;
    lastUpdateTime: Date;
    lastUpdateUserId: number;

    static ApplyStatus = {
        NOT_SUBMIT: '0',
        SUBMITED: '1',
        WITHDRAWAL_SUCCESSED: '2',
        WITHDRAWAL_FAILED: '3',
        CALL_FAILED: '4'
    }

    // 	/** 尚未提交 */
    // String NOT_SUBMIT = "0";
    // /** 已提交(申请中) */
    // String SUBMITED = "1";
    // /** 提现成功 */
    // String WITHDRAWAL_SUCCESSED = "2";
    // /** 提现失败 */
    // String WITHDRAWAL_FAILED = "3";
    // /** 调用失败 */
    // String CALL_FAILED = "4";
}
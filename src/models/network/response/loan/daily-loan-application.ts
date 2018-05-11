export class DailyLoanApplication {
    tid: number;
    mchtTid: number;
    productTid: number;
    bankAccount: string;
    status: string;
    verifyApplySn: string;
    verifyTime: Date;
    verifyStatus: string;
    applySn: string;
    applyTime: Date;
    applyStatus: string;
    contractNo: string;
    contractLocation: string;
    delete: boolean;
    createTime: Date;
    lastUpdateTime: Date;
    lastUpdateUserId: number;

    static Status = {
        APPLYING: '0',
        SUBMITED: '1',
        REJECTED: '2',
        SIGNING: '3',
        COMPLETED: '4',
        CALL_FAILED: '5'
        //     		/** 申请中 */
        // String APPLYING = "0";
        // /** 申请审批中，已经提交给通金 */
        // String SUBMITED = "1";
        // /** 申请被拒绝 */
        // String REJECTED = "2";
        // /** 签约中 */
        // String SIGNING = "3";
        // /** 申请完成 */
        // String COMPLETED = "4";
        // /** 调用失败 */
        // String CALL_FAILED = "5";
    }
}
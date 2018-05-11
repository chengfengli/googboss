/**
 * Created by Allen on 2017/3/9.
 */
export class DailyLoanStatus {
    loanApplyStatus: string;
    authStatus: string;
    applyStatus: string;
    lastRefuseDate: Date;
    rtfState: string;
    responseCode: string;
    responseDesc: string;

    static LoanApplyStatus = {
        NOT_APPLY_YET: 'N',
        APPLY_PROCESSING_SYSTEM: 'H',
        APPLY_VERIFING: 'A',
        WAITING_SIGN: 'W',
        SIGNING: 'C',
        SIGNING_UNCOMPLETE: 'U',
        APPLY_SUCCESSED: 'S',
        APPLY_FAILED: 'F'
    }

//     public interface LoanApplyStatus {
//     /** 尚未申请 */
//     String NOT_APPLY_YET = "N";
//     /** 申请处理中|系统 */
//     String APPLY_PROCESSING_SYSTEM = "H";
//     /** 申请审批中|人工 */
//     String APPLY_VERIFING = "A";
//     /** 申请待签约|用户 */
//     String WAITING_SIGN = "W";
//     /** 申请签约中|系统 */
//     String SIGNING = "C";
//     /** 申请签约未完成 */
//     String SIGNING_UNCOMPLETE = "U";
//     /** 申请成功 */
//     String dailyLoanApplyStatusPipe = "S";
//     /** 申请失败 */
//     String APPLY_FAILED = "F";
// }
}
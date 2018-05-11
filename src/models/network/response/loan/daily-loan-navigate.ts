/**
 * Created by Allen on 2017/3/6.
 */
export class DailyLoanNavigate {
    status: number;
    pageData: any;

    static Status = {
        NOT_OPEN: 0,
        SIGNED: 1,
        WAITING_SIGN: 2,
        VERIFYING: 3,
        NOT_QULIFIED: 4,
        SIGN_UNCOMPLETE: 5,
        UNDER_SIGNING: 6
    }
}


// public interface Status {
//     /** 0 - 跳转到申请页面（有数据）- 未开通 */
//     int NOT_OPEN = 0;
//     /** 1 - 跳转到天天融信息页面(有数据）- 已开通已签约 */
//     int SIGNED = 1;
//     /** 2 - 跳转到天天融签约页面（有数据）- 申请中待签约 */
//     int WAITING_SIGN = 2;
//     /** 3 - 跳转到天天融审批等待中页面（静态页面）- 申请中审批中 */
//     int VERIFYING = 3;
//     /** 4 - 跳转到不符合申请条件页面（静态页面）- 不符合条件 */
//     int NOT_QULIFIED = 4;
//     /** 5 - 签约不成功，联系客户经理 */
//     int SIGN_UNCOMPLETE = 5;
//     /**  6 - 签约申请已提交，还没有结果 */
//     int UNDER_SIGNING = 3;
// }
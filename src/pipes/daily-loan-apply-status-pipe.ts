import {Injectable, Pipe} from "@angular/core";
import {DailyLoanStatus} from "../models/network/response/loan/daily-loan-status";

/*
 Generated class for the DailyLoanApplyStatusPipe pipe.

 See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 Angular 2 Pipes.
 */
@Pipe({
    name: 'dailyLoanApplyStatusPipe'
})
@Injectable()
export class DailyLoanApplyStatusPipe {
    /*
     Takes a value and makes it lowercase.
     */
    transform(value, args) {
        value = value + '';
        if (value === DailyLoanStatus.LoanApplyStatus.NOT_APPLY_YET) {
            return '尚未申请';
        } else if (value === DailyLoanStatus.LoanApplyStatus.APPLY_PROCESSING_SYSTEM) {
            return '申请处理中';
        } else if (value === DailyLoanStatus.LoanApplyStatus.APPLY_VERIFING) {
            return '申请审批中';
        } else if (value === DailyLoanStatus.LoanApplyStatus.WAITING_SIGN) {
            return '申请待签约';
        } else if (value === DailyLoanStatus.LoanApplyStatus.SIGNING) {
            return '申请签约中';
        } else if (value === DailyLoanStatus.LoanApplyStatus.APPLY_FAILED) {
            return '申请失败';
        } else if (value === DailyLoanStatus.LoanApplyStatus.SIGNING_UNCOMPLETE) {
            return '申请签约未完成';
        }
        return "";
    }

}

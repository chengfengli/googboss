import {Injectable, Pipe} from "@angular/core";
import {DailyLoanAntiTransactionApplyStatus} from "../models/network/response/loan/daily-loan-anti-transaction-apply-status";

/*
 Generated class for the DailyLoanAntiTransactionApplyStatusPipe pipe.

 See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 Angular 2 Pipes.
 */
@Pipe({
    name: 'dailyLoanAntiTransactionApplyStatusPipe'
})
@Injectable()
export class DailyLoanAntiTransactionApplyStatusPipe {
    /*
     Takes a value and makes it lowercase.
     */
    transform(value, args) {
        value = value + '';
        if (value === DailyLoanAntiTransactionApplyStatus.ProStatus.NEW) {
            return '新增';
        } else if (value === DailyLoanAntiTransactionApplyStatus.ProStatus.SUCCESS) {
            return '成功';
        } else if (value === DailyLoanAntiTransactionApplyStatus.ProStatus.FAILED) {
            return '失败';
        } else if (value === DailyLoanAntiTransactionApplyStatus.ProStatus.PROCESSING) {
            return '处理中';
        }
        return "";
    }
}

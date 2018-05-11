import {DailyLoanWithdrawRecord} from "./../models/network/response/loan/daily-loan-withdraw-record";
import {Injectable, Pipe} from "@angular/core";

/*
 Generated class for the WithdrawApplyStatusPipe pipe.

 See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 Angular 2 Pipes.
 */
@Pipe({
    name: 'withdrawApplyStatusPipe'
})
@Injectable()
export class WithdrawApplyStatusPipe {
    /*
     Takes a value and makes it lowercase.
     */
    transform(value, args) {
        value = value + '';
        if (value === DailyLoanWithdrawRecord.ApplyStatus.NOT_SUBMIT) {
            return '尚未提交';
        } else if (value === DailyLoanWithdrawRecord.ApplyStatus.SUBMITED) {
            return '已提交';
        } else if (value === DailyLoanWithdrawRecord.ApplyStatus.WITHDRAWAL_SUCCESSED) {
            return '提现成功';
        } else if (value === DailyLoanWithdrawRecord.ApplyStatus.WITHDRAWAL_FAILED) {
            return '提现失败';
        }
        return '调用失败';
    }
}

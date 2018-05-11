import {DailyLoanAntiTransactionStatus} from "./../models/network/response/loan/daily-loan-anti-transaction-status";
import {Injectable, Pipe} from "@angular/core";

/*
 Generated class for the DailyLoanAntiTransactionStatusPipe pipe.

 See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 Angular 2 Pipes.
 */
@Pipe({
    name: 'dailyLoanAntiTransactionStatusPipe'
})
@Injectable()
export class DailyLoanAntiTransactionStatusPipe {
    /*
     Takes a value and makes it lowercase.
     */
    transform(value, args) {
        value = value + '';
        if (value === DailyLoanAntiTransactionStatus.RetCode.OPEN) {
            return '开';
        } else if (value === DailyLoanAntiTransactionStatus.RetCode.CLOSE) {
            return '关';
        }
        return "";
    }
}

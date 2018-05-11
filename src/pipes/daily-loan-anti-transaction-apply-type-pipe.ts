import {Injectable, Pipe} from "@angular/core";
import {DailyLoanAntiTransactionRequestInfo} from "../models/network/response/loan/daily-loan--anti-transaction-request-info";

/*
 Generated class for the DailyLoanAntiTransactionApplyTypePipe pipe.

 See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 Angular 2 Pipes.
 */
@Pipe({
    name: 'dailyLoanAntiTransactionApplyTypePipe'
})
@Injectable()
export class DailyLoanAntiTransactionApplyTypePipe {
    /*
     Takes a value and makes it lowercase.
     */
    transform(value, args) {
        value = value + '';
        if (value === DailyLoanAntiTransactionRequestInfo.OperType.OPEN) {
            return '申请开启';
        } else if (value === DailyLoanAntiTransactionRequestInfo.OperType.CLOSE) {
            return '申请关闭';
        }
        return "";
    }
}

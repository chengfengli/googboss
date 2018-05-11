import {Injectable, Pipe} from "@angular/core";
import {FastLoanDeposit} from "../models/network/response/loan/fast-loan-deposit";

/*
 Generated class for the FastLoanPaymentStatusPipe pipe.

 See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 Angular 2 Pipes.
 */
@Pipe({
    name: 'fastLoanPaymenStatusPipe'
})
@Injectable()
export class FastLoanPaymentStatusPipe {
    /*
     Takes a value and makes it lowercase.
     */
    transform(value, args) {
        value = value + '';
        if (value === FastLoanDeposit.LoanAuditStatus.PAYMENT_PROCESSING) {
            return '开户成功放款中';
        } else if (value === FastLoanDeposit.LoanAuditStatus.PAYMENT_FAILED) {
            return '放款失败';
        } else if (value === FastLoanDeposit.LoanAuditStatus.PAYMENT_SUCCESSED) {
            return '放款成功';
        }
        return value;
    }
}

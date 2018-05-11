import {Injectable, Pipe} from "@angular/core";

/*
 Generated class for the FastLoanInitiativeRepaymentStatusPipe pipe.

 See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 Angular 2 Pipes.
 */
@Pipe({
    name: 'fastLoanInitiativeRepaymentStatusPipe'
})
@Injectable()
export class FastLoanInitiativeRepaymentStatusPipe {
    /*
     Takes a value and makes it lowercase.
     */
    transform(value, args) {
        if (value) {
            value = this.fastLoanTerm(value);
        }
        return value;
    }

    fastLoanTerm(value: string) {
        if (value === '0') {
            return '申请中';
        } else if (value === '1') {
            return '已提交';
        } else if (value === '2') {
            return '已完成';
        } else if (value === '3') {
            return '已作废';
        }
    }
}

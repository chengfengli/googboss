import {Injectable, Pipe} from "@angular/core";

/*
 Generated class for the FastLoanRepaymentTypePipe pipe.

 See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 Angular 2 Pipes.
 */
@Pipe({
    name: 'fastLoanRepaymentTypePipe'
})
@Injectable()
export class FastLoanRepaymentTypePipe {
    /*
     Takes a value and makes it lowercase.
     */
    transform(value, args) {
        if (value) {
            value = value + '';
            value = this.transformValue(value);
        }
        return value;
    }

    transformValue(value: string) {
        if (value === 'D') {
            return '日还';
        } else if (value === 'W') {
            return '周还';
        } else if (value === 'H') {
            return '双周还';
        } else if (value === 'M') {
            return '月还';
        }
    }
}

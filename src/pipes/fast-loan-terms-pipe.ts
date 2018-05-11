import {Injectable, Pipe} from "@angular/core";

/*
 Generated class for the FastLoanTermsPipe pipe.

 See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 Angular 2 Pipes.
 */
@Pipe({
    name: 'fastLoanTermsPipe'
})
@Injectable()
export class FastLoanTermsPipe {
    /*
     Takes a value and makes it lowercase.
     */
    transform(value, args) {
        if (value) {
            value = value + '';
            value = this.fastLoanTerm(value);
        }
        return value;
    }

    fastLoanTerm(value: string) {
        if (value === '3') {
            return '3个月';
        } else if (value === '6') {
            return '6个月';
        } else if (value === '9') {
            return '9个月';
        } else if (value === '12') {
            return '12个月';
        }
    }
}

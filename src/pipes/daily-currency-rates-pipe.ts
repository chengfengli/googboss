import {Util} from "./../utils/util";
import {Injectable, Pipe} from "@angular/core";

/*
 Generated class for the DailyCurrencyRatesPipe pipe.

 See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 Angular 2 Pipes.
 */
@Pipe({
    name: 'dailyCurrencyRatesPipe'
})
@Injectable()
export class DailyCurrencyRatesPipe {
    /*
     Takes a value and makes it lowercase.
     */
    transform(value, args) {
        if (value) {
            value = this.currencyRatesFormat(value, args);
            return value;
        }
        return '-';
    }

    currencyRatesFormat(value: number, args) {
        if (value === null) return '';
        if (args) {
            let newValue = Util.changeTwoDecimal(value * 10000);
            return '万分之' + newValue;
        }
        let newValue = Util.changeTwoDecimal(value * 10000 / 360);
        return '万分之' + newValue;
    }
}

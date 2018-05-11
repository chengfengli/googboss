import {Injectable, Pipe} from "@angular/core";

/*
 Generated class for the CurrencyRatesPipe pipe.

 See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 Angular 2 Pipes.
 */
@Pipe({
    name: 'currencyRatesPipe'
})
@Injectable()
export class CurrencyRatesPipe {
    /*
     Takes a value and makes it lowercase.
     */
    transform(value, args) {
        if (value) {
            value = this.currencyRatesFormat(value);
            return value;
        }
        return '0.0000 %';
    }

    currencyRatesFormat(value: number) {
        if (value === null) return '';
        let newValue = parseInt(value * 10000 + "") * 100 / 10000 + 0.000001 + '';
        newValue = newValue.substr(0, newValue.indexOf(".") + 5);
        return newValue + " %";
    }
}
import {Injectable, Pipe} from "@angular/core";

/*
 Generated class for the CurrencyRatesPipe pipe.

 See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 Angular 2 Pipes.
 */
@Pipe({
    name: 'contractRates'
})
@Injectable()
export class ContractRatesPipe {
    /*
     Takes a value and makes it lowercase.
     */
    transform(value, args) {
        if (value) {
            value = this.currencyRatesFormat(value);
            return value;
        }
        return '万分之0';
    }

    currencyRatesFormat(value: number) {
        if (value === null) return '';
        let newValue = (value * 10000).toFixed(2);
        return "万分之" + newValue;
    }
}
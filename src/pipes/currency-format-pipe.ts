import {Injectable, Pipe} from "@angular/core";

/*
 Generated class for the CurrencyFormatPipe pipe.

 See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 Angular 2 Pipes.
 */
@Pipe({
    name: 'currencyPipe'
})
@Injectable()
export class CurrencyFormatPipe {
    transform(value, args) {
        if (value !== null && value >= 0) {
            value = value + '';
            value = this.currencyFormat(value);
            return value;
        }
        return '-';
    }

    currencyFormat(value: string, fmt = 2) {
        if (value === null || value === '') return '';
        value = parseFloat((value + "").replace(/[^\d\.-]/g, "")).toFixed(fmt) + "";
        var l = value.split(".")[0].split("").reverse(),
            r = value.split(".")[1];
        let t = "";
        for (let i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
    }
}



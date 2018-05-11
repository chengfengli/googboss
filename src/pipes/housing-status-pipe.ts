import {Injectable, Pipe} from "@angular/core";

/*
 Generated class for the HousingStatusPipe pipe.

 See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 Angular 2 Pipes.
 */
@Pipe({
    name: 'housingStatusPipe'
})
@Injectable()
export class HousingStatusPipe {
    /*
     Takes a value and makes it lowercase.
     */
    transform(value, args) {
        if (value) {
            value = this.transformValue(value);
        }
        return value;
    }

    transformValue(value: string) {
        if (value === '1') {
            return '自有无房贷';
        } else if (value === '2') {
            return '自有有房贷';
        } else if (value === '3') {
            return '宿舍';
        } else if (value === '4') {
            return '租赁';
        } else if (value === '5') {
            return '其他';
        }
    }
}

import {Injectable, Pipe} from "@angular/core";

/*
 Generated class for the MarriedStatusPipe pipe.

 See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 Angular 2 Pipes.
 */
@Pipe({
    name: 'marriedStatusPipe'
})
@Injectable()
export class MarriedStatusPipe {
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
            return '未婚';
        } else if (value === '2') {
            return '已婚';
        } else if (value === '3') {
            return '离异';
        } else if (value === '4') {
            return '丧偶';
        }
    }
}

import {Injectable, Pipe} from "@angular/core";

/*
 Generated class for the CardTypePipe pipe.

 See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 Angular 2 Pipes.
 */
@Pipe({
    name: 'nameCardTypePipe'
})
@Injectable()
export class NameCardStatusPipe {
    /*
     Takes a value and makes it lowercase.
     */
    transform(value, args) {
        value = value + ''; // make sure it's a string
        return this.transformValue(value);
    }

    transformValue(value: string) {
        if (value === '0') {
            return '审核中';
        } else if (value === '1') {
            return '审核通过';
        } else if (value === '2') {
            return '已撤销';
        }
    }
}

import {Injectable, Pipe} from "@angular/core";

/*
 Generated class for the CardTypePipe pipe.

 See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 Angular 2 Pipes.
 */
@Pipe({
    name: 'cardTypePipe'
})
@Injectable()
export class CardTypePipe {
    /*
     Takes a value and makes it lowercase.
     */
    transform(value, args) {
        value = value + ''; // make sure it's a string
        return this.transformValue(value);
    }

    transformValue(value: string) {
        if (value === 'I') {
            return '身份证';
        } else if (value === 'R') {
            return '户口簿';
        } else if (value === 'P') {
            return '护照';
        } else if (value === 'S') {
            return '军官证/士兵证';
        } else if (value === 'H') {
            return '港澳居民来往内地通行证';
        } else if (value === 'W') {
            return '台湾同胞来往内地通行证';
        } else if (value === 'T') {
            return '临时身份证';
        } else if (value === 'F') {
            return '外国人居留证';
        } else if (value === 'C') {
            return '警官证';
        } else if (value === 'O') {
            return '其他证件';
        } else if (value === 'L') {
            return '营业执照';
        }
    }
}

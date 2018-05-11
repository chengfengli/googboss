import {Injectable, Pipe} from "@angular/core";

/*
 Generated class for the EducationPipe pipe.

 See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 Angular 2 Pipes.
 */
@Pipe({
    name: 'educationPipe'
})
@Injectable()
export class EducationPipe {
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
            return '初中及以下';
        } else if (value === '2') {
            return '高中／中专／技校';
        } else if (value === '3') {
            return '大专';
        } else if (value === '4') {
            return '本科';
        } else if (value === '5') {
            return '硕士及以上';
        }
    }
}

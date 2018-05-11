import {Util} from "./../utils/util";
import {Injectable, Pipe} from "@angular/core";

/*
 Generated class for the SensitiveInformationProtectionPipe pipe.

 See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 Angular 2 Pipes.
 */
@Pipe({
    name: 'sensitiveInformationProtectionPipe'
})
@Injectable()
export class SensitiveInformationProtectionPipe {
    /*
     Takes a value and makes it lowercase.
     */
    transform(value, args) {
        value = value + ''; // make sure it's a string
        if (Util.isNotNullOrUndefined) {
            return value.substr(0, value.length - 4) + '****';
        }
        return '';
    }
}

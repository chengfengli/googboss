import {ConfigService} from "./../providers/config-service";
import {Injectable, Pipe} from "@angular/core";

/*
 Generated class for the AllinpayServiceTypePipe pipe.

 See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 Angular 2 Pipes.
 */
@Pipe({
    name: 'allinpayServiceTypePipe'
})
@Injectable()
export class AllinpayServiceTypePipe {

    constructor(private configService: ConfigService) {

    }

    /*
     Takes a value and makes it lowercase.
     */
    transform(value, args) {
        value = value + ''; // make sure it's a string
        return this.transformValue(value);
    }

    transformValue(value: string) {
        let types = this.configService.getCustomerServiceTypes();
        let valueStr = '';
        types.forEach(task => {
            if (value === task.subId) {
                valueStr = task.name;
            }
        });
        return valueStr;
    }
}

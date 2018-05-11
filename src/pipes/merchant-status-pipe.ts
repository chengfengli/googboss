import {Injectable, Pipe} from "@angular/core";
import {Merchant} from "../models/merchant/merchant";

/*
 Generated class for the MerchantStatusPipe pipe.

 See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 Angular 2 Pipes.
 */
@Pipe({
    name: 'merchantStatusPipe'
})
@Injectable()
export class MerchantStatusPipe {
    /*
     Takes a value and makes it lowercase.
     */
    transform(value, args) {
        value = value + '';
        if (value === Merchant.Status.CERTIFIED) {
            return '已通过';
        } else if (value === Merchant.Status.PENDING_AUTHENTICATION) {
            return '待审核';
        } else if (value === Merchant.Status.REJECTED) {
            return '被拒绝';
        } else if (value === Merchant.Status.OBSOLETE) {
            return '已作废';
        } else if (value === Merchant.Status.CANCLE) {
            return '已撤销';
        }
        return '';
    }
}

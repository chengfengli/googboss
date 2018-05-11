import {AllinpayInfo} from "./../../models/network/request/user/allinpay-info";
import {Injectable, forwardRef, Inject} from "@angular/core";
import "rxjs/add/operator/map";
import {HttpService} from "../../providers/http-service";
import {HttpMethod} from "../../enums/http-method";
import {ContentType} from "../../enums/content-type";

/*
 Generated class for the BusinessService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class JoinAllinpayService {

    constructor(@Inject(forwardRef(() => HttpService)) public httpService: HttpService) {
        console.log('Hello BusinessService Provider');
    }

    public joinAllinpay(userInfo: AllinpayInfo, success: () => void) {
        this.httpService.httpRequest('/callCenter/merchant.htm', userInfo, HttpMethod.Post, ContentType.Form, () => {
            success();
        });
    }
}

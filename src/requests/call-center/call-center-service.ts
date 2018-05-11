import "rxjs/add/operator/map";
import {HttpService} from "../../providers/http-service";
import {CenterApplyRequstInfo} from "../../models/network/request/center/center-apply-requst-info";
import {HttpMethod} from "../../enums/http-method";
import {ContentType} from "../../enums/content-type";
import {CallCenterSearchRequestInfo} from "../../models/network/request/center/call-center-search-request-info";
import {BaseData} from "../../models/network/response/base/base-data";
import {CallCenterScoreRequestInfo} from "../../models/network/request/center/call-center-score-request-info";
import {Injectable, forwardRef, Inject} from "@angular/core";
/*
 Generated class for the CallCenterService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class CallCenterService {

    constructor(@Inject(forwardRef(() => HttpService)) public httpService: HttpService) {
        console.log('Hello CallCenterService Provider');
    }

    public saveApply(centerApplyRequstInfo: CenterApplyRequstInfo, success: () => void) {
        this.httpService.httpRequest('/callCenter/orders.htm', centerApplyRequstInfo, HttpMethod.Post, ContentType.Form, () => {
            success();
        });
    }

    public listApplyOrders(callCenterSearchRequestInfo: CallCenterSearchRequestInfo, success: (centerApplyRequstInfos: CenterApplyRequstInfo[]) => void, fail?: (data) => void, handleNetworkError?: () => void) {
        this.httpService.httpRequest('/callCenter/orders.htm', callCenterSearchRequestInfo, HttpMethod.Get, ContentType.Form, (data: BaseData<CenterApplyRequstInfo>) => {
            success(data.results);
        }, (data) => {
            if (fail) {
                fail(data);
            }
        }, false, handleNetworkError);
    }

    public saveScore(callCenterScoreRequestInfo: CallCenterScoreRequestInfo, success: () => void) {
        this.httpService.httpRequest('/callCenter/score.htm', callCenterScoreRequestInfo, HttpMethod.Put, ContentType.JSON, () => {
            success();
        });
    }
}

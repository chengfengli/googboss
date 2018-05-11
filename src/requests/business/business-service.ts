import {BusinessDailyDetailResult} from "./../../models/network/response/business/business-daily-detail-result";
import {BusinessPosDetailResult} from "./../../models/network/response/business/business-pos-detail-result";
import {BusinessJournalResult} from "./../../models/network/response/business/business-journal-result";
import {BusinessJournalSummaryResult} from "./../../models/network/response/business/business-journal-summary-result";
import {BusinessDailyRequestInfo} from "./../../models/network/request/business/business-daily-request-info";
import {BusinessGeneralJournalRequestInfo} from "./../../models/network/request/business/business-general-journal-request-info";
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
export class BusinessService {

    constructor(@Inject(forwardRef(() => HttpService)) public httpService: HttpService) {
        console.log('Hello BusinessService Provider');
    }

    public getBusinessHome(success: (businessHomeResult: BusinessJournalSummaryResult) => void) {
        this.httpService.httpRequest('/analysis/gj/index.htm', null, HttpMethod.Get, ContentType.JSON, (businessHomeResult) => {
            success(businessHomeResult);
        });
    }

    public getBusinessCollect(mchtInfo: BusinessGeneralJournalRequestInfo, success: (businessCollectResult: BusinessJournalResult) => void) {
        this.httpService.httpRequest('/analysis/gj/summery.htm', mchtInfo, HttpMethod.Get, ContentType.JSON, (businessCollectResult) => {
            success(businessCollectResult);
        });
    }

    public getBusinessPosCollect(mchtInfo: BusinessGeneralJournalRequestInfo, success: (businessCollectResult: BusinessJournalResult) => void) {
        this.httpService.httpRequest('/analysis/gj/summeryfunds.htm', mchtInfo, HttpMethod.Get, ContentType.JSON, (businessCollectResult) => {
            success(businessCollectResult);
        });
    }

    public getPosDetail(mchtInfo: BusinessDailyRequestInfo, success: (businessPosResult: BusinessPosDetailResult) => void, fail?: (data) => void, handleNetworkError?: () => void) {
        this.httpService.httpRequest('/analysis/gj/dialy-trans.htm', mchtInfo, HttpMethod.Get, ContentType.JSON, (businessPosResult) => {
            success(businessPosResult);
        }, (data) => {
            if (fail) {
                fail(data);
            }
        }, false, handleNetworkError);
    }

    public getBusinessDaily(mchtInfo: BusinessDailyRequestInfo, success: (businessDailyResult: BusinessDailyDetailResult) => void) {
        this.httpService.httpRequest('/analysis/gj/dialy-funds.htm', mchtInfo, HttpMethod.Get, ContentType.JSON, (businessDailyResult) => {
            success(businessDailyResult);
        });
    }

    public enterBusiness(success: (enterStatus: boolean) => void) {
        this.httpService.httpRequest('/analysis/gj/enter.htm', null, HttpMethod.Get, ContentType.JSON, (enterStatus) => {
            success(enterStatus);
        });
    }
}

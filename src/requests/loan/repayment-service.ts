import {Injectable, forwardRef, Inject} from "@angular/core";
import "rxjs/add/operator/map";
import {HttpService} from "../../providers/http-service";
import {RepaymentInfo} from "../../models/network/request/loan/repayment-info";
import {HttpMethod} from "../../enums/http-method";
import {ContentType} from "../../enums/content-type";
import {InitiativeRepaymentSearchInfo} from "../../models/network/request/loan/initiative-repayment-search-info";
import {InitiativeRepaymentRecord} from "../../models/network/response/loan/initiative-repayment-record";
import {BaseData} from "../../models/network/response/base/base-data";
import {AllinpayTongResultInfo} from "../../models/network/response/loan/allinpay-tong-result-info";
import {ConfigService} from "../../providers/config-service";

/*
 Generated class for the RepaymentService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class RepaymentService {

    constructor(@Inject(forwardRef(() => HttpService)) public httpService: HttpService) {
        console.log('Hello DailyLoanService Provider');
    }

    getAllinpayWalletURL(repaymentInfo: RepaymentInfo, success: (url: string) => void) {
        this.httpService.httpRequest('/repayments/allinpay/wallet.htm', repaymentInfo, HttpMethod.Post, ContentType.JSON, (url: string) => {
            success(url);
            ConfigService.shouldReloadHome = true;
        });
    }

    listInitiativeRepaymentRecords(initiativeRepaymentSearchInfo: InitiativeRepaymentSearchInfo, success: (initiativeRepaymentRecords: InitiativeRepaymentRecord[]) => void, fail?: (data) => void, handleNetworkError?: () => void) {
        this.httpService.httpRequest('/repayments.htm', initiativeRepaymentSearchInfo, HttpMethod.Get, ContentType.Form, (data: BaseData<InitiativeRepaymentRecord>) => {
            success(data.results);
        }, (data) => {
            if (fail) {
                fail(data);
            }
        }, false, handleNetworkError);
    }

    getgetAllinpayTongUrl(repaymentInfo: RepaymentInfo, success: (allinpayTongResultInfo: AllinpayTongResultInfo) => void) {
        this.httpService.httpRequest('/repayments/allinpay/gateway.htm', repaymentInfo, HttpMethod.Get, ContentType.Form, (data: AllinpayTongResultInfo) => {
            success(data);
            ConfigService.shouldReloadHome = true;
        });
    }
}

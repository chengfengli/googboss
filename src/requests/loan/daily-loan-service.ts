import {DailyLoanCancelAntiTransactionResponse} from "../../models/network/response/loan/daily-loan-cancel-anti-transaction-response";
import {DailyLoanAntiTransactionApplyStatus} from "./../../models/network/response/loan/daily-loan-anti-transaction-apply-status";
import {DailyLoanAntiTransactionRequestInfo} from "./../../models/network/response/loan/daily-loan--anti-transaction-request-info";
import {DailyLoanAntiTransactionStatus} from "./../../models/network/response/loan/daily-loan-anti-transaction-status";
import {BaseData} from "./../../models/network/response/base/base-data";
import {Injectable, forwardRef, Inject} from "@angular/core";
import "rxjs/add/operator/map";
import {HttpService} from "../../providers/http-service";
import {HttpMethod} from "../../enums/http-method";
import {ContentType} from "../../enums/content-type";
import {DailyLoanVerifyInfo} from "../../models/network/request/loan/daily-loan-verify-info";
import {DailyLoanVerifyResult} from "../../models/network/response/loan/daily-loan-verify-result";
import {DailyLoanDeposit} from "../../models/network/response/loan/daily-loan-deposit";
import {WithdrawInfo} from "../../models/network/request/loan/withdraw-info";
import {DailyLoanWithdrawResult} from "../../models/network/request/loan/daily-loan-withdraw-result";
import {DailyLoanApplySignResult} from "../../models/network/response/loan/daily-loan-apply-sign-result";
import {DailyLoanStatus} from "../../models/network/response/loan/daily-loan-status";
import {DailyLoanMerchantStatus} from "../../models/network/response/loan/daily-loan-merchant-status";
import {DailyLoanWithdrawRecordSearchInfo} from "../../models/network/request/loan/daily-loan-withdraw-record-search-info";
import {DailyLoanWithdrawRecord} from "../../models/network/response/loan/daily-loan-withdraw-record";
import {Util} from "../../utils/util";
import {DailyLoanStatusRequestInfo} from "../../models/network/request/loan/daily-loan-status-request-info";
import {DailyLoanApplicationSearchInfo} from "../../models/network/request/loan/daily-loan-application-search-info";
import {DailyLoanApplyRecord} from "../../models/network/response/loan/daily-loan-apply-record";
import {UserMerchant} from "../../models/merchant/user-merchant";
import {ConfigService} from "../../providers/config-service";
import {MerchantRequestInfo} from "../../models/network/request/loan/merchant-request-info";
import {DailyLoanContractInfo} from "../../models/network/response/loan/daily-loan-contract-info";
import {DailyLoanQualifyInfo} from "../../models/network/response/loan/daily-loan-qualify-info";

/*
 Generated class for the DailyLoanService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class DailyLoanService {

    constructor(@Inject(forwardRef(() => HttpService)) public httpService: HttpService) {
        console.log('Hello DailyLoanService Provider');
    }

    // getLoanNavigate(merchantInfo: MerchantRequestInfo, success: (dailyLoanNavigate: DailyLoanNavigate) => void) {
    //     this.httpService.httpRequest('/loan/daily/navigate.htm', merchantInfo, HttpMethod.Get, ContentType.Form, (data) => {
    //         success(data);
    //     });
    // }

    submitDailyLoanVerify(dailyLoanVerifyInfo: DailyLoanVerifyInfo, success: (dailyLoanVerifyResult: DailyLoanVerifyResult) => void) {
        this.httpService.httpRequest('/loan/daily/verify.htm', dailyLoanVerifyInfo, HttpMethod.Post, ContentType.JSON, (dailyLoanVerifyResult) => {
            ConfigService.shouldReloadHome = true;
            success(dailyLoanVerifyResult);
        });
    }

    submitDailyLoanSign(applicationTid: number, success: (dailyLoanApplySignResult: DailyLoanApplySignResult) => void) {
        this.httpService.httpRequest('/loan/daily/sign/' + applicationTid + '.htm', null, HttpMethod.Post, ContentType.Form, (dailyLoanApplySignResult) => {
            ConfigService.shouldReloadHome = true;
            success(dailyLoanApplySignResult);
        });
    }


    getPassedMchtLoan(success: (data: DailyLoanDeposit[]) => void) {
        this.httpService.httpRequest('/loan/daily/mcht/deposit.htm', null, HttpMethod.Get, ContentType.Form, (data) => {
            success(data);
        });
    }

    submitWithdraw(withdrawInfo: WithdrawInfo, success: (dailyLoanWithdrawResult: DailyLoanWithdrawResult) => void) {
        this.httpService.httpRequest('/loan/daily/withdrawal.htm', withdrawInfo, HttpMethod.Post, ContentType.JSON, (dailyLoanWithdrawResult) => {
            ConfigService.shouldReloadHome = true;
            success(dailyLoanWithdrawResult);
        });
    }

    getLoanApplyStatus(dailyLoanStatusRequestInfo: DailyLoanStatusRequestInfo, success: (dailyLoanStatus: DailyLoanStatus) => void) {
        this.httpService.httpRequest('/loan/daily/apply/status.htm', dailyLoanStatusRequestInfo, HttpMethod.Get, ContentType.Form, (dailyLoanStatus) => {
            success(dailyLoanStatus);
        }, null, false);
    }

    getBindMerchantStatus(success: (data: DailyLoanMerchantStatus[]) => void) {
        this.httpService.httpRequest('/loan/daily/mcht/status.htm', null, HttpMethod.Get, ContentType.Form, (data) => {
            success(data);
        }, null, false);
    }

    getWithdrawRecords(merchantSerchInfo: DailyLoanWithdrawRecordSearchInfo, success: (merchants: DailyLoanWithdrawRecord[]) => void, fail?: () => void) {
        this.httpService.httpRequest('/loan/daily/withdrawal/list.htm', merchantSerchInfo, HttpMethod.Get, ContentType.Form, (data) => {
            if (Util.isNotNullOrUndefined(data)) {
                success(data.results);
            }
        }, () => {
            if (fail) {
                fail();
            }
        }, false);
    }

    listApplication(dailyLoanApplicationSearchInfo: DailyLoanApplicationSearchInfo, success: (dailyLoanApplyRecords: DailyLoanApplyRecord[]) => void, fail?: (data) => void, handleNetworkError?: () => void) {
        this.httpService.httpRequest('/loan/daily/application/list.htm', dailyLoanApplicationSearchInfo, HttpMethod.Get, ContentType.Form, (data: BaseData<DailyLoanApplyRecord>) => {
            success(data.results);
        }, (data) => {
            if (fail) {
                fail(data);
            }
        }, false, handleNetworkError);
    }

    listQualifiedMerchants(success: (merchants: UserMerchant[]) => void, fail?: (data) => void, handleNetworkError?: () => void) {
        this.httpService.httpRequest('/loan/daily/qualified/list.htm', null, HttpMethod.Get, ContentType.Form, (data: UserMerchant[]) => {
            success(data);
        }, (data) => {
            if (fail) {
                fail(data);
            }
        }, false, handleNetworkError);
    }

    isQualifiedForApply(merchantRequestInfo: MerchantRequestInfo, success: (result: DailyLoanQualifyInfo) => void) {
        this.httpService.httpRequest('/loan/daily/qualified.htm', merchantRequestInfo, HttpMethod.Get, ContentType.Form, result => {
            success(result);
        });
    }

    getAntiTransactionStatus(merchantRequestInfo: MerchantRequestInfo, success: (dailyLoanAntiTransactionStatus: DailyLoanAntiTransactionStatus) => void) {
        this.httpService.httpRequest('/loan/daily/anti/trans/status.htm', merchantRequestInfo, HttpMethod.Get, ContentType.Form, (data) => {
            success(data);
        }, null, false);
    }

    applyAntiTransaction(dailyLoanAntiTransactionRequestInfo: DailyLoanAntiTransactionRequestInfo, success: (result: boolean) => void) {
        this.httpService.httpRequest('/loan/daily/anti/trans/open.htm', dailyLoanAntiTransactionRequestInfo, HttpMethod.Post, ContentType.JSON, (data) => {
            success(data);
        });
    }

    getAntiTransactionApplyStatus(merchantRequestInfo: MerchantRequestInfo, success: (dailyLoanAntiTransactionApplyStatus: DailyLoanAntiTransactionApplyStatus) => void) {
        this.httpService.httpRequest('/loan/daily/anti/trans/apply/status.htm', merchantRequestInfo, HttpMethod.Get, ContentType.Form, (data) => {
            success(data);
        }, null, false);
    }

    cancelAntiTransactionApply(merchantRequestInfo: MerchantRequestInfo, success: (dailyLoanCancelAntiTransactionResponse: DailyLoanCancelAntiTransactionResponse) => void) {
        this.httpService.httpRequest('/loan/daily/anti/trans/cancel.htm', merchantRequestInfo, HttpMethod.Post, ContentType.JSON, (data) => {
            success(data);
        }, null, false);
    }

    getDailyLoanSignContractInfo(dailyLoanStatusRequestInfo: DailyLoanStatusRequestInfo, success: (dailyLoanContractInfo: DailyLoanContractInfo) => void) {
        this.httpService.httpRequest('/loan/daily/contract/info.htm', dailyLoanStatusRequestInfo, HttpMethod.Get, ContentType.Form, (data) => {
            success(data);
        });
    }

}

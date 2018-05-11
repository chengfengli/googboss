import {FastLoanRealtimePayment} from "./../../models/network/response/loan/fast-loan-realtime-payment";
import {FastLoanRepaymentPlanRequstInfo} from "./../../models/network/request/loan/fast-loan-repayment-plan-requst-info";
import {FastLoanRepaymentPlan} from "./../../models/network/response/loan/fast-loan-repayment-plan";
import {FastLoanMerchantStatus} from "./../../models/network/response/loan/fast-loan-merchant-status";
import {MerchantRequestInfo} from "./../../models/network/request/loan/merchant-request-info";
import {ContentType} from "../../enums/content-type";
import {HttpMethod} from "../../enums/http-method";
import {FastLoanApplyInfo} from "./../../models/network/response/loan/fast-loan-apply-info";
import {FastLoanRequestInfo} from "./../../models/network/request/loan/fast-loan-request-info";
import {HttpService} from "./../../providers/http-service";
import {Injectable, Inject, forwardRef} from "@angular/core";
import "rxjs/add/operator/map";
import {FastLoanDeposit} from "../../models/network/response/loan/fast-loan-deposit";
import {FastLoanMchtDeposit} from "../../models/network/response/loan/fast-loan-mcht-deposit";
import {FastLoanRequestExtraInfo} from "../../models/network/request/loan/fast-loan-request-extra-info";
import {FastLoanRepaymentDetailRequestInfo} from "../../models/network/request/loan/fast-loan-repayment-detail-request-info";
import {FastLoanRepaymentDetail} from "../../models/network/response/loan/fast-loan-repayment-detail";
import {FastLoanApplicationSearchInfo} from "../../models/network/request/loan/fast-loan-application-search-info";
import {FastLoanApplyRecord} from "../../models/network/response/loan/fast-loan-apply-record";
import {BaseData} from "../../models/network/response/base/base-data";
import {UserMerchant} from "../../models/merchant/user-merchant";
import {FastLoanOneKeyInfo} from "../../models/network/request/loan/fast-loan-one-key-info";
import {FastLoanDepositRequestInfo} from "../../models/network/request/loan/fast-loan-deposit-request-info";
import {FastLoanApplyRequestInfo} from "../../models/network/response/loan/fast-loan-apply-request-info";
import {ConfigService} from "../../providers/config-service";
import {FastLoanContractInfo} from "../../models/network/response/loan/fast-loan-contract-info";
import {DailyLoanQualifyInfo} from "../../models/network/response/loan/daily-loan-qualify-info";

/*
 Generated class for the FastLoanService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class FastLoanService {

    constructor(@Inject(forwardRef(() => HttpService)) public httpService: HttpService) {
        console.log('Hello FastLoanService Provider');
    }

    submitFastLoanApplication(fastLoanRequestInfo: FastLoanRequestInfo, success: (fastLoanApplyInfo: FastLoanApplyInfo) => void) {
        this.httpService.httpRequest('/loan/fast/submit.htm', fastLoanRequestInfo, HttpMethod.Post, ContentType.JSON, (fastLoanApplyInfo) => {
            success(fastLoanApplyInfo);
            ConfigService.shouldReloadHome = true;
        });
    }

    signContract(fastLoanRequestExtraInfo: FastLoanRequestExtraInfo, success: (fastLoanApplyInfo: FastLoanApplyInfo) => void) {
        this.httpService.httpRequest('/loan/fast/sign.htm', fastLoanRequestExtraInfo, HttpMethod.Post, ContentType.JSON, (fastLoanApplyInfo) => {
            success(fastLoanApplyInfo);
            ConfigService.shouldReloadHome = true;
        });
    }

    getFastLoanDeposit(fastLoanDepositRequestInfo: FastLoanDepositRequestInfo, success: (fastLoanDeposit: FastLoanDeposit) => void) {
        this.httpService.httpRequest('/loan/fast/deposit/bytid.htm', fastLoanDepositRequestInfo, HttpMethod.Get, ContentType.Form, (fastLoanDeposit) => {
            success(fastLoanDeposit);
        });
    }

    getBindMerchantStatus(success: (data: FastLoanMerchantStatus[]) => void) {
        this.httpService.httpRequest('/loan/fast/mcht/status.htm', null, HttpMethod.Get, ContentType.Form, (data) => {
            success(data);
        }, null, false);
    }

    getPassedMchtLoan(success: (data: FastLoanMchtDeposit[]) => void) {
        this.httpService.httpRequest('/loan/fast/mcht/deposit.htm', null, HttpMethod.Get, ContentType.Form, (data) => {
            success(data);
        });
    }

    getRepaymentPlan(fastLoanRepaymentPlanRequstInfo: FastLoanRepaymentPlanRequstInfo, success: (data: FastLoanRepaymentPlan) => void, fail?: () => void) {
        this.httpService.httpRequest('/loan/fast/payment/plan.htm', fastLoanRepaymentPlanRequstInfo, HttpMethod.Get, ContentType.Form, (fastLoanRepaymentPlan) => {
            success(fastLoanRepaymentPlan);
        }, (data) => {
            if (fail) {
                fail();
            }
        }, false);
    }

    getRepaymentDetail(fastLoanRepaymentDetailRequestInfo: FastLoanRepaymentDetailRequestInfo, success: (data: FastLoanRepaymentDetail) => void, fail?: () => void, handleNetworkError?: () => void) {
        this.httpService.httpRequest('/loan/fast/payment/detail.htm', fastLoanRepaymentDetailRequestInfo, HttpMethod.Get, ContentType.Form, (fastLoanRepaymentDetail) => {
            success(fastLoanRepaymentDetail);
        }, (data) => {
            if (fail) {
                fail();
            }
        }, false, handleNetworkError);
    }

    listApplication(dailyLoanApplicationSearchInfo: FastLoanApplicationSearchInfo, success: (dailyLoanApplyRecords: FastLoanApplyRecord[]) => void, fail?: (data) => void, handleNetworkError?: () => void) {
        this.httpService.httpRequest('/loan/fast/application/list.htm', dailyLoanApplicationSearchInfo, HttpMethod.Get, ContentType.Form, (data: BaseData<FastLoanApplyRecord>) => {
            success(data.results);
        }, (data) => {
            if (fail) {
                fail(data);
            }
        }, false, handleNetworkError);
    }

    listQualifiedMerchants(success: (merchants: UserMerchant[]) => void, fail?: (data) => void, handleNetworkError?: () => void) {
        this.httpService.httpRequest('/loan/fast/qualified/list.htm', null, HttpMethod.Get, ContentType.Form, (data: UserMerchant[]) => {
            success(data);
        }, (data) => {
            if (fail) {
                fail(data);
            }
        }, false, handleNetworkError);
    }

    submitFastLoanOneKeyApplication(fastLoanOneKeyInfo: FastLoanOneKeyInfo, success: (fastLoanApplyInfo: FastLoanApplyInfo) => void) {
        this.httpService.httpRequest('/loan/fast/onekey.htm', fastLoanOneKeyInfo, HttpMethod.Post, ContentType.JSON, (fastLoanApplyInfo) => {
            ConfigService.shouldReloadHome = true;
            success(fastLoanApplyInfo);
        });
    }

    getApplication(fastLoanApplyRequestInfo: FastLoanApplyRequestInfo, success: (FastLoanApplyInfo) => void) {
        this.httpService.httpRequest('/loan/fast/application.htm', fastLoanApplyRequestInfo, HttpMethod.Get, ContentType.Form, (fastLoanApplyInfo) => {
            success(fastLoanApplyInfo);
        }, null, false);
    }

    isQualifiedForApply(merchantRequestInfo: MerchantRequestInfo, success: (dailyLoanQualifyInfo: DailyLoanQualifyInfo) => void) {
        this.httpService.httpRequest('/loan/fast/qualified.htm', merchantRequestInfo, HttpMethod.Get, ContentType.Form, result => {
            success(result);
        });
    }

    getRealtimePayment(merchantRequestInfo: MerchantRequestInfo, success: (fastLoanRealtimePayment: FastLoanRealtimePayment) => void) {
        this.httpService.httpRequest('/loan/fast/payment/realtime.htm', merchantRequestInfo, HttpMethod.Get, ContentType.Form, result => {
            success(result);
        }, null, false);
    }

    getFastLoanSignContractInfo(fastLoanApplyRequestInfo: FastLoanApplyRequestInfo, success: (fastLoanContractInfo: FastLoanContractInfo) => void) {
        this.httpService.httpRequest('/loan/fast/contract/info.htm', fastLoanApplyRequestInfo, HttpMethod.Get, ContentType.Form, (data) => {
            success(data);
        });
    }
}

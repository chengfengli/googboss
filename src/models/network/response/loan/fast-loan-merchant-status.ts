import {FastLoanDeposit} from "./fast-loan-deposit";
import {FastLoanApplyInfo} from "./fast-loan-apply-info";

export class FastLoanMerchantStatus {
    mchtCd: string;
    mchtName: string;
    deposit: FastLoanDeposit;
    application: FastLoanApplyInfo;
}
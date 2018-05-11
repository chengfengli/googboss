import {DailyLoanApplication} from "./daily-loan-application";
/**
 * Created by Allen on 2017/3/9.
 */
import {DailyLoanDeposit} from "./daily-loan-deposit";

export class DailyLoanMerchantStatus {
    mchtCd: string;
    mchtName: string;
    deposit: DailyLoanDeposit;
    dailyLoan: DailyLoanApplication;
}
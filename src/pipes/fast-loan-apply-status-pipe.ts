import {Injectable, Pipe} from "@angular/core";
import {FastLoanApplyInfo} from "../models/network/response/loan/fast-loan-apply-info";

/*
 Generated class for the FastLoanApplyStatusPipe pipe.

 See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 Angular 2 Pipes.
 */
@Pipe({
    name: 'fastLoanApplyStatusPipe'
})
@Injectable()
export class FastLoanApplyStatusPipe {
    /*
     Takes a value and makes it lowercase.
     */
    transform(value, args) {
        value = value + '';
        if (value === FastLoanApplyInfo.ApplyStatus.REVIEW_PASSED) {
            return '待签约';
        } else if (value === FastLoanApplyInfo.ApplyStatus.CALL_FAILED || value === FastLoanApplyInfo.ApplyStatus.PRE_ADUIT_REFUSED || value === FastLoanApplyInfo.ApplyStatus.ADUIT_REFUSED || value === FastLoanApplyInfo.ApplyStatus.REVIEW_REFUSED) {
            return '审批失败';
        } else if (value === FastLoanApplyInfo.ApplyStatus.APPLYING || value === FastLoanApplyInfo.ApplyStatus.BIG_AMOUNT_REVIEW || value === FastLoanApplyInfo.ApplyStatus.PRE_ADUIT_PASSED || value === FastLoanApplyInfo.ApplyStatus.PRE_ADUIT_SPECIAL_REVIEW || value === FastLoanApplyInfo.ApplyStatus.ADUIT_PASSED || value === FastLoanApplyInfo.ApplyStatus.RULE_REVIEW || value === FastLoanApplyInfo.ApplyStatus.ADUIT_SPECIAL_REVIEW || value === FastLoanApplyInfo.ApplyStatus.INLEGAL_APPLY_REVIEW || value === FastLoanApplyInfo.ApplyStatus.CALL_FAILED) {
            return '审批中';
        } else if (value === FastLoanApplyInfo.ApplyStatus.SIGN_TIMEOUT) {
            return '超时未签约';
        } else if (value === FastLoanApplyInfo.ApplyStatus.LOAN_TERMINATE || FastLoanApplyInfo.ApplyStatus.LOAN_FINISHED) {
            return "本次贷款已结束";
        }
        return value;
    }
}
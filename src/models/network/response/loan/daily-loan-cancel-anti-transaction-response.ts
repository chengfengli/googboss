export class DailyLoanCancelAntiTransactionResponse {
    static Request = {
        SUCCESS: "Y",
        FAILED: "N"
    }
    request: string;
    errCode: string;
}
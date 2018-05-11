export class DailyLoanAntiTransactionStatus {
    static RetCode = {
        OPEN: "01",
        CLOSE: "00"
    }
    retCode: string;
    retMsg: string;
}
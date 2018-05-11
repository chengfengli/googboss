export class DailyLoanAntiTransactionRequestInfo {
    static OperType = {
        OPEN: "00",
        CLOSE: "01"
    }
    mchtCd: string;
    operType: string;
}
export class DailyLoanAntiTransactionApplyStatus {
    static ProStatus = {
        NEW: "N",
        SUCCESS: "S",
        FAILED: "F",
        PROCESSING: "W",
    }

    proStatus: string;
    operType: string
    errMsg: string;
}
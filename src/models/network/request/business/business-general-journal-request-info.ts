export class BusinessGeneralJournalRequestInfo {
    static IntervalUnit = {
        /** 按月汇总 */
        MONTH: "M",
        /** 按周汇总 */
        WEEK: "W",
        /** 按日汇总 */
        DAY: "D"
    }
    /** 商户号，不能为空 */
    mchtCd: string;
    /**
     * 查询日期，格式YYYYMMDD
     * 为空或为null时，默认当天
     */
    searchDate: string;
    /** 时段值 */
    intervalValue: string;
    /** 时段单位 */
    intervalUnit: string;
}


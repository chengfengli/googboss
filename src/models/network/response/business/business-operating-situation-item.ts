export class BusinessOperatingSituationItem {
    /** 地区类型，01：省 02：市 */
    areaType: string;
    /** 流水总额 */
    transFlowTotal: number;
    /** 同省同行业或者同省同市同行业平均流水 */
    avagTransFlow: number;
    /** 本商户在同省同行业或者同省同市同行业中流水排名 */
    transFlowRank: number;
    /** 同省同行业或者同省同市同行业商户总数 */
    transFlowMchtTotal: number;
}

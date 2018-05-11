import {BaseData} from "../base/base-data";
import {BusinessDetailFund} from "./business-detail-fund";

export class BusinessDailyDetailResult extends BaseData<BusinessDetailFund> {
    /** 统计日期 */
    statisticsDate: Date;
    /** 商户号 */
    mchtCd: string;
    /** 当期POS流水总额 */
    posIn: number;
    /** 当期快快贷流水扣划 */
    posActuralIn: number;
    /** 当期天天融流水扣划 */
    ttrActuralIn: number;
    /** 其他流水划扣 */
    otherRepayment: number;
    /** POS流水结余 */
    posSurplus: number;
}

import {BaseData} from "../base/base-data";
import {BusinessDetailFund} from "./business-detail-fund";

export class BusinessPosDetailResult extends BaseData<BusinessDetailFund> {
    statisticsDate: Date;
    /** 商户号 */
    mchtCd: string;
}

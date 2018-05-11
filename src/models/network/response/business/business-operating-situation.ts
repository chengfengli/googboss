import {BusinessOperatingSituationItem} from "./business-operating-situation-item";
export class BusinessOperatingSituation {
    /** 商户号 */
    mchtCd: string;
    /** 商户名 */
    mchtName: string;
    /** 地区经营状况 */
    items: BusinessOperatingSituationItem[];
}

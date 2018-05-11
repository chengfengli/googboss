import {BusinessTotalAmtDetail} from "./business-total-amt-detail";
export class BusinessTotalAmt {
    /** 交易金额汇总累积顺序号 */
    totalSeq: number;
    /** 交易金额汇总累积单位 */
    totalUnit: string;
    /** 交易金额累积值 */
    totalValue: number;
    /** 交易金额累积详细 */
    totalAmtDetails: BusinessTotalAmtDetail[];

}

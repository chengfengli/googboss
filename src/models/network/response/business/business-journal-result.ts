import {BusinessJournalItem} from "./business-journal-item";
export class BusinessJournalResult {
    /** 商户号 */
    mchtCd: string;
    /** 商户名称 */
    mchtName: string;
    /** 商户地址 */
    mchtAddress: string;
    /** 联系电话 */
    contactPhone: string;
    /** 交易流水总金额 */
    transFlowTotal: number;
    /** 交易总笔数 */
    txnNumTotal: number;
    /** 统计日期 */
    statisticsDate: Date;
    /** 明细条目 */
    items: BusinessJournalItem[];
}

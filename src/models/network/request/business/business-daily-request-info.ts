import { PageInfo } from './../base/page-info';
export class BusinessDailyRequestInfo extends PageInfo{
    /** 商户号，不能为空 */
    mchtCd: string;
    /** 开始日期 */
    startDate: string;
    /**
     * 结束日期
     * 与开始时间不能同时为空
     * 如其中一个为空，则以另一个不为空的日期作为起始和结束日期
     */
    endDate: string;
}

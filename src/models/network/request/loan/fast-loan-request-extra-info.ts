export class FastLoanRequestExtraInfo {

    static RelativeRelation = {
        /** 夫妻/配偶 */
        SPOUSE: "1",
        /** 父亲 */
        FATHER: "2",
        /** 母亲 */
        MOTHER: "3",
        /** 儿子 */
        SON: "4",
        /** 女儿 */
        DAUGHTER: "5"
    }

    password: string;

    tid: number;

    applicationTid: number;

    relativeName: string;

    relativeRelation: string;

    relativeMobile: string;

    relativeIdType: string;

    relativeIdNo: string;

    loanerHomeAddress: string;

    relativeHomeAddress: string;

    relativeHouseType: string;

    'delete': boolean;

    createTime: Date;

    lastUpdateTime: Date;

    lastUpdateUserId: number;

    constructor(password: string, applicationTid: number, relativeName: string, relativeRelation: string, relativeMobile: string, loanerHomeAddress: string, relativeIdType?: string, relativeIdNo?: string, relativeHomeAddress?: string, relativeHouseType?: string) {
        this.applicationTid = applicationTid;
        this.relativeName = relativeName;
        this.relativeRelation = relativeRelation;
        this.relativeMobile = relativeMobile;
        this.relativeIdType = relativeIdType;
        this.relativeIdNo = relativeIdNo;
        this.loanerHomeAddress = loanerHomeAddress;
        this.relativeHomeAddress = relativeHomeAddress;
        this.relativeHouseType = relativeHouseType;
        this.password = password;
    }
}
export class UserVerificationInfo {

    static LegalIdType = {
        /**
         * 身份证
         */
        ID_CARD: "I",
        /**
         * 户口
         */
        HOUSEHOLD_REGISTERER: "R",
        /**
         * 护照
         */
        PASSPORT: "P",
        /**
         * 军官证/士兵证
         */
        CERTIFICATE_OF_SOLDIER: "S",
        /**
         * 港澳居民来往内地通行证
         */
        HONGKONG_MACAU_PASSER: "H",
        /**
         * 台湾同胞来往内地通行证
         */
        TAIWAN_PASSER: "W",
        /**
         * 临时身份证
         */
        TEMPORARY_ID_CARD: "T",
        /**
         * 外国人居留证
         */
        ALIEN_RESIDENTIAL_CERTIFICATE: "F",
        /**
         * 警官证
         */
        POLICE_CARD: "C",
        /**
         * 营业执照
         */
        BUSINESS_LICENSE: "L",
        /**
         * 其他有效证件
         */
        OTHER: "O",
    }

    tid: number;

    userVerifyTid: number;

    legalName: string;

    legalIdType: string;

    legalIdNo: string;

    bankName: string;

    bankCode: string;

    bankAccount: string;

    mobilePhone: string;

    status: string;

    verifyTime: Date;

    delete: boolean;

    createTime: Date;

    lastUpdateTime: Date;

    lastUpdateUserId: number;
}
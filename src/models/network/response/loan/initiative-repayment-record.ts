export class InitiativeRepaymentRecord {

    static Status: {
        /**
         * 申请中
         */
        IN_THE_APPLICATION: "0",

        /**
         * 已提交
         */
        COMMITED: "1",

        /**
         * 已完成
         */
        COMELETED: "2",
    }

    static PaymentSource: {
        /**
         * POS流水
         */
        POS: "P",

        /**
         * 通联通线上还款
         */
        TLT: "T",

        /**
         * 通联钱包
         */
        ALLINPAY_WALLET: "W",

        /**
         * 线下还款
         */
        OFFLINE: "O",

        /**
         * 系统内部产生
         */
        SYSTEM: "S",
    }

    tid: number;

    applicationTid: number;

    mchtTid: number;

    orderNo: string;

    applyTime: Date;

    dueBillNo: string;

    submitTime: Date;

    status: string;

    paymentAmount: number;

    actualPaymentAmount: number;

    actualPaymentTime: Date;

    paymentSource: string;

    delete: boolean;

    createTime: Date;

    lastUpdateTime: Date;

    lastUpdateUser: Date;
}
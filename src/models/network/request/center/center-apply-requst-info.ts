export class CenterApplyRequstInfo {
    /**
     * 工单处理状态
     * @author barry
     *
     */
    static Status = {
        /**
         * 客服系统端未找到对应工单
         */
        NOTFOUND: "00",

        /**
         * 已提交
         */
        COMMITED: "01",

        /**
         * 已受理
         */
        ACCEPTED: "02",

        /**
         * 处理中
         */
        PROCESSING: "03",

        /**
         * 处理完毕
         */
        COMPLETED: "04",

        /**
         * 工单发送失败（内部状态）
         */
        COMMIT_FAIL: "05",

        /**
         * 处理完成并已评价
         */
        COMPLETED_EVALUATED: "06"
    }

    id: number;
    code: string;
    contactName: string;//联系人姓名
    mcthName: string;//商户名称
    contactMobile: string;//联系人电话
    taskType: string;//业务类型
    taskSubType: string;//业务子类型
    origin = '05';//来源
    createDate: Date;//
    remark: string;//备注
    busiAddress: string;//地址
    mchtNo: string;//商户号
    customerCode: string;//客户号
    branchAddress: string;//地址
    supplyType: string;//耗材类型
    supplyCount: number;//数量
    branchTime: string;//营业时间
    status: string;//状态
    scoreSpeed: string;//处理速度
    scoreQuality: string;//处理质量
    scoreAttitude: string;//服务态度
    scoreAvg: string;//综合评分
    delete: boolean;// 逻辑删除标识


    constructor(contactName: string, mcthName: string, contactMobile: string, taskType: string, taskSubType: string, remark: string, busiAddress: string, mchtNo: string, branchTime: string) {
        this.contactName = contactName;
        this.mcthName = mcthName;
        this.contactMobile = contactMobile;
        this.taskType = taskType;
        this.taskSubType = taskSubType;
        this.remark = remark;
        this.busiAddress = busiAddress;
        this.mchtNo = mchtNo;
        this.branchTime = branchTime;
    }
}
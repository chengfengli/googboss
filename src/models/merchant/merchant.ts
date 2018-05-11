/**
 * Created by Allen on 2017/3/3.
 */
export class Merchant {
    tid: string;
    userId: string;
    mchtTid: string;
    status: string;
    createType: string;
    createTime: Date;
    'delete': boolean;
    lastUpdateTime: Date;
    lastUpdateSource: string;
    lastUpdateUserId: string;

    static CreateType = {
        MANUAL_COMMIT: '1',
        AUTO_BIND: '2',
        BACKGROUND_BIND: '3'
    }

    static Status = {
        CERTIFIED: '1',
        PENDING_AUTHENTICATION: '2',
        REJECTED: '3',
        OBSOLETE: '4',
        CANCLE: '5'
    }

}

// /**
//  * 用户手动提交
//  */
// String MANUAL_COMMIT = "1";
// /**
//  * 老用户自动绑定
//  */
// String AUTO_BIND = "2";
// /**
//  * 后台绑定
//  */
// String BACKGROUND_BIND  = "3";

// /**
//  * 已认证
//  */
// String CERTIFIED = "1";
// /**
//  * 待认证
//  */
// String PENDING_AUTHENTICATION = "2";
// /**
//  * 被拒绝
//  */
// String REJECTED = "3";
// /**
//  * 已作废
//  */
// String OBSOLETE = "4";
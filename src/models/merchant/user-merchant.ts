import {Merchant} from "./merchant";
/**
 * Created by Allen on 2017/3/3.
 */
export class UserMerchant extends Merchant {
    mchtCd: string;
    mchtName: string;
    preCredit: number;

    constructor(mchtCd: string, mchtName: string) {
        super();
        this.mchtCd = mchtCd;
        this.mchtName = mchtName;
    }
}
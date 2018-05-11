import {MerchantWithPreApproval} from "./merchant-with-pre-approval";
export class UserProfile {
    picUrl: string;
    merchantInfos: MerchantWithPreApproval[] = [];
    hasVerification: boolean = false;
    hasCreditReport: boolean = false;
}
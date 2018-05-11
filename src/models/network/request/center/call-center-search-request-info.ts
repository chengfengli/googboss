import {PageInfo} from "../base/page-info";
export class CallCenterSearchRequestInfo extends PageInfo {
    status: string;

    constructor(status: string) {
        super();
        this.status = status;
    }
}
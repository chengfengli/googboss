import {BaseData} from "./../../models/network/response/base/base-data";
import {Injectable, forwardRef, Inject} from "@angular/core";
import "rxjs/add/operator/map";
import {HttpService} from "../../providers/http-service";
import {MerchantSerchInfo} from "../../models/network/request/merchant/merchant-serch-info";
import {UserMerchant} from "../../models/merchant/user-merchant";
import {HttpMethod} from "../../enums/http-method";
import {ContentType} from "../../enums/content-type";
import {BindMerchantInfo} from "../../models/network/request/merchant/bind-merchant-info";
import {SaveMerchantResult} from "../../models/network/response/merchant/save-merchant-result";
import {MerchantRequestInfo} from "../../models/network/request/loan/merchant-request-info";

/*
 Generated class for the MerchantService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class MerchantService {

    constructor(@Inject(forwardRef(() => HttpService)) public httpService: HttpService) {
        console.log('Hello MerchantService Provider');
    }

    public listUserMerchans(merchantSerchInfo: MerchantSerchInfo, success: (merchants: UserMerchant[]) => void, fail?: (data) => void, handleNetworkError?: () => void) {
        this.httpService.httpRequest('/usermcht/merchants.htm', merchantSerchInfo, HttpMethod.Get, ContentType.Form, (data: BaseData<UserMerchant>) => {
            success(data.results);
        }, (data) => {
            if (fail) {
                fail(data);
            }
        }, false, handleNetworkError);
    }

    public saveMerchant(bindMerchantInfo: BindMerchantInfo, success: (saveMerchantResult: SaveMerchantResult) => void) {
        this.httpService.httpRequest('/usermcht/merchants.htm', bindMerchantInfo, HttpMethod.Post, ContentType.JSON, (saveMerchantResult) => {
            success(saveMerchantResult);
        });
    }

    public removeMerchant(bindMerchantInfo: BindMerchantInfo, success: () => void) {
        this.httpService.httpRequest('/usermcht/merchants.htm', bindMerchantInfo, HttpMethod.Delete, ContentType.Form, () => {
            success();
        });
    }

    public getMchtStlmBank(merchantRequestInfo: MerchantRequestInfo, success: (bank: string) => void) {
        this.httpService.httpRequest('/merchant/stlm.htm', merchantRequestInfo, HttpMethod.Get, ContentType.Form, (bank) => {
            success(bank);
        });
    }
}

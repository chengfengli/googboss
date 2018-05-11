import {ContentType} from "../../enums/content-type";
import {HttpMethod} from "../../enums/http-method";
import {Message} from "../../models/network/response/message/message";
import {Injectable, Inject, forwardRef} from "@angular/core";
import "rxjs/add/operator/map";
import {HttpService} from "../../providers/http-service";
import {MessageRequestInfo} from "../../models/network/request/message/message-request-info";
import {BaseData} from "../../models/network/response/base/base-data";

/*
 Generated class for the MessageService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class MessageService {

    constructor(@Inject(forwardRef(() => HttpService)) public httpService: HttpService) {
        console.log('Hello MerchantService Provider');
    }

    public listMyMessages(messageRequestInfo: MessageRequestInfo, success: (messages: Message[]) => void, fail?: (data) => void, handleNetworkError?: () => void) {
        this.httpService.httpRequest('/messages.htm', messageRequestInfo, HttpMethod.Get, ContentType.Form, (data: BaseData<Message>) => {
            success(data.results);
        }, (data) => {
            if (fail) {
                fail(data);
            }
        }, false, handleNetworkError);
    }
}
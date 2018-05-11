import {Captcha} from "./../../models/network/response/captcha/captcha";
import {Injectable, Inject, forwardRef} from "@angular/core";
import "rxjs/add/operator/map";
import {HttpService} from "../../providers/http-service";
import {SmsRequest} from "../../models/network/request/user/sms-request";
import {HttpMethod} from "../../enums/http-method";
import {ContentType} from "../../enums/content-type";

/*
 Generated class for the SmsService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class SmsService {

    constructor(@Inject(forwardRef(() => HttpService)) public httpService: HttpService) {
        console.log('Hello SmsService Provider');
    }

    public sendCodeForRegister(loginMobile: SmsRequest, success: () => void) {
        this.httpService.httpRequest('/sms/register.htm', loginMobile, HttpMethod.Get, ContentType.Form, () => {
            success();
        });
    }

    public sendCodeForUpdatePassword(loginMobile: SmsRequest, success: () => void) {
        this.httpService.httpRequest('/sms/updatepassword.htm', loginMobile, HttpMethod.Get, ContentType.Form, () => {
            success();
        });
    }

    public sendCodeForBankVerification(bankMobile: SmsRequest, success: () => void) {
        this.httpService.httpRequest('/sms/verification/banks.htm', bankMobile, HttpMethod.Get, ContentType.Form, () => {
            success();
        });
    }

    public sendCodeForBindPhone(bindPhone: SmsRequest, success: () => void) {
        this.httpService.httpRequest('/sms/bind/mobile.htm', bindPhone, HttpMethod.Get, ContentType.Form, () => {
            success();
        });
    }

    public sendSmsForChangeMobileToOld(oldPhone: SmsRequest, success: () => void) {
        this.httpService.httpRequest('/sms/change/mobile/old.htm', oldPhone, HttpMethod.Get, ContentType.Form, () => {
            success();
        });
    }

    public sendSmsForChangeMobileToNew(oldPhone: SmsRequest, success: () => void) {
        this.httpService.httpRequest('/sms/change/mobile/new.htm', oldPhone, HttpMethod.Get, ContentType.Form, () => {
            success();
        });
    }

    public captchaString(success: (captcha: Captcha) => void) {
        this.httpService.httpRequest('/captcha/string.htm', null, HttpMethod.Get, ContentType.Form, (captcha) => {
            success(captcha);
        }, null, false);
    }
}

import {FormGroup} from "@angular/forms";
import {Injectable} from "@angular/core";
/**
 * Created by Allen on 2017/3/2.
 */
import {Md5} from "ts-md5/dist/md5";
import {HudService} from "../providers/hud-service";
import {MyValidators} from "../validators/my-validators";

@Injectable()
export class Util {

    static wait = 60;

    constructor(public hudService: HudService) {
    }

    checkFormValid(myForm: FormGroup) {
        let errorMessages: string[] = MyValidators.getFormErrorMessages(myForm);
        if (errorMessages.length > 0) {
            this.hudService.getToast(errorMessages[0]).present();
        }
    }

    static changeTwoDecimal(x): string {
        var f_x = parseFloat(x);
        if (isNaN(f_x)) {
            return '';
        }
        f_x = Math.round(f_x * 100) / 100;
        var s_x = f_x.toString();
        var pos_decimal = s_x.indexOf('.');
        if (pos_decimal < 0) {
            pos_decimal = s_x.length;
            s_x += '.';
        }
        while (s_x.length <= pos_decimal + 2) {
            s_x += '0';
        }
        return s_x;
    }

    static codeButtonCountdown(e, callback?: (e) => void) {
        if (Util.wait == 0) {
            e.parentNode.removeAttribute("disabled");
            e.innerHTML = "获取验证码";
            Util.wait = 60;
            if (callback) {
                callback(e);
            }
        } else {
            e.parentNode.setAttribute("disabled", true);
            e.innerHTML = Util.wait + "秒后重试";
            Util.wait--;
            setTimeout(() => {
                    Util.codeButtonCountdown(e, callback);
                },
                1000);
        }
    }

    static md5Str(data: string): string {
        let firstMd5 = <string>Md5.hashStr(data, false);
        return <string>Md5.hashStr(firstMd5, false);
    }

    static isEqualsValue(obj1: any, obj2: any) {
        let myValue = JSON.stringify(obj1);
        let otherValue = JSON.stringify(obj2);
        if (myValue === otherValue) {
            return true;
        }
        return false;
    }

    static isNotNullOrUndefined(data): boolean {
        if (data !== null && typeof data !== 'undefined' && data !== '') {
            return true;
        }
        return false;
    }

    static toQueryPair(key, value): string {
        if (typeof value == 'undefined') {
            return key;
        }
        return key + '=' + encodeURIComponent(value === null ? '' : String(value));
    }

    static toQueryString(obj) {
        var ret = [];
        for (var key in obj) {
            key = encodeURIComponent(key);
            var values = obj[key];
            if (values && values.constructor == Array) {//数组
                var queryValues = [];
                for (var i = 0, len = values.length, value; i < len; i++) {
                    value = values[i];
                    queryValues.push(Util.toQueryPair(key, value));
                }
                ret = ret.concat(queryValues);
            } else { //字符串
                ret.push(Util.toQueryPair(key, values));
            }
        }
        return '?' + ret.join('&');
    }

    static toBodyString(obj) {
        var ret = [];
        for (var key in obj) {
            key = encodeURIComponent(key);
            var values = obj[key];
            if (values && values.constructor == Array) {//数组
                var queryValues = [];
                for (var i = 0, len = values.length, value; i < len; i++) {
                    value = values[i];
                    queryValues.push(this.toQueryPair(key, value));
                }
                ret = ret.concat(queryValues);
            } else { //字符串
                ret.push(this.toQueryPair(key, values));
            }
        }
        return ret.join('&');
    }
}
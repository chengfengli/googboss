import {Device} from "ionic-native";
/**
 * Created by Allen on 2017/2/28.
 */
export class RegisterInfo {
    mobile: string;
    smsCode: string;
    password: string;
    referrerMobile: string;
    registerIpAddress: string;
    deviceChannel = Device.platform;
    registerChannel: string = '1';
    deviceId = Device.uuid;
;

    constructor(mobile: string, smsCode: string, password: string, referrerMobile?: string) {
        this.mobile = mobile;
        this.smsCode = smsCode;
        this.password = password;
        this.referrerMobile = referrerMobile;
        this.deviceChannel = Device.model;
    }
}
import {Device} from "ionic-native";
/**
 * Created by Allen on 2017/2/28.
 */
export class LoginInfo {
    loginMobile: string;
    mchtCd: string;
    password: string;
    ipAddress: string;
    loginDeviceChannel: string = Device.platform;
    loginDeviceId: string = Device.uuid;
}
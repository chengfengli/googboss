/**
 * Created by Allen on 2017/3/17.
 */
export class StubDeviceInfo {
    deviceModel: string;
    deviceUUID: string;
    platformName: string;
    version: string;

    constructor(deviceModel: string, deviceUUID: string, platformName: string, version: string) {
        this.deviceModel = deviceModel;
        this.deviceUUID = deviceUUID;
        this.platformName = platformName;
        this.version = version;
    }
}
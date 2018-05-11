import { AppVersion } from '@ionic-native/app-version';
import { JPushService } from "ionic2-jpush";
import { BaseResponse } from "../models/network/response/base/base-response";
import { TIPS } from "../constants/constants";
import { Loading, App, Platform, Events } from "ionic-angular";
import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptionsArgs, Request, RequestMethod } from "@angular/http";
import "rxjs/add/operator/map";
import { ConfigService } from "./config-service";
import { Observable } from "rxjs";
import { HudService } from "./hud-service";
import { HttpMethod } from "../enums/http-method";
import { ContentType } from "../enums/content-type";
import { UserData } from "../storages/user-data";
import { Util } from "../utils/util";
import { LoginPage } from "../pages/login/login/login";
import { ResponseCode } from "../enums/response-code";
import { Device } from "ionic-native";
import { StubDeviceInfo } from "../models/network/request/stub/stub-device-info";
import { TabsPage } from "../pages/tabs/tabs";

/*
 Generated class for the HttpService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */

@Injectable()
export class HttpService {
    private loading: Loading;
    private token: string;
    private stubDeviceInfo: StubDeviceInfo;
    static hasShowLoginPage = false;
    versionCode = '';

    constructor(private appVersion: AppVersion, private jPushPlugin: JPushService, public events: Events, public platform: Platform, private http: Http, private configService: ConfigService, private hudService: HudService, private userData: UserData, public app: App) {
        this.platform.ready().then(() => {
            this.stubDeviceInfo = new StubDeviceInfo(Device.model, Device.uuid, Device.platform, Device.version);
            this.appVersion.getVersionCode().then((version) => {
                if (Util.isNotNullOrUndefined(version)) {
                    this.versionCode = version;
                }
            });
        });
    }

    public httpRequest(url: string, data?: any, httpMethod?: HttpMethod, contentType?: ContentType, success?: (data) => void, fail?: (data) => void, showLoading?: boolean, handleNetworkError?: () => void) {

        this.userData.getToken().subscribe((token) => {
            this.token = token;
            let hasLoading = false;
            if (!Util.isNotNullOrUndefined(showLoading) || showLoading) {
                this.loading = this.hudService.getLoading(TIPS.LOADING);
                this.loading.present();
                hasLoading = true;
            }

            if (!Util.isNotNullOrUndefined(httpMethod)) {
                httpMethod = HttpMethod.Get;
            }

            if (httpMethod === HttpMethod.Get) {
                return this.get(url, data, success, fail, contentType, handleNetworkError, hasLoading);
            } else if (httpMethod === HttpMethod.Post) {
                return this.post(url, data, success, fail, contentType, handleNetworkError, hasLoading);
            } else if (httpMethod === HttpMethod.Put) {
                return this.put(url, data, success, fail, contentType, handleNetworkError, hasLoading);
            } else {
                return this.delete(url, data, success, fail, contentType, handleNetworkError, hasLoading);
            }
        });
    }


    private get(url: string, data?: any, success?: (data) => void, fail?: (data) => void, contentType?: ContentType, handleNetworkError?: () => void, hasLoading?: boolean) {
        return this.http.request(new Request({ method: RequestMethod.Get, url: this.generateUrl(url) + Util.toQueryString(data), headers: this.generateOptions(contentType) })).timeout(30000)
            .map(resp => this.responseHandler(resp)).catch(error => this.handleError(url, error, handleNetworkError, hasLoading)).subscribe(
            data => {
                if (data) {
                    this.processResponse(data, success, fail, hasLoading);
                }
            });
    }

    private post(url: string, data?: any, success?: (data) => void, fail?: (data) => void, contentType?: ContentType, handleNetworkError?: () => void, hasLoading?: boolean) {
        return this.http.request(new Request({ method: RequestMethod.Post, url: this.generateUrl(url), body: this.generateParams(data, contentType), headers: this.generateOptions(contentType) })).timeout(30000)
            .map(resp => this.responseHandler(resp)).catch(error => this.handleError(url, error, handleNetworkError, hasLoading)).subscribe(
            data => {
                if (data) {
                    this.processResponse(data, success, fail, hasLoading);
                }
            });
    }

    private put(url: string, data?: Object, success?: (data) => void, fail?: (data) => void, contentType?: ContentType, handleNetworkError?: () => void, hasLoading?: boolean) {
        return this.http.request(new Request({ method: RequestMethod.Put, url: this.generateUrl(url), body: this.generateParams(data, contentType), headers: this.generateOptions(contentType) })).timeout(30000)
            .map(resp => this.responseHandler(resp)).catch(error => this.handleError(url, error, handleNetworkError, hasLoading)).subscribe(
            data => {
                if (data) {
                    this.processResponse(data, success, fail, hasLoading);
                }
            });
        ;
    }

    private delete(url: string, data?: any, success?: (data) => void, fail?: (data) => void, contentType?: ContentType, handleNetworkError?: () => void, hasLoading?: boolean) {
        return this.http.request(new Request({ method: RequestMethod.Delete, url: this.generateUrl(url) + Util.toQueryString(data), headers: this.generateOptions(contentType) })).timeout(30000)
            .map(resp => this.responseHandler(resp)).catch(error => this.handleError(url, error, handleNetworkError, hasLoading)).subscribe(
            data => {
                if (data) {
                    this.processResponse(data, success, fail, hasLoading);
                }
            });
    }

    private processResponse(data, success?: (data) => void, fail?: (data) => void, hasLoading?: boolean) {
        if (Util.isNotNullOrUndefined(this.loading) && hasLoading) {
            this.loading.onDidDismiss(() => {
                this.loading = null;
                this.processResponseCode(data, success, fail);
            });
            this.loading.dismiss();
        } else {
            this.processResponseCode(data, success, fail);
        }
    }

    private processResponseCode(data, success?: (data) => void, fail?: (data) => void) {
        if (data.code === ResponseCode.LoginExpired) {
            ConfigService.shouldReloadHome = true;
            this.events.publish('user:loginExpired');
            if (!HttpService.hasShowLoginPage) {
                HttpService.hasShowLoginPage = true;
                let currentPage: any = this.app.getActiveNav().getViews()[0];
                currentPage.shouldShowShade = false;
                let toast = this.hudService.getToast(TIPS.LOGIN_EXPIRED_TIPS);
                toast.onDidDismiss(() => {
                    this.userData.clearUserInfo().subscribe(() => {
                        ConfigService.shouldReloadHome = true;
                        this.jPushPlugin.setAlias('');
                        if (!(this.app.getRootNav().getViews()[0].instance instanceof TabsPage)) {
                            if (!(this.app.getActiveNav().getActive().instance instanceof LoginPage)) {
                                this.app.getRootNav().setRoot(LoginPage);
                            }
                        } else {
                            if (!(this.app.getActiveNav().getActive().instance instanceof LoginPage)) {
                                this.app.getActiveNav().push(LoginPage);
                            }
                        }
                    });
                });
                toast.present();
            }
        } else if (data.code === ResponseCode.Success) {
            if (success) {
                success(data.data);
            }
        } else {
            if (data.code !== 3) {
                let toast = this.hudService.getToast(data.message);
                toast.onDidDismiss(() => {
                    if (fail) {
                        fail(data);
                    }
                });
                toast.present();
            } else {
                let alert = this.hudService.getAlert('提示', data.message, [
                    {
                        text: '确定',
                        handler: () => {
                        }
                    }
                ]);
                alert.onDidDismiss(() => {
                    if (fail) {
                        fail(data);
                    }
                });
                alert.present();
            }
        }
    }

    private responseHandler(resp: Response) {
        let response: BaseResponse = resp.json();
        this.userData.setToken(response.token);
        return response;

    }

    private handleError(url: string, error: Response, handleNetworkError?: () => void, hasLoading?: boolean) {
        if (handleNetworkError) {
            handleNetworkError();
        } else {
            if (Util.isNotNullOrUndefined(this.loading) && hasLoading) {
                this.loading.onDidDismiss(() => {
                    this.loading = null;
                    let toast = this.hudService.getToast(TIPS.NETWORK_ERROR);
                    toast.present();
                });
                this.loading.dismiss().catch(() => {
                });
            } else {
                let toast = this.hudService.getToast(TIPS.NETWORK_ERROR);
                toast.present();
            }
        }
        return Observable.throw('Server Error');
    }

    private generateUrl(url: string): string {
        return !!url.match(/^((?:http(|s):\/\/www\.)|(?:http:\/\/))/) ? url : ConfigService.hostURL + url;
        ;
    }

    private generateOptions(contentType = ContentType.Form): Headers {
        let headers = new Headers();
        console.log(headers);
        if (contentType === ContentType.Form) {
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
        } else {
            headers.append('Content-Type', 'application/json');
        }
        headers.append('deviceModel', this.stubDeviceInfo.deviceModel);
        headers.append('platformName', this.stubDeviceInfo.platformName);
        headers.append('appVersion', this.versionCode);
        headers.append('deviceUUID', this.stubDeviceInfo.deviceUUID);
        headers.append('COOKIE', 'GSESSIONID=' + this.token);
        headers.append('version', this.stubDeviceInfo.version);
        return headers;
    }

    private generateParams(data: any, contentType = ContentType.Form): any {
        if (contentType === ContentType.Form) {
            return Util.toBodyString(data);
        } else {
            return data;
        }
    }
}
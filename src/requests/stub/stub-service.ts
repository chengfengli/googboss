import {HudService} from "./../../providers/hud-service";
import {UserData} from "./../../storages/user-data";
import {StubInfo} from "../../models/network/request/stub/stub-info";
import {HttpService} from "../../providers/http-service";
import {Injectable, Inject, forwardRef} from "@angular/core";
import "rxjs/add/operator/map";
import {HttpMethod} from "../../enums/http-method";
import {ContentType} from "../../enums/content-type";
import {StubActiveInfo} from "../../models/network/request/stub/stub-active-info";
import {StubFirstUseInfo} from "../../models/network/request/stub/stub-first-use-info";
import {Events, App, NavController} from "ionic-angular";
import {LoginPage} from "../../pages/login/login/login";

/*
 Generated class for the StubService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class StubService {

    constructor(@Inject(forwardRef(() => HttpService)) public httpService: HttpService, @Inject(forwardRef(() => Events)) public events: Events, @Inject(forwardRef(() => UserData)) public userData: UserData, @Inject(forwardRef(() => App)) public app: App, @Inject(forwardRef(() => HudService)) public hudService: HudService) {
        console.log('Hello StubService Provider');
    }

    send(data: StubInfo) {
        this.httpService.httpRequest('/logs/points.htm', data, HttpMethod.Post, ContentType.JSON, null, null, false);
    }

    saveAppActive(stubActiveInfo: StubActiveInfo) {
        this.httpService.httpRequest('/logs/active.htm', stubActiveInfo, HttpMethod.Post, ContentType.JSON, null, null, false);
    }

    saveAppFirstStart(stubFirstUseInfo: StubFirstUseInfo) {
        this.httpService.httpRequest('/logs/first/start.htm', stubFirstUseInfo, HttpMethod.Post, ContentType.JSON, null, null, false);
    }

    getCredit(success: (data) => void) {
        this.httpService.httpRequest('/users/credit/params.htm', null, HttpMethod.Get, ContentType.Form, (data) => {
            data.baseUri = data.baseUri + "/";
            success(data);
        });
    }

    subscribeEvents(events: string, action: (data) => void) {
        this.events.subscribe(events, action);
    }

    unsubscribeEvents(events: string) {
        this.events.unsubscribe(events);
    }

    push(page, data) {
        if (page.isPermission) {
            this.userData.hasLoggedIn().subscribe(hasLoggedIn => {
                if (!hasLoggedIn) {
                    if (!HttpService.hasShowLoginPage) {
                        HttpService.hasShowLoginPage = true;
                        let toast = this.hudService.getToast("请先登录！");
                        toast.onDidDismiss(() => {
                            this.app.getActiveNav().push(LoginPage);
                        });
                        toast.present();
                    }
                } else {
                    this.app.getActiveNav().push(page, data);
                }
            });
        } else {
            this.app.getActiveNav().push(page, data);
        }
    }

    pop() {
        this.app.getActiveNav().pop();
    }

    popToRoot() {
        this.app.getActiveNav().popToRoot();
    }

    popTo(page) {
        this.getNavCtrl().getViews().forEach(view => {
            if (view.instance instanceof page) {
                this.app.getActiveNav().popTo(view);
            }
        });
    }

    setRoot(page, data) {
        this.app.getRootNav().setRoot(page, data);
    }

    getNavCtrl(): NavController {
        return this.app.getActiveNav();
    }

    popToRootNavRoot() {
        this.app.getRootNav().popToRoot();
        this.events.publish('refresh:loanlist');
    }

}

import {ConfigService} from "./../../../providers/config-service";
import {ServicePraisePage} from "./../service-praise/service-praise";
import {ApplyAllinpayServicePage} from "./../apply-allinpay-service/apply-allinpay-service";
import {CallCenterSearchRequestInfo} from "./../../../models/network/request/center/call-center-search-request-info";
import {Component, ViewChild} from "@angular/core";
import {NavParams, Events, InfiniteScroll} from "ionic-angular";
import {PermissionPage} from "../../base/permission/permission";
import {StubService} from "../../../requests/stub/stub-service";
import {UserData} from "../../../storages/user-data";
import {HudService} from "../../../providers/hud-service";
import {MerchantService} from "../../../requests/merchant/merchant-service";
import {Util} from "../../../utils/util";
import {CallCenterService} from "../../../requests/call-center/call-center-service";
import {CenterApplyRequstInfo} from "../../../models/network/request/center/center-apply-requst-info";

/*
 Generated class for the MyCustomService page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-my-custom-service',
    templateUrl: 'my-custom-service.html'
})
export class MyCustomServicePage extends PermissionPage {
    resetCurrentName(): void {
        ConfigService.currentName = "MyCustomServicePage";
    }

    status: string = null;
    pageNo = 1;
    centerApplyRequstInfos: CenterApplyRequstInfo[] = [];
    @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;

    constructor(public callCenterService: CallCenterService, public events: Events, public navParams: NavParams, public merchantService: MerchantService, public hudService: HudService, public userData: UserData, public stubService: StubService) {
        super(stubService);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MyCustomServicePage');
        super.ionViewDidLoad();
    }

    ionViewDidEnter() {
        super.ionViewDidEnter();
        this.beginRefresh();
    }


    toogleStatus(status: string) {
        this.status = status;
        this.refresher._beginRefresh();
    }

    listApplyOrders() {
        let callCenterSearchRequestInfo = new CallCenterSearchRequestInfo(this.status);
        callCenterSearchRequestInfo.pageNo = this.pageNo;
        this.callCenterService.listApplyOrders(callCenterSearchRequestInfo, centerApplyRequstInfos => {
            this.refresher.complete();
            this.infiniteScroll.complete();
            this.shouldShowNetError = false;
            if (this.pageNo === 1) {
                if (Util.isNotNullOrUndefined(centerApplyRequstInfos) && centerApplyRequstInfos.length > 0) {
                    this.centerApplyRequstInfos = centerApplyRequstInfos;
                    this.hasMoreData = true;
                } else {
                    this.centerApplyRequstInfos = [];
                    this.hasMoreData = false;
                }
            } else {
                if (Util.isNotNullOrUndefined(centerApplyRequstInfos) && centerApplyRequstInfos.length > 0) {
                    this.centerApplyRequstInfos = this.centerApplyRequstInfos.concat(centerApplyRequstInfos);
                } else {
                    this.hasMoreData = false;
                }
            }
            this.updateNoDateStatus();
        }, () => {
            this.shouldShowNetError = false;
            this.refresher.complete();
            this.infiniteScroll.complete();
            this.updateNoDateStatus();
        }, () => {
            this.refresher.complete();
            this.infiniteScroll.complete();
            this.shouldShowNetError = true;
            this.shouldShowNoData = false;
        });
    }

    updateNoDateStatus() {
        if (this.centerApplyRequstInfos == null || this.centerApplyRequstInfos.length === 0) {
            this.shouldShowNoData = true;
        } else {
            this.shouldShowNoData = false;
        }
    }

    doRefresh(event) {
        this.pageNo = 1;
        this.listApplyOrders();
    }

    loadMore(event) {
        this.pageNo = this.pageNo + 1;
        this.listApplyOrders();
    }

    goToApply(event: Event) {
        this.push(ApplyAllinpayServicePage);
    }

    goToPraise(event: Event, centerApplyRequstInfo: CenterApplyRequstInfo) {
        event.preventDefault();
        this.push(ServicePraisePage, {centerApplyRequstInfo: centerApplyRequstInfo});
    }


    beginRefresh() {
        this.refresher._beginRefresh();
    }
}

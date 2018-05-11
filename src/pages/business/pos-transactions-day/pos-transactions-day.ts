import { BusinessDetailFund } from './../../../models/network/response/business/business-detail-fund';
import { Util } from './../../../utils/util';
import { ConfigService } from "./../../../providers/config-service";
import { BusinessPosDetailResult } from "./../../../models/network/response/business/business-pos-detail-result";
import { BusinessService } from "./../../../requests/business/business-service";
import { BusinessDailyRequestInfo } from "./../../../models/network/request/business/business-daily-request-info";
import { Component, ViewChild } from "@angular/core";
import { NavParams, Refresher, InfiniteScroll } from "ionic-angular";
import { PermissionPage } from "../../base/permission/permission";
import { StubService } from "../../../requests/stub/stub-service";

/*
 Generated class for the POSTransactionsDay page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-pos-transactions-day',
    templateUrl: 'pos-transactions-day.html'
})
export class POSTransactionsDayPage extends PermissionPage {
    resetCurrentName(): void {
        ConfigService.currentName = "POSTransactionsDayPage";
    }

    mchtCd: string;
    nowDate: string;
    todayPosAmt: string;
    todayPosInfo: BusinessPosDetailResult;
    todayPosItems: BusinessDetailFund[] = [];
    @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
    pageNo = 1;

    constructor(public stubService: StubService, public navParams: NavParams, public businessService: BusinessService) {
        super(stubService);
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        this.mchtCd = this.navParams.get("mchtCd");
        this.nowDate = this.navParams.get("searchDate");
        this.todayPosAmt = this.navParams.get("todayPosAmt");
    }

    ionViewDidEnter() {
        super.ionViewDidEnter();
        this.beginRefresh();
    }
    getPosInfo() {
        let merchantInfo = new BusinessDailyRequestInfo();
        merchantInfo.mchtCd = this.mchtCd;
        merchantInfo.startDate = this.nowDate;
        merchantInfo.pageNo = this.pageNo;
        this.businessService.getPosDetail(merchantInfo, (data) => {
            this.refresher.complete();
            this.infiniteScroll.complete();
            if (this.pageNo === 1) {
                if (Util.isNotNullOrUndefined(data)) {
                    this.todayPosInfo = data;
                    if (Util.isNotNullOrUndefined(data.results) && data.results.length > 0) {
                        this.todayPosItems = data.results;
                        this.hasMoreData = true;
                    }
                } else {
                    this.todayPosItems = [];
                    this.hasMoreData = false;
                }
            } else {
                if (Util.isNotNullOrUndefined(data) && Util.isNotNullOrUndefined(data.results) && data.results.length > 0) {
                    this.todayPosItems = this.todayPosItems.concat(data.results);
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
        })
    }
    updateNoDateStatus() {
        if (this.todayPosItems.length === 0) {
            this.shouldShowNoData = true;
        } else {
            this.shouldShowNoData = false;
        }
    }
    ionViewWillEnter() {
        super.ionViewWillEnter();
    }
    beginRefresh() {
        this.refresher._beginRefresh();
    }
    doRefresh(event: Event) {
        this.pageNo = 1;
        this.getPosInfo();
        console.log(this.todayPosInfo)
    }

    loadMore(event) {
        this.pageNo = this.pageNo + 1;
        this.getPosInfo();
    }
}

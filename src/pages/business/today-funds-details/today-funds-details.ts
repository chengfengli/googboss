import {ConfigService} from "./../../../providers/config-service";
import {BusinessDailyDetailResult} from "./../../../models/network/response/business/business-daily-detail-result";
import {BusinessService} from "./../../../requests/business/business-service";
import {BusinessDailyRequestInfo} from "./../../../models/network/request/business/business-daily-request-info";
import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";
import {PermissionPage} from "../../base/permission/permission";
import {StubService} from "../../../requests/stub/stub-service";

/*
 Generated class for the TodayFundsDetails page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-today-funds-details',
    templateUrl: 'today-funds-details.html'
})
export class TodayFundsDetailsPage extends PermissionPage {
    resetCurrentName(): void {
        ConfigService.currentName = "TodayFundsDetailsPage";
    }

    mchtCd: string;
    nowDate: string;
    todayFundsInfo: BusinessDailyDetailResult;

    constructor(public stubService: StubService, public navParams: NavParams, public businessService: BusinessService) {
        super(stubService);
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        this.mchtCd = this.navParams.get("mchtCd");
        this.nowDate = this.navParams.get("searchDate");
    }

    ionViewDidEnter() {
        super.ionViewDidEnter();
        let merchantInfo = new BusinessDailyRequestInfo();
        merchantInfo.mchtCd = this.mchtCd;
        merchantInfo.startDate = this.nowDate;
        this.businessService.getBusinessDaily(merchantInfo, (data) => {
            this.todayFundsInfo = data;
        })
    }

    ionViewWillEnter() {
        super.ionViewWillEnter();
    }
}

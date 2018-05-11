import {ConfigService} from "./../../../providers/config-service";
import {TodayFundsDetailsPage} from "../today-funds-details/today-funds-details";
import {BusinessJournalItem} from "./../../../models/network/response/business/business-journal-item";
import {BusinessGeneralJournalRequestInfo} from "./../../../models/network/request/business/business-general-journal-request-info";
import {BusinessService} from "./../../../requests/business/business-service";
import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";
import {PermissionPage} from "../../base/permission/permission";
import {StubService} from "../../../requests/stub/stub-service";

/*
 Generated class for the FundsSummary page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-funds-summary',
    templateUrl: 'funds-summary.html'
})
export class FundsSummaryPage extends PermissionPage {
    resetCurrentName(): void {
        ConfigService.currentName = "FundsSummaryPage";
    }

    headerImg = "assets/images/img/header@2x.png";
    footerImg = "assets/images/img/backbutton@2x.png";
    mchtCd: string;
    mchtInfo: any;
    summaryList: BusinessJournalItem[];

    constructor(public stubService: StubService, public businessService: BusinessService, public navParams: NavParams) {
        super(stubService);
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        this.mchtCd = this.navParams.get('mchtCd');
    }

    ionViewDidEnter() {
        super.ionViewDidEnter();
        let merchantInfo = new BusinessGeneralJournalRequestInfo();
        merchantInfo.mchtCd = this.mchtCd;
        this.businessService.getBusinessCollect(merchantInfo, (data) => {
            this.mchtInfo = data;
            this.summaryList = this.mchtInfo.items;
        })
    }

    ionViewWillEnter() {
        super.ionViewWillEnter();
    }

    goSummaryDetail(date) {
        this.push(TodayFundsDetailsPage, {mchtCd: this.mchtCd, searchDate: date});
    }
}

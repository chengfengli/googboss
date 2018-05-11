import {ConfigService} from "./../../../providers/config-service";
import {POSTransactionsDayPage} from "./../pos-transactions-day/pos-transactions-day";
import {BusinessJournalItem} from "./../../../models/network/response/business/business-journal-item";
import {BusinessService} from "./../../../requests/business/business-service";
import {BusinessGeneralJournalRequestInfo} from "./../../../models/network/request/business/business-general-journal-request-info";
import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";
import {PermissionPage} from "../../base/permission/permission";
import {StubService} from "../../../requests/stub/stub-service";

/*
 Generated class for the POSTransactionsMonthly page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-pos-transactions-monthly',
    templateUrl: 'pos-transactions-monthly.html'
})
export class POSTransactionsMonthlyPage extends PermissionPage {
    resetCurrentName(): void {
        ConfigService.currentName = "POSTransactionsMonthlyPage";
    }

    headerImg = "assets/images/img/header@2x.png";
    footerImg = "assets/images/img/backbutton@2x.png";
    mchtCd: string;
    posTransactionsInfo: any;
    posTransactionsList: BusinessJournalItem[];

    constructor(public stubService: StubService, public navParams: NavParams, public businessService: BusinessService) {
        super(stubService);
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        console.log('ionViewDidLoad FundsSummaryPage');
        this.mchtCd = this.navParams.get('mchtCd');
    }

    ionViewDidEnter() {
        super.ionViewDidEnter();
        let merchantInfo = new BusinessGeneralJournalRequestInfo();
        merchantInfo.mchtCd = this.mchtCd;
        this.businessService.getBusinessPosCollect(merchantInfo, (data) => {
            this.posTransactionsInfo = data;
            this.posTransactionsList = data.items;
        })
    }

    ionViewWillEnter() {
        super.ionViewWillEnter();
    }

    goPosDetail(date, money) {
        this.push(POSTransactionsDayPage, {mchtCd: this.mchtCd, searchDate: date, todayPosAmt: money});
    }
}

import {MerchantDetailInfoModalPage} from "./../../../components/merchant-detail-info-modal/merchant-detail-info-modal";
import {ConfigService} from "./../../../providers/config-service";
import {Util} from "./../../../utils/util";
import {DailyLoanService} from "./../../../requests/loan/daily-loan-service";
import {DailyLoanApplicationSearchInfo} from "./../../../models/network/request/loan/daily-loan-application-search-info";
import {Component, ViewChild} from "@angular/core";
import {InfiniteScroll, ModalController} from "ionic-angular";
import {PermissionPage} from "../../base/permission/permission";
import {StubService} from "../../../requests/stub/stub-service";
import {DailyLoanApplyRecord} from "../../../models/network/response/loan/daily-loan-apply-record";

/*
 Generated class for the MyTtrList page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-my-daily-loan-list',
    templateUrl: 'my-daily-loan-list.html'
})
export class MyTtrListPage extends PermissionPage {
    resetCurrentName(): void {
        ConfigService.currentName = "MyTtrListPage";
    }

    @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
    dailyLoanApplyRecords: DailyLoanApplyRecord[] = [];
    pageNo = 1;

    constructor(public dailyLoanService: DailyLoanService, public stubService: StubService, public modalCtrl: ModalController) {
        super(stubService);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MyTtrListPage');
        super.ionViewDidLoad();
    }

    ionViewDidEnter() {
        super.ionViewDidEnter();
        this.beginRefresh();
    }

    listMyApplys() {
        let dailyLoanApplicationSearchInfo = new DailyLoanApplicationSearchInfo();
        dailyLoanApplicationSearchInfo.pageNo = this.pageNo;
        this.dailyLoanService.listApplication(dailyLoanApplicationSearchInfo, (dailyLoanApplyRecords) => {
            this.refresher.complete();
            this.infiniteScroll.complete();
            this.shouldShowNetError = false;
            if (this.pageNo === 1) {
                if (Util.isNotNullOrUndefined(dailyLoanApplyRecords) && dailyLoanApplyRecords.length > 0) {
                    this.dailyLoanApplyRecords = dailyLoanApplyRecords;
                    this.hasMoreData = true;
                } else {
                    this.dailyLoanApplyRecords = [];
                    this.hasMoreData = false;
                }
            } else {
                if (Util.isNotNullOrUndefined(dailyLoanApplyRecords) && dailyLoanApplyRecords.length > 0) {
                    this.dailyLoanApplyRecords = this.dailyLoanApplyRecords.concat(dailyLoanApplyRecords);
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
        if (this.dailyLoanApplyRecords.length === 0) {
            this.shouldShowNoData = true;
        } else {
            this.shouldShowNoData = false;
        }
    }

    doRefresh(event: Event) {
        this.pageNo = 1;
        this.listMyApplys();
    }

    loadMore(event) {
        this.pageNo = this.pageNo + 1;
        this.listMyApplys();
    }

    beginRefresh() {
        this.refresher._beginRefresh();
    }

    goMchtDetail(e, name, id) {
        e.preventDefault();
        e.stopPropagation();
        let myModal = this.modalCtrl.create(MerchantDetailInfoModalPage, {mchtName: name, mchtCd: id});
        myModal.onDidDismiss((data) => {
            this.shouldShowShade = false;
        })
        myModal.present();
        this.shouldShowShade = true;
    }

}

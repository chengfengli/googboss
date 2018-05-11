import {MerchantDetailInfoModalPage} from "./../../../components/merchant-detail-info-modal/merchant-detail-info-modal";
import {ConfigService} from "./../../../providers/config-service";
import {Util} from "./../../../utils/util";
import {Component, ViewChild} from "@angular/core";
import {InfiniteScroll, ModalController} from "ionic-angular";
import {PermissionPage} from "../../base/permission/permission";
import {StubService} from "../../../requests/stub/stub-service";
import {FastLoanService} from "../../../requests/loan/fast-loan-service";
import {FastLoanApplicationSearchInfo} from "../../../models/network/request/loan/fast-loan-application-search-info";
import {FastLoanApplyRecord} from "../../../models/network/response/loan/fast-loan-apply-record";

/*
 Generated class for the MyTtrList page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-my-fast-loan-list',
    templateUrl: 'my-fast-loan-list.html'
})
export class MyFastLoanListPage extends PermissionPage {
    resetCurrentName(): void {
        ConfigService.currentName = "MyFastLoanListPage";
    }

    @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
    fastLoanApplyRecords: FastLoanApplyRecord[] = [];
    pageNo = 1;

    constructor(public dailyLoanService: FastLoanService, public stubService: StubService, public modalCtrl: ModalController) {
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
        let fastLoanApplicationSearchInfo = new FastLoanApplicationSearchInfo();
        fastLoanApplicationSearchInfo.pageNo = this.pageNo;
        this.dailyLoanService.listApplication(fastLoanApplicationSearchInfo, (fastLoanApplyRecords) => {
            this.refresher.complete();
            this.infiniteScroll.complete();
            this.shouldShowNetError = false;
            if (this.pageNo === 1) {
                if (Util.isNotNullOrUndefined(fastLoanApplyRecords) && fastLoanApplyRecords.length > 0) {
                    this.fastLoanApplyRecords = fastLoanApplyRecords;
                    this.hasMoreData = true;
                } else {
                    this.fastLoanApplyRecords = [];
                    this.hasMoreData = false;
                }
            } else {
                if (Util.isNotNullOrUndefined(fastLoanApplyRecords) && fastLoanApplyRecords.length > 0) {
                    this.fastLoanApplyRecords = this.fastLoanApplyRecords.concat(fastLoanApplyRecords);
                } else {
                    this.hasMoreData = false;
                }
            }
            this.updateNoDateStatus();
        }, () => {
            this.refresher.complete();
            this.infiniteScroll.complete();
            this.updateNoDateStatus();
            this.shouldShowNetError = false;
        }, () => {
            this.refresher.complete();
            this.infiniteScroll.complete();
            this.shouldShowNetError = true;
            this.shouldShowNoData = false;
        });
    }

    doRefresh(event) {
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

    updateNoDateStatus() {
        if (this.fastLoanApplyRecords.length === 0) {
            this.shouldShowNoData = true;
        } else {
            this.shouldShowNoData = false;
        }
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

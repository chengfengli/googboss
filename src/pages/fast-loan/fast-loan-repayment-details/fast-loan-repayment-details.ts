import {DatePickerModalPage} from "./../../../components/date-picker-modal/date-picker-modal";
import {Component, ViewChild} from "@angular/core";
import {NavParams, InfiniteScroll, App, ModalController, Events} from "ionic-angular";
import {StubService} from "../../../requests/stub/stub-service";
import {BasePage} from "../../base/base/base";
import {FastLoanMchtDeposit} from "../../../models/network/response/loan/fast-loan-mcht-deposit";
import {FastLoanPaymentStatusInfo} from "../../../models/network/response/loan/fast-loan-payment-status-info";
import {FastLoanService} from "../../../requests/loan/fast-loan-service";
import {FastLoanRepaymentDetailRequestInfo} from "../../../models/network/request/loan/fast-loan-repayment-detail-request-info";
import {FastLoanMerchantListPage} from "../fast-loan-merchant-list/fast-loan-merchant-list";
import {ConfigService} from "../../../providers/config-service";

/*
 Generated class for the FastLoanRepaymentDetails page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-fast-loan-repayment-details',
    templateUrl: 'fast-loan-repayment-details.html'
})
export class FastLoanRepaymentDetailsPage extends BasePage {
    @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
    currentFastLoanMchtDeposit: FastLoanMchtDeposit;
    fastLoanPaymentStatusInfos: FastLoanPaymentStatusInfo[] = [];
    pageNo = 1;
    startDate: string;
    endsDate: string;
    datePicker: boolean = false;
    totalRow: number;

    constructor(public app: App, public navParams: NavParams, public stubService: StubService, public fastLoanService: FastLoanService, public modalCtrl: ModalController, public events: Events) {
        super(stubService);
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        this.currentFastLoanMchtDeposit = FastLoanMerchantListPage.selectedFastLoanMchtDeposit;
        this.events.subscribe('myRepaymentListTime', (data) => {
            this.startDate = data.startTime;
            this.endsDate = data.endsTime;
        });
    }

    ionViewWillUnload() {
        super.ionViewWillUnload();
        this.events.unsubscribe('myRepaymentListTime');
    }

    ionViewDidEnter() {
        super.ionViewDidEnter();
        this.beginRefresh();
    }

    getFastLoanRepaymentPlan() {
        let tempRow = this.pageNo * 10 - 1;
        let fastLoanRepaymentDetailRequestInfo = new FastLoanRepaymentDetailRequestInfo(this.currentFastLoanMchtDeposit.mchtCd, (this.pageNo - 1) * 10, tempRow, this.startDate, this.endsDate);
        this.fastLoanService.getRepaymentDetail(fastLoanRepaymentDetailRequestInfo, (fastLoanRepaymentDetail) => {
            this.refresher.complete();
            this.infiniteScroll.complete();
            this.shouldShowNetError = false;
            if (fastLoanRepaymentDetail) {
                this.totalRow = fastLoanRepaymentDetail.totalRow;
                if (this.pageNo === 1) {
                    if (fastLoanRepaymentDetail.paymentStatusList && fastLoanRepaymentDetail.paymentStatusList.length > 0) {
                        this.fastLoanPaymentStatusInfos = fastLoanRepaymentDetail.paymentStatusList;
                    } else {
                        this.fastLoanPaymentStatusInfos = [];
                    }
                } else {
                    if (fastLoanRepaymentDetail.paymentStatusList && fastLoanRepaymentDetail.paymentStatusList.length > 0) {
                        this.fastLoanPaymentStatusInfos = this.fastLoanPaymentStatusInfos.concat(fastLoanRepaymentDetail.paymentStatusList);
                    }
                }
                if (this.fastLoanPaymentStatusInfos.length < this.totalRow) {
                    this.hasMoreData = true;
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
        if (this.fastLoanPaymentStatusInfos.length === 0) {
            this.shouldShowNoData = true;
        } else {
            this.shouldShowNoData = false;
        }
    }

    doRefresh(event) {
        this.filterDetails();
    }

    filterDetails() {
        this.pageNo = 1;
        this.getFastLoanRepaymentPlan();
    }

    loadMore(event) {
        this.pageNo = this.pageNo + 1;
        this.getFastLoanRepaymentPlan();
    }

    popRoot() {
        this.popToRootNavRoot();
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'FastLoanRepaymentDetailsPage';
    }

    beginRefresh() {
        this.refresher._beginRefresh();
    }

    openCalendar(nowChoose?: string) {
        let myModal = this.modalCtrl.create(DatePickerModalPage, {
            startTime: this.startDate,
            endsTime: this.endsDate,
            nowChoose: nowChoose
        });
        myModal.onDidDismiss(data => {
            this.datePicker = false;
            this.beginRefresh();
        });
        myModal.present();
        this.datePicker = true;
    }

    openCalendarStart(event) {
        event.stopPropagation();
        this.openCalendar("start")
    }

    openCalendarEnd(event) {
        event.stopPropagation();
        this.openCalendar("end")
    }
}

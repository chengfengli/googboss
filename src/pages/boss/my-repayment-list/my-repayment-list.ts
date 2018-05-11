import {ConfigService} from "./../../../providers/config-service";
import {DatePickerModalPage} from "./../../../components/date-picker-modal/date-picker-modal";
import {RepaymentService} from "./../../../requests/loan/repayment-service";
import {Util} from "./../../../utils/util";
import {Component, ViewChild} from "@angular/core";
import {InfiniteScroll, ModalController, Events} from "ionic-angular";
import {PermissionPage} from "../../base/permission/permission";
import {StubService} from "../../../requests/stub/stub-service";
import {InitiativeRepaymentSearchInfo} from "../../../models/network/request/loan/initiative-repayment-search-info";
import {InitiativeRepaymentRecord} from "../../../models/network/response/loan/initiative-repayment-record";
/*
 Generated class for the MyTtrList page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-my-repayment-list',
    templateUrl: 'my-repayment-list.html'
})
export class MyRepaymentListPage extends PermissionPage {
    resetCurrentName(): void {
        ConfigService.currentName = "MyRepaymentListPage";
    }

    @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
    initiativeRepaymentRecords: InitiativeRepaymentRecord[] = [];
    pageNo = 1;
    startDate: string = "";
    endsDate: string = "";
    datePicker: boolean = false;

    constructor(public repaymentService: RepaymentService, public stubService: StubService, public modalCtrl: ModalController, public events: Events) {
        super(stubService);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MyTtrListPage');
        super.ionViewDidLoad();
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
        if (!this.datePicker) {
            this.beginRefresh();
        }
    }

    listMyApplys() {
        let initiativeRepaymentSearchInfo = new InitiativeRepaymentSearchInfo();
        initiativeRepaymentSearchInfo.pageNo = this.pageNo;
        initiativeRepaymentSearchInfo.startDate = this.startDate
        initiativeRepaymentSearchInfo.endDate = this.endsDate
        this.repaymentService.listInitiativeRepaymentRecords(initiativeRepaymentSearchInfo, (initiativeRepaymentRecords) => {
            this.refresher.complete();
            this.infiniteScroll.complete();
            this.shouldShowNetError = false;
            if (this.pageNo === 1) {
                if (Util.isNotNullOrUndefined(initiativeRepaymentRecords) && initiativeRepaymentRecords.length > 0) {
                    this.initiativeRepaymentRecords = initiativeRepaymentRecords;
                    this.hasMoreData = true;
                } else {
                    this.initiativeRepaymentRecords = [];
                    this.hasMoreData = false;
                }
            } else {
                if (Util.isNotNullOrUndefined(initiativeRepaymentRecords) && initiativeRepaymentRecords.length > 0) {
                    this.initiativeRepaymentRecords = this.initiativeRepaymentRecords.concat(initiativeRepaymentRecords);
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
        if (this.initiativeRepaymentRecords.length === 0) {
            this.shouldShowNoData = true;
        } else {
            this.shouldShowNoData = false;
        }
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


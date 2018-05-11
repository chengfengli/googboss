import { MerchantDetailInfoModalPage } from './../../../components/merchant-detail-info-modal/merchant-detail-info-modal';
import {ConfigService} from "./../../../providers/config-service";
import {Util} from "./../../../utils/util";
import {POSTransactionsMonthlyPage} from "./../pos-transactions-monthly/pos-transactions-monthly";
import {FundsSummaryPage} from "./../funds-summary/funds-summary";
import {trigger, ViewChild, state, style, transition, animate, Component} from "@angular/core";
import {Slides, ModalController} from "ionic-angular";
import {UserProfile} from "./../../../models/user/user-profile";
import {BusinessService} from "./../../../requests/business/business-service";
import {StubService} from "../../../requests/stub/stub-service";
import {PermissionPage} from "../../base/permission/permission";
/*
 Generated class for the MerchantFundsCharts page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-merchant-funds-charts',
    templateUrl: 'merchant-funds-charts.html',
    animations: [
        trigger('slideState', [
            state('threeDay', style({
                left: '0'
            })),
            state('sevenDay', style({
                left: '-42%'
            })),
            state('fifteenDay', style({
                left: '-84%'
            })),
            state('oneMonth', style({
                left: '-126%'
            })),
            state('halfYear', style({
                left: '-168%'
            })),
            state('oneYear', style({
                left: '-210%'
            })),
            transition('threeDay => sevenDay', animate('300ms')),
            transition('sevenDay => threeDay', animate('300ms')),
            transition('sevenDay => fifteenDay', animate('300ms')),
            transition('fifteenDay => sevenDay', animate('300ms')),
            transition('fifteenDay => oneMonth', animate('300ms')),
            transition('oneMonth => fifteenDay', animate('300ms')),
            transition('oneMonth => halfYear', animate('300ms')),
            transition('halfYear => oneMonth', animate('300ms')),
            transition('halfYear => oneYear', animate('300ms')),
            transition('oneYear => halfYear', animate('300ms'))
        ])
    ]
})
export class MerchantFundsChartsPage extends PermissionPage {
    resetCurrentName(): void {
        ConfigService.currentName = "MerchantFundsChartsPage";
    }

    bolongImg = "assets/images/img/bolang@2x.png";
    profile = new UserProfile();
    slideDayStatu = "sevenDay";
    merchantList: any;
    currentMchtIndex: number = 0;
    currentMchtCd: string;
    currentInterval = '7';
    currentUnit = 'D';
    areaType = '02';
    areaTypeIndex = 1;
    myRank: string;
    totalRank: string;
    totalSeq: number = 2;
    threeDayDate: any[] = [];
    threeDayAmt: any[] = [];
    sevenDayAmt: any[] = [];
    sevenDayDate: any[] = [];
    fifteenDayAmt: any[] = [];
    fifteenDayDate: any[] = [];
    oneMonthAmt: any[] = [];
    oneMonthDate: any[] = [];
    halfYearAmt: any[] = [];
    halfYearDate: any[] = [];
    oneYearAmt: any[] = [];
    oneYearDate: any[] = [];
    public lineChartData: Array<any> = [
        {data: []}
    ];
    public lineChartLabels: Array<any> = [1, 2, 3, 4, 5];
    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartColors: Array<any> = [
        {
            backgroundColor: 'rgba(244,94,59,0.7)',
            borderColor: '#f45e3b',
            pointBackgroundColor: '#f45e3b',
            pointBorderColor: '#f45e3b',
            pointHoverBackgroundColor: '#f45e3b',
            pointHoverBorderColor: '#f45e3b'
        }
    ];
    public lineChartLegend: boolean = false;
    public lineChartType: string = 'line';

    // 柱状图
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        borderWidth: 1,
        borderSkipped: "bottom"
    };
    public barChartLabels: string[] = ['同类企业平均水平', '我的平均水平'];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = false;

    public barChartData: any[] = [
        {data: [0]},
    ];
    public barChartColors: Array<any> = [
        {
            backgroundColor: ['#41c895', '#ee783f'],
            borderColor: ['#41c895', '#ee783f'],
            pointBackgroundColor: ['#41c895', '#ee783f'],
            pointBorderColor: ['#41c895', '#ee783f'],
            pointHoverBackgroundColor: ['#41c895', '#ee783f'],
            pointHoverBorderColor: ['#41c895', '#ee783f']
        }
    ]
    @ViewChild(Slides) slides: Slides;

    constructor(public stubService: StubService, public businessService: BusinessService, public modalCtrl:ModalController) {
        super(stubService);
    }

    ionViewDidEnter() {
        super.ionViewDidEnter();
        this.businessService.getBusinessHome((data) => {
            this.merchantList = data.items;
            console.log(this.merchantList);
            this.currentMchtCd = this.merchantList[this.currentMchtIndex].totalAmt.mchtCd;
            this.getSlideDayData();
            this.getAreaInfo();
        })
    }

    ionViewWillEnter() {
        super.ionViewWillEnter();
    }

    getSlideDayData() {
        let summaryList: any[] = this.merchantList[this.currentMchtIndex].totalAmt.totalAmts;
        this.threeDayDate = [];
        this.threeDayAmt = [];
        this.sevenDayDate = [];
        this.sevenDayAmt = [];
        this.fifteenDayDate = [];
        this.fifteenDayAmt = [];
        this.oneMonthDate = [];
        this.oneMonthAmt = [];
        this.halfYearDate = [];
        this.halfYearAmt = [];
        this.oneYearDate = [];
        this.oneYearAmt = [];
        for (let i = 0; i < summaryList.length; i++) {
            let totalList = summaryList[i].totalAmtDetails;
            let arrayOrder: boolean;
            if (totalList[0].detailSeq === 1) arrayOrder = true;
            if (summaryList[i].totalSeq === 3 && summaryList[i].totalUnit === "D") {
                if (arrayOrder) {
                    for (let j = totalList.length - 1; j > -1; j--) {
                        if (j === 0 || j === Math.floor(totalList.length / 2) || j === totalList.length - 1) {
                            totalList[j].detailTime = this.formatDate(totalList[j].detailTime);
                            this.threeDayDate.push(totalList[j].detailTime)
                            this.threeDayAmt.push(totalList[j].totalAmt);
                        } else {
                            this.threeDayDate.push("");
                            this.threeDayAmt.push(totalList[j].totalAmt);
                        }
                        ;
                    }
                } else {
                    for (let j = 0; j < totalList.length; j++) {
                        if (j === 0 || j === Math.floor(totalList.length / 2) || j === totalList.length - 1) {
                            totalList[j].detailTime = this.formatDate(totalList[j].detailTime);
                            this.threeDayDate.push(totalList[j].detailTime)
                            this.threeDayAmt.push(totalList[j].totalAmt);
                        } else {
                            this.threeDayDate.push("");
                            this.threeDayAmt.push(totalList[j].totalAmt);
                        }
                        ;
                    }
                }
            } else if (summaryList[i].totalSeq === 7 && summaryList[i].totalUnit === "D") {
                if (arrayOrder) {
                    for (let j = totalList.length - 1; j > -1; j--) {
                        if (j === 0 || j === Math.floor(totalList.length / 2) || j === totalList.length - 1) {
                            totalList[j].detailTime = this.formatDate(totalList[j].detailTime);
                            this.sevenDayDate.push(totalList[j].detailTime)
                            this.sevenDayAmt.push(totalList[j].totalAmt);
                        } else {
                            this.sevenDayDate.push("");
                            this.sevenDayAmt.push(totalList[j].totalAmt);
                        }
                        ;
                    }
                } else {
                    for (let j = 0; j < totalList.length; j++) {
                        if (j === 0 || j === Math.floor(totalList.length / 2) || j === totalList.length - 1) {
                            totalList[j].detailTime = this.formatDate(totalList[j].detailTime);
                            this.sevenDayDate.push(totalList[j].detailTime)
                            this.sevenDayAmt.push(totalList[j].totalAmt);
                        } else {
                            this.sevenDayDate.push("");
                            this.sevenDayAmt.push(totalList[j].totalAmt);
                        }
                        ;
                    }
                }
            } else if (summaryList[i].totalSeq === 15 && summaryList[i].totalUnit === "D") {
                if (arrayOrder) {
                    for (let j = totalList.length - 1; j > -1; j--) {
                        if (j === 0 || j === Math.floor(totalList.length / 2) || j === totalList.length - 1) {
                            totalList[j].detailTime = this.formatDate(totalList[j].detailTime);
                            this.fifteenDayDate.push(totalList[j].detailTime);
                            this.fifteenDayAmt.push(totalList[j].totalAmt);
                        } else {
                            this.fifteenDayDate.push("");
                            this.fifteenDayAmt.push(totalList[j].totalAmt);
                        }
                        ;
                    }
                } else {
                    for (let j = 0; j < totalList.length; j++) {
                        if (j === 0 || j === Math.floor(totalList.length / 2) || j === totalList.length - 1) {
                            totalList[j].detailTime = this.formatDate(totalList[j].detailTime);
                            this.fifteenDayDate.push(totalList[j].detailTime);
                            this.fifteenDayAmt.push(totalList[j].totalAmt);
                        } else {
                            this.fifteenDayDate.push("");
                            this.fifteenDayAmt.push(totalList[j].totalAmt);
                        }
                        ;
                    }
                }
            } else if (summaryList[i].totalSeq === 30 && summaryList[i].totalUnit === "D") {
                if (arrayOrder) {
                    for (let j = totalList.length - 1; j > -1; j--) {
                        if (j === 0 || j === Math.floor(totalList.length / 2) || j === totalList.length - 1) {
                            totalList[j].detailTime = this.formatDate(totalList[j].detailTime);
                            this.oneMonthDate.push(totalList[j].detailTime);
                            this.oneMonthAmt.push(totalList[j].totalAmt);
                        } else {
                            this.oneMonthDate.push("");
                            this.oneMonthAmt.push(totalList[j].totalAmt);
                        }
                        ;
                    }
                } else {
                    for (let j = 0; j < totalList.length; j++) {
                        if (j === 0 || j === Math.floor(totalList.length / 2) || j === totalList.length - 1) {
                            totalList[j].detailTime = this.formatDate(totalList[j].detailTime);
                            this.oneMonthDate.push(totalList[j].detailTime);
                            this.oneMonthAmt.push(totalList[j].totalAmt);
                        } else {
                            this.oneMonthDate.push("");
                            this.oneMonthAmt.push(totalList[j].totalAmt);
                        }
                        ;
                    }
                }
            } else if (summaryList[i].totalSeq === 6 && summaryList[i].totalUnit === "M") {
                if (arrayOrder) {
                    for (let j = totalList.length - 1; j > -1; j--) {
                        if (j === 0 || j === Math.floor(totalList.length / 2) || j === totalList.length - 1) {
                            totalList[j].detailTime = this.formatDate(totalList[j].detailTime);
                            this.halfYearDate.push(totalList[j].detailTime);
                            this.halfYearAmt.push(totalList[j].totalAmt);
                        } else {
                            this.halfYearDate.push("");
                            this.halfYearAmt.push(totalList[j].totalAmt);
                        }
                        ;
                    }
                } else {
                    for (let j = 0; j < totalList.length; j++) {
                        if (j === 0 || j === Math.floor(totalList.length / 2) || j === totalList.length - 1) {
                            totalList[j].detailTime = this.formatDate(totalList[j].detailTime);
                            console.log();
                            this.halfYearDate.push(totalList[j].detailTime);
                            this.halfYearAmt.push(totalList[j].totalAmt);
                        } else {
                            this.halfYearDate.push("");
                            this.halfYearAmt.push(totalList[j].totalAmt);
                        }
                        ;
                    }
                }
            } else if (summaryList[i].totalSeq === 12 && summaryList[i].totalUnit === "M") {
                if (arrayOrder) {
                    for (let j = totalList.length - 1; j > -1; j--) {
                        if (j === 0 || j === Math.floor(totalList.length / 2) || j === totalList.length - 1) {
                            totalList[j].detailTime = this.formatDate(totalList[j].detailTime);
                            this.oneYearDate.push(totalList[j].detailTime);
                            this.oneYearAmt.push(totalList[j].totalAmt);
                        } else {
                            this.oneYearDate.push("");
                            this.oneYearAmt.push(totalList[j].totalAmt);
                        }
                        ;
                    }
                } else {
                    for (let j = 0; j < totalList.length; j++) {
                        if (j === 0 || j === Math.floor(totalList.length / 2) || j === totalList.length - 1) {
                            totalList[j].detailTime = this.formatDate(totalList[j].detailTime);
                            this.oneYearDate.push(totalList[j].detailTime);
                            this.oneYearAmt.push(totalList[j].totalAmt);
                        } else {
                            this.oneYearDate.push("");
                            this.oneYearAmt.push(totalList[j].totalAmt);
                        }
                        ;
                    }
                }
            }
        }
        if (this.slideDayStatu === 'threeDay') {
            this.changeLineChart(this.threeDayAmt, this.threeDayDate);
        } else if (this.slideDayStatu === 'sevenDay') {
            this.changeLineChart(this.sevenDayAmt, this.sevenDayDate);
        } else if (this.slideDayStatu === 'fifteenDay') {
            this.changeLineChart(this.fifteenDayAmt, this.fifteenDayDate);
        } else if (this.slideDayStatu === 'oneMonth') {
            this.changeLineChart(this.oneMonthAmt, this.oneMonthDate);
        } else if (this.slideDayStatu === 'halfYear') {
            this.changeLineChart(this.halfYearAmt, this.halfYearDate);
        } else if (this.slideDayStatu === 'oneYear') {
            this.changeLineChart(this.oneYearAmt, this.oneYearDate);
        }
    }

    changeLineChart(nowAmt: any[], nowDate: any[]) {
        this.lineChartData = [{data: nowAmt}];
        setTimeout(() => {
            this.lineChartLabels = nowDate;
        }, 10)
    }

    formatDate(time) {
        time = time.replace(/00:00:00$/, '');
        time = time.replace(/\s+/g, '');
        return time;
    }

    preSlidesDay() {
        if (this.slideDayStatu === 'threeDay') {
            return false
        } else if (this.slideDayStatu === 'sevenDay') {
            this.slideDayStatu = 'threeDay';
            this.changeLineChart(this.threeDayAmt, this.threeDayDate);
        } else if (this.slideDayStatu === 'fifteenDay') {
            this.slideDayStatu = 'sevenDay';
            this.changeLineChart(this.sevenDayAmt, this.sevenDayDate);
        } else if (this.slideDayStatu === 'oneMonth') {
            this.slideDayStatu = 'fifteenDay'
            this.changeLineChart(this.fifteenDayAmt, this.fifteenDayDate);
        } else if (this.slideDayStatu === 'halfYear') {
            this.slideDayStatu = 'oneMonth';
            this.changeLineChart(this.oneMonthAmt, this.oneMonthDate);
        } else if (this.slideDayStatu === 'oneYear') {
            this.slideDayStatu = 'halfYear';
            this.changeLineChart(this.halfYearAmt, this.halfYearDate);
        }
        ;
    }

    nextSlidesDay() {
        if (this.slideDayStatu === 'threeDay') {
            this.slideDayStatu = 'sevenDay';
            this.changeLineChart(this.sevenDayAmt, this.sevenDayDate);
        } else if (this.slideDayStatu === 'sevenDay') {
            this.slideDayStatu = 'fifteenDay';
            this.changeLineChart(this.fifteenDayAmt, this.fifteenDayDate);
        } else if (this.slideDayStatu === 'fifteenDay') {
            this.slideDayStatu = 'oneMonth';
            this.changeLineChart(this.oneMonthAmt, this.oneMonthDate);
        } else if (this.slideDayStatu === 'oneMonth') {
            this.slideDayStatu = 'halfYear'
            this.changeLineChart(this.halfYearAmt, this.halfYearDate);
        } else if (this.slideDayStatu === 'halfYear') {
            this.slideDayStatu = 'oneYear';
            this.changeLineChart(this.oneYearAmt, this.oneYearDate);
        } else if (this.slideDayStatu === 'oneYear') {
            return false
        }
    }

    slideNext() {
        this.slides.slideNext();
    }

    popRoot() {
        this.popToRoot();
    }

    slideChanged() {
        if (this.slides.getActiveIndex() === this.slides.length()) return false;
        this.currentMchtIndex = this.slides.getActiveIndex();
        this.currentMchtCd = this.merchantList[this.currentMchtIndex].totalAmt.mchtCd;
        this.getSlideDayData();
        this.getAreaInfo();
    }

    getAreaInfo() {
        if (Util.isNotNullOrUndefined(this.merchantList[this.currentMchtIndex].operatingSituation.items[this.areaTypeIndex])) {
            this.myRank = this.countRank(this.merchantList[this.currentMchtIndex].operatingSituation.items[this.areaTypeIndex].transFlowRank / this.merchantList[this.currentMchtIndex].operatingSituation.items[this.areaTypeIndex].transFlowMchtTotal);
            this.totalRank = this.countRank(1 - this.merchantList[this.currentMchtIndex].operatingSituation.items[this.areaTypeIndex].transFlowRank / this.merchantList[this.currentMchtIndex].operatingSituation.items[this.areaTypeIndex].transFlowMchtTotal);
            if (!Util.isNotNullOrUndefined(this.myRank) || !Util.isNotNullOrUndefined(this.totalRank) || Number.parseFloat(this.myRank) < 1) {
                this.myRank = "-";
                this.totalRank = "-";
            }
            let transFlowTotal: number = this.merchantList[this.currentMchtIndex].operatingSituation.items[this.areaTypeIndex].avagTransFlow;
            let myFlowTotal: number = this.merchantList[this.currentMchtIndex].operatingSituation.items[this.areaTypeIndex].transFlowTotal;
            this.barChartData = [{data: [transFlowTotal, myFlowTotal, myFlowTotal / 8 + myFlowTotal, 0]}];
        } else {
            this.myRank = "-";
            this.totalRank = "-";
        }
    }

    goFundsSummary() {
        this.push(FundsSummaryPage, {mchtCd: this.currentMchtCd})
    }

    goPosTransactions() {
        this.push(POSTransactionsMonthlyPage, {mchtCd: this.currentMchtCd})
    }

    countRank(num: number): string {
        if (!isNaN(num)) {
            return String(Math.round(num * 100) + "%")
        } else {
            return;
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

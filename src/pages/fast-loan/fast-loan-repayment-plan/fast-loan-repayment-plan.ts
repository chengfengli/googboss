import {ViewChild, Component} from "@angular/core";
import {FastLoanRepaymentPlanRequstInfo} from "./../../../models/network/request/loan/fast-loan-repayment-plan-requst-info";
import {FastLoanService} from "./../../../requests/loan/fast-loan-service";
import {FastLoanRepaymentSchedule} from "./../../../models/network/response/loan/fast-loan-repayment-schedule";
import {NavParams, InfiniteScroll, App} from "ionic-angular";
import {BasePage} from "../../base/base/base";
import {StubService} from "../../../requests/stub/stub-service";
import {FastLoanMchtDeposit} from "../../../models/network/response/loan/fast-loan-mcht-deposit";
import {FastLoanMerchantListPage} from "../fast-loan-merchant-list/fast-loan-merchant-list";
import {FastLoanRepaymentPlan} from "../../../models/network/response/loan/fast-loan-repayment-plan";
import {ConfigService} from "../../../providers/config-service";

/*
 Generated class for the FastLoanRepaymentPlan page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-fast-loan-repayment-plan',
    templateUrl: 'fast-loan-repayment-plan.html'
})
export class FastLoanRepaymentPlanPage extends BasePage {
    @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
    currentFastLoanMchtDeposit: FastLoanMchtDeposit;
    fastLoanRepaymentSchedules: FastLoanRepaymentSchedule[] = [];
    fastLoanRepaymentPlan: FastLoanRepaymentPlan;
    pageNo = 1;
    totalRow: number;

    constructor(public app: App, public navParams: NavParams, public stubService: StubService, public fastLoanService: FastLoanService) {
        super(stubService);
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        this.currentFastLoanMchtDeposit = FastLoanMerchantListPage.selectedFastLoanMchtDeposit;
    }

    ionViewDidEnter() {
        super.ionViewDidEnter();
        this.refresher._beginRefresh();
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'FastLoanRepaymentPlanPage';
    }

    getFastLoanRepaymentPlan() {
        let tempRow = this.pageNo * 10 - 1;
        let fastLoanRepaymentPlanRequstInfo = new FastLoanRepaymentPlanRequstInfo(this.currentFastLoanMchtDeposit.mchtCd, (this.pageNo - 1) * 10, tempRow);
        this.fastLoanService.getRepaymentPlan(fastLoanRepaymentPlanRequstInfo, (fastLoanRepaymentPlan) => {
            this.refresher.complete();
            this.infiniteScroll.complete();
            if (fastLoanRepaymentPlan) {
                this.totalRow = fastLoanRepaymentPlan.totalRow;
                this.fastLoanRepaymentPlan = fastLoanRepaymentPlan;
                if (this.pageNo === 1) {
                    if (fastLoanRepaymentPlan && fastLoanRepaymentPlan.schedules && fastLoanRepaymentPlan.schedules.length > 0) {
                        this.fastLoanRepaymentSchedules = fastLoanRepaymentPlan.schedules;
                    } else {
                        this.fastLoanRepaymentSchedules = [];
                    }
                } else {
                    if (fastLoanRepaymentPlan && fastLoanRepaymentPlan.schedules && fastLoanRepaymentPlan.schedules.length > 0) {
                        this.fastLoanRepaymentSchedules = this.fastLoanRepaymentSchedules.concat(fastLoanRepaymentPlan.schedules);
                    }
                }
                if (this.fastLoanRepaymentSchedules.length < this.totalRow) {
                    this.hasMoreData = true;
                } else {
                    this.hasMoreData = false;
                }
            }
        }, () => {
            this.refresher.complete();
            this.infiniteScroll.complete();
        });
    }

    doRefresh(event) {
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

}

import {FastLoanApplyRequestInfo} from "./../../../models/network/response/loan/fast-loan-apply-request-info";
import {FastLoanService} from "./../../../requests/loan/fast-loan-service";
import {FastLoanDeposit} from "./../../../models/network/response/loan/fast-loan-deposit";
import {Component, ViewChild} from "@angular/core";
import {NavParams, Refresher, App} from "ionic-angular";
import {StubService} from "../../../requests/stub/stub-service";
import {BasePage} from "../../base/base/base";
import {FastLoanApplyInfo} from "../../../models/network/response/loan/fast-loan-apply-info";
import {Observable} from "rxjs";
import {FastLoanTabsPage} from "../fast-loan-tabs/fast-loan-tabs";
import {ConfigService} from "../../../providers/config-service";
import {FastLoanMerchantListPage} from "../fast-loan-merchant-list/fast-loan-merchant-list";

/*
 Generated class for the GetMoneyStatus page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-get-money-status',
    templateUrl: 'fast-loan-get-money-status.html'
})
export class GetMoneyStatusPage extends BasePage {

    loanAuditStatus: string;
    fastLoanApplyInfo: FastLoanApplyInfo;
    timer: Observable<any>;
    subscription: any;
    showBackButton: boolean;
    prevPage: string;
    @ViewChild(Refresher) refresher: Refresher;

    constructor(public app: App, public fastLoanService: FastLoanService, public navParams: NavParams, public stubService: StubService) {
        super(stubService);
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'GetMoneyStatusPage';
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        console.log('ionViewDidLoad GetMoneyStatusPage');
        this.fastLoanApplyInfo = this.navParams.get('fastLoanApplyInfo');
        this.loanAuditStatus = this.fastLoanApplyInfo.loanCashedStatus;
    }

    ionViewDidEnter() {
        super.ionViewDidEnter();
        this.timer = Observable.timer(0, 3000);
        this.subscription = this.timer.subscribe((t) => {
            this.getPaymentStatus();
        });
    }

    ionViewWillEnter() {
        super.ionViewWillEnter();
        let views = this.getNavCtrl().getViews();
        let fileterViews = views.filter(view => {
            return view.instance instanceof FastLoanMerchantListPage;
        });
        if (fileterViews.length > 0) {
            this.prevPage = "fastLoan";
        } else {
            this.prevPage = "home";
            ConfigService.preName = "home";
        }
    }

    ionViewWillLeave() {
        super.ionViewWillLeave()
        this.subscription.unsubscribe();
    }

    shouldShowFail(): boolean {
        if (this.loanAuditStatus === FastLoanDeposit.LoanAuditStatus.PAYMENT_FAILED) {
            return true;
        }
        return false;
    }

    shouldShowProcessing(): boolean {
        if (this.loanAuditStatus === FastLoanDeposit.LoanAuditStatus.PAYMENT_PROCESSING) {
            return true;
        }
        return false;
    }

    shouldShowEstablish(): boolean {
        if (this.loanAuditStatus === FastLoanDeposit.LoanAuditStatus.ESTABLISH) {
            return true;
        }
        return false;
    }

    shouldShowSuccess(): boolean {
        if (this.loanAuditStatus === FastLoanDeposit.LoanAuditStatus.PAYMENT_SUCCESSED) {
            return true;
        }
        return false;
    }

    goBack() {
        if (this.prevPage === "home") {
            this.popToRoot();
        } else if (this.prevPage === "fastLoan") {
            this.popToRootNavRoot();
        }
    }

    getPaymentStatus() {
        let fastLoanApplyRequestInfo = new FastLoanApplyRequestInfo(this.fastLoanApplyInfo.tid);
        this.fastLoanService.getApplication(fastLoanApplyRequestInfo, fastLoanApplyInfo => {
            this.fastLoanApplyInfo = fastLoanApplyInfo;
            this.loanAuditStatus = this.fastLoanApplyInfo.loanCashedStatus;
            if (this.shouldShowEstablish()) {
                this.subscription.unsubscribe();
            }
        });
    }


    doRefresh(event) {
        this.getPaymentStatus();
        setTimeout(() => {
            this.refresher.complete();
        }, 2000);
    }

    goToLoanDetail() {
        this.app.getRootNav().push(FastLoanTabsPage, {selectedMchtCd: this.fastLoanApplyInfo.mchtCd});
    }
}

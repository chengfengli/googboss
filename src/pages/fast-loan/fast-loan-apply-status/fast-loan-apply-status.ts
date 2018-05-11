import {HudService} from "./../../../providers/hud-service";
import {FastLoanUnmarriedFillInformationPage} from "../fast-loan-unmarried-fill-information/fast-loan-unmarried-fill-information";
import {FastLoanMarriedFillInformationPage} from "../fast-loan-married-fill-information/fast-loan-married-fill-information";
import {Util} from "../../../utils/util";
import {FastLoanApplyInfo} from "../../../models/network/response/loan/fast-loan-apply-info";
import {Component} from "@angular/core";
import {NavParams, App} from "ionic-angular";
import {BasePage} from "../../base/base/base";
import {StubService} from "../../../requests/stub/stub-service";
import {FastLoanDeposit} from "../../../models/network/response/loan/fast-loan-deposit";
import {FastLoanService} from "../../../requests/loan/fast-loan-service";
import {FastLoanContractsPage} from "../fast-loan-contracts/fast-loan-contracts";
import {FastLoanDepositRequestInfo} from "../../../models/network/request/loan/fast-loan-deposit-request-info";
import {FastLoanApplyRequestInfo} from "../../../models/network/response/loan/fast-loan-apply-request-info";
import {ConfigService} from "../../../providers/config-service";
import {FastLoanMerchantListPage} from "../fast-loan-merchant-list/fast-loan-merchant-list";

/*
 Generated class for the FastLoanApplyStatus page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-fast-loan-apply-status',
    templateUrl: 'fast-loan-apply-status.html'
})
export class FastLoanApplyStatusPage extends BasePage {
    itemBg = 'assets/images/img/item_bg@2x.png';
    isCheck = false;
    fastLoanApplyInfo: FastLoanApplyInfo;
    fastLoanDeposit: FastLoanDeposit;
    signButtonDisabled = true;
    prevPage: string;

    constructor(public navParams: NavParams, public stubService: StubService, public fastLoanService: FastLoanService, public hudService: HudService, public app: App) {
        super(stubService);
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'FastLoanApplyStatusPage';
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

    ionViewDidLoad() {
        super.ionViewDidLoad();
        this.fastLoanApplyInfo = this.navParams.get('fastLoanApplyInfo');
    }

    ionViewDidEnter() {
        super.ionViewDidEnter();
        this.getFastLoanDeposit();
    }

    agree(event) {
        let oAgree = event.target;
        if (!this.isCheck) {
            oAgree.style.backgroundImage = "url(assets/images/img/choose@2x.png)";
            this.isCheck = true;
        } else {
            oAgree.style.backgroundImage = "url(assets/images/img/choose-none@2x.png)";
            this.isCheck = false;
        }
    }

    shouldShowSuccess(): boolean {
        if (!this.fastLoanApplyInfo) {
            return false;
        }
        if (this.fastLoanApplyInfo.applyStatus === FastLoanApplyInfo.ApplyStatus.REVIEW_PASSED) {
            return true;
        }
        return false;
    }

    shouldShowFail(): boolean {
        if (!this.fastLoanApplyInfo) {
            return false;
        }
        if (this.fastLoanApplyInfo.applyStatus === FastLoanApplyInfo.ApplyStatus.CALL_FAILED || this.fastLoanApplyInfo.applyStatus === FastLoanApplyInfo.ApplyStatus.PRE_ADUIT_REFUSED || this.fastLoanApplyInfo.applyStatus === FastLoanApplyInfo.ApplyStatus.ADUIT_REFUSED || this.fastLoanApplyInfo.applyStatus === FastLoanApplyInfo.ApplyStatus.REVIEW_REFUSED) {
            return true;
        }
        return false;
    }

    shouldShowInReview(): boolean {
        if (!this.fastLoanApplyInfo) {
            return false;
        }
        if (this.fastLoanApplyInfo.applyStatus === FastLoanApplyInfo.ApplyStatus.APPLYING || this.fastLoanApplyInfo.applyStatus === FastLoanApplyInfo.ApplyStatus.BIG_AMOUNT_REVIEW || this.fastLoanApplyInfo.applyStatus === FastLoanApplyInfo.ApplyStatus.PRE_ADUIT_PASSED || this.fastLoanApplyInfo.applyStatus === FastLoanApplyInfo.ApplyStatus.PRE_ADUIT_SPECIAL_REVIEW || this.fastLoanApplyInfo.applyStatus === FastLoanApplyInfo.ApplyStatus.ADUIT_PASSED || this.fastLoanApplyInfo.applyStatus === FastLoanApplyInfo.ApplyStatus.RULE_REVIEW || this.fastLoanApplyInfo.applyStatus === FastLoanApplyInfo.ApplyStatus.ADUIT_SPECIAL_REVIEW || this.fastLoanApplyInfo.applyStatus === FastLoanApplyInfo.ApplyStatus.INLEGAL_APPLY_REVIEW || this.fastLoanApplyInfo.applyStatus === FastLoanApplyInfo.ApplyStatus.CALL_FAILED) {
            return true;
        }
        return false;
    }

    shouldShowTimeOut(): boolean {
        if (!this.fastLoanApplyInfo) {
            return false;
        }
        if (this.fastLoanApplyInfo.applyStatus === FastLoanApplyInfo.ApplyStatus.SIGN_TIMEOUT) {
            return true;
        }
        return false;
    }

    popRoot() {
        if (this.prevPage === "home") {
            this.popToRoot();
        } else if (this.prevPage === "fastLoan") {
            this.popToRootNavRoot();
        }
    }

    getFastLoanDeposit() {
        if (this.fastLoanApplyInfo.applyStatus === FastLoanApplyInfo.ApplyStatus.REVIEW_PASSED) {
            this.fastLoanService.getFastLoanDeposit(new FastLoanDepositRequestInfo(this.fastLoanApplyInfo.tid), (fastLoanDeposit) => {
                if (Util.isNotNullOrUndefined(fastLoanDeposit)) {
                    this.fastLoanDeposit = fastLoanDeposit;
                    this.signButtonDisabled = false;
                }
            });
        }
    }

    goToFastLoanContracts() {
        this.push(FastLoanContractsPage, {fastLoanApplyRequestInfo: new FastLoanApplyRequestInfo(this.fastLoanApplyInfo.tid)});
    }

    goToSign() {
        if (!this.isCheck) {
            this.hudService.getToast('请确定您已阅读服务合同').present();
            return;
        }
        if (this.fastLoanApplyInfo.maritalStatus === '2') {
            this.push(FastLoanMarriedFillInformationPage, {fastLoanApplyInfo: this.fastLoanApplyInfo});
        } else {
            this.push(FastLoanUnmarriedFillInformationPage, {fastLoanApplyInfo: this.fastLoanApplyInfo});
        }
    }
}

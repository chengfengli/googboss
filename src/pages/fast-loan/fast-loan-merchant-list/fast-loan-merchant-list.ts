import {MerchantDetailInfoModalPage} from "./../../../components/merchant-detail-info-modal/merchant-detail-info-modal";
import {ForgetPwdFirstPage} from "./../../login/forget-pwd-first/forget-pwd-first";
import {UserMerchant} from "../../../models/merchant/user-merchant";
import {FastLoanMchtDeposit} from "../../../models/network/response/loan/fast-loan-mcht-deposit";
import {FastLoanService} from "../../../requests/loan/fast-loan-service";
import {Component, ViewChild, trigger, state, animate, transition, style, enableProdMode} from "@angular/core";
import {NavParams, Slides, ModalController, App} from "ionic-angular";
import {StubService} from "../../../requests/stub/stub-service";
import {PermissionPage} from "../../base/permission/permission";
import {HudService} from "../../../providers/hud-service";
import {UserData} from "../../../storages/user-data";
import {Util} from "../../../utils/util";
import {FastLoanBillingDetailsPage} from "../fast-loan-billing-details/fast-loan-billing-details";
import {FastLoanRepaymentPage} from "../fast-loan-repayment/fast-loan-repayment";
import {FastLoanDeposit} from "../../../models/network/response/loan/fast-loan-deposit";
import {FastLoanApplyStatusPage} from "../fast-loan-apply-status/fast-loan-apply-status";
import {EnterPwdModalPage} from "../../../components/enter-pwd-modal/enter-pwd-modal";
import {FastLoanLoanDemandPage} from "../fast-loan-demand/fast-loan-demand";
import {FastLoanOneKeyInfo} from "../../../models/network/request/loan/fast-loan-one-key-info";
import {ConfigService} from "../../../providers/config-service";
import {MerchantRequestInfo} from "../../../models/network/request/loan/merchant-request-info";
import {FastLoanUnavailablePage} from "../fast-loan-unavailable/fast-loan-unavailable";
import {LoanType} from "../../../enums/loan-type";
enableProdMode();

/*
 Generated class for the FastLoanMerchantList page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-fast-loan-merchant-list',
    templateUrl: 'fast-loan-merchant-list.html',
    animations: [
        trigger('slideState', [
            state('unactive', style({
                opacity: 0.5,
                transform: "scaleY(0.8)"
            })),
            state('active', style({
                opacity: 1,
                transform: "scaleY(1)"
            })),
            transition('unactive => active', animate('200ms ease-in')),
            transition('active => unactive', animate('200ms ease-out'))
        ])
    ]
})
export class FastLoanMerchantListPage extends PermissionPage {
    @ViewChild(Slides) slides: Slides;
    selectedMchtCd: string;
    currentFastLoanMchtDeposit: FastLoanMchtDeposit;
    static selectedFastLoanMchtDeposit: FastLoanMchtDeposit;
    fastLoanMchtDeposits: FastLoanMchtDeposit[] = [new FastLoanMchtDeposit()];
    selectedIndex = 0;
    boxWidth: any;
    nameWidth: any;

    constructor(public app: App, public modalCtrl: ModalController, public navParams: NavParams, public hudService: HudService, public userData: UserData, public stubService: StubService, public fastLoanService: FastLoanService) {
        super(stubService);
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'FastLoanMerchantListPage';
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        this.selectedMchtCd = this.navParams.get('selectedMchtCd');
        this.currentFastLoanMchtDeposit = this.navParams.get('currentFastLoanMchtDeposit');
        if (!Util.isNotNullOrUndefined(this.currentFastLoanMchtDeposit)) {
            this.currentFastLoanMchtDeposit = this.fastLoanMchtDeposits[0];
        }
        FastLoanMerchantListPage.selectedFastLoanMchtDeposit = this.currentFastLoanMchtDeposit;
    }

    ionViewWillEnter() {
        super.ionViewWillEnter();
    }

    ionViewDidEnter() {
        super.ionViewDidEnter();
        this.getDailyLoanDeposits();
        this.updateSlides();
    }

    ionViewWillLeave() {
        super.ionViewWillLeave()
    }

    updateSlides() {
        this.currentFastLoanMchtDeposit = this.fastLoanMchtDeposits[this.selectedIndex];
        FastLoanMerchantListPage.selectedFastLoanMchtDeposit = this.currentFastLoanMchtDeposit;
        this.slides.slideTo(this.selectedIndex);
    }

    slideChanged() {
        if (this.slides.getActiveIndex() === this.slides.length()) return false;
        let currentIndex = this.slides.getActiveIndex();
        this.currentFastLoanMchtDeposit = this.fastLoanMchtDeposits[currentIndex];
        FastLoanMerchantListPage.selectedFastLoanMchtDeposit = this.currentFastLoanMchtDeposit;
    }

    getDailyLoanDeposits() {
        this.fastLoanService.getPassedMchtLoan((fastLoanMchtDeposits) => {
            if (Util.isNotNullOrUndefined(fastLoanMchtDeposits)) {
                this.fastLoanMchtDeposits = fastLoanMchtDeposits;
                this.currentFastLoanMchtDeposit = this.fastLoanMchtDeposits[0];
                FastLoanMerchantListPage.selectedFastLoanMchtDeposit = this.currentFastLoanMchtDeposit;
                if (Util.isNotNullOrUndefined(this.selectedMchtCd)) {
                    this.fastLoanMchtDeposits.forEach((dailyLoanDeposit, index) => {
                        if (dailyLoanDeposit.mchtCd === this.selectedMchtCd) {
                            this.selectedIndex = index;
                            this.currentFastLoanMchtDeposit = this.fastLoanMchtDeposits[index];
                            FastLoanMerchantListPage.selectedFastLoanMchtDeposit = this.currentFastLoanMchtDeposit;
                            setTimeout(() => {
                                this.slides.slideTo(index);
                            }, 200);
                        }
                    });
                }
            }
        });
    }

    goToBillingDetails() {
        this.push(FastLoanBillingDetailsPage, {fastLoanMchtDeposit: this.currentFastLoanMchtDeposit});
    }

    gotoRepayment() {
        if (!Util.isNotNullOrUndefined(this.currentFastLoanMchtDeposit.applicationTid)) {
            this.hudService.getToast('数据有误，请刷新后再试').present();
            return;
        }
        this.push(FastLoanRepaymentPage, {fastLoanMchtDeposit: this.currentFastLoanMchtDeposit});
    }

    hasOverdue(): boolean {
        if (Util.isNotNullOrUndefined(this.currentFastLoanMchtDeposit)) {
            if (Util.isNotNullOrUndefined(this.currentFastLoanMchtDeposit.deposit)) {
                if (this.currentFastLoanMchtDeposit.deposit.overdueMaxTerm > 0) {
                    return true;
                }
            }
        }

        return false;
    }

    toogleSlideState(fastLoanMchtDeposit) {
        if (this.currentFastLoanMchtDeposit === fastLoanMchtDeposit) {
            return 'active';
        }
        return 'unactive';
    }

    popRoot() {
        this.popToRootNavRoot();
    }

    shouldShowDebtContent(fastLoanMchtDeposit: FastLoanMchtDeposit): boolean {
        if (this.shouldShowFinish(fastLoanMchtDeposit)) {
            return false;
        }
        if (!fastLoanMchtDeposit.payOff) {
            return true;
        }
        if (this.hasOverdue()) {
            return true;
        }
        return false;
    }

    shouldShowNoDebtContent(fastLoanMchtDeposit: FastLoanMchtDeposit): boolean {
        if (!this.shouldShowFinish(fastLoanMchtDeposit) && fastLoanMchtDeposit.payOff && !this.hasOverdue()) {
            return true;
        }
        return false;
    }

    shouldShowFinish(fastLoanMchtDeposit: FastLoanMchtDeposit): boolean {
        if (Util.isNotNullOrUndefined(fastLoanMchtDeposit)) {
            if (Util.isNotNullOrUndefined(fastLoanMchtDeposit.deposit)) {
                if (fastLoanMchtDeposit.deposit.loanStatus === FastLoanDeposit.LoanStatus.FINISH || fastLoanMchtDeposit.deposit.loanStatus === FastLoanDeposit.LoanStatus.TERMINATE) {
                    if (fastLoanMchtDeposit.deposit.curNeedRepayedTotalAmt && fastLoanMchtDeposit.deposit.curNeedRepayedTotalAmt > 0) {
                        return false;
                    }
                    return true;
                }
            }
        }
        return false;
    }

    shouldShowOneKey(): boolean {
        if (Util.isNotNullOrUndefined(this.currentFastLoanMchtDeposit)) {
            if (Util.isNotNullOrUndefined(this.currentFastLoanMchtDeposit.deposit)) {
                if (this.currentFastLoanMchtDeposit.qualifiedForOneKeyLoan) {
                    return true;
                }
            }
        }

        return false;
    }

    loanAgain(event: Event, fastLoanMchtDeposit: FastLoanMchtDeposit) {
        event.preventDefault();
        let merchantRequestInfo = new MerchantRequestInfo(fastLoanMchtDeposit.mchtCd);
        this.fastLoanService.isQualifiedForApply(merchantRequestInfo, result => {
            if (result.qualified) {
                this.push(FastLoanLoanDemandPage, {selectedMerchant: new UserMerchant(fastLoanMchtDeposit.mchtCd, fastLoanMchtDeposit.mchtName)});
            } else {
                this.push(FastLoanUnavailablePage, {errorMsg: result.errorMsg, loanType: LoanType.FastLoan});
            }
        });
    }

    showEnterPwd(fastLoanMchtDeposit: FastLoanMchtDeposit) {
        let myModal = this.modalCtrl.create(EnterPwdModalPage);
        myModal.onDidDismiss((passwordInfo) => {
            if (Util.isNotNullOrUndefined(passwordInfo) && passwordInfo.goForget) {
                setTimeout(() => {
                    this.push(ForgetPwdFirstPage, {mobile: passwordInfo.mobile});
                }, 500)
            } else {
                if (Util.isNotNullOrUndefined(passwordInfo)) {
                    let fastLoanOneKeyInfo = new FastLoanOneKeyInfo(passwordInfo.password, fastLoanMchtDeposit.mchtCd)
                    this.submitFastLoanApplication(fastLoanOneKeyInfo);
                }
            }
            this.shouldShowShade = false;
        });
        myModal.present();
        this.shouldShowShade = true;
    }

    oneKeyLoan(event: Event, fastLoanMchtDeposit: FastLoanMchtDeposit) {
        event.preventDefault();
        let merchantRequestInfo = new MerchantRequestInfo(fastLoanMchtDeposit.mchtCd);
        this.fastLoanService.isQualifiedForApply(merchantRequestInfo, result => {
            if (result.qualified) {
                this.showEnterPwd(fastLoanMchtDeposit);
            } else {
                this.push(FastLoanUnavailablePage, {errorMsg: result.errorMsg, loanType: LoanType.FastLoan});
            }
        });
    }

    submitFastLoanApplication(fastLoanOneKeyInfo: FastLoanOneKeyInfo) {
        this.fastLoanService.submitFastLoanOneKeyApplication(fastLoanOneKeyInfo, (fastLoanApplyInfo) => {
            if (Util.isNotNullOrUndefined(fastLoanApplyInfo)) {
                this.push(FastLoanApplyStatusPage, {fastLoanApplyInfo: fastLoanApplyInfo});
            }
        });
    }

    showMchtName(i) {
        this.boxWidth = document.querySelector(".merchant-name-box");
        this.nameWidth = document.querySelectorAll(".my-merchant-name");
        if (this.nameWidth[i].offsetWidth >= (this.boxWidth.offsetWidth - 30)) {
            return true;
        } else {
            return false;
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

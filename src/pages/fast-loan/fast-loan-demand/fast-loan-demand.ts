import {MerchantDetailInfoModalPage} from "./../../../components/merchant-detail-info-modal/merchant-detail-info-modal";
import {LoanType} from "../../../enums/loan-type";
import {FastLoanService} from "./../../../requests/loan/fast-loan-service";
import {FastLoanRequestInfo} from "./../../../models/network/request/loan/fast-loan-request-info";
import {FAST_LOAN} from "./../../../constants/constants";
import {FastLoanPerfectInfoPage} from "../fast-loan-perfect-info/fast-loan-perfect-info";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Component, ElementRef} from "@angular/core";
import {NavParams, Events, ModalController} from "ionic-angular";
import {StubService} from "../../../requests/stub/stub-service";
import {BasePage} from "../../base/base/base";
import {Util} from "../../../utils/util";
import {MerchantRequestInfo} from "../../../models/network/request/loan/merchant-request-info";
import {MerchantService} from "../../../requests/merchant/merchant-service";
import {UserMerchant} from "../../../models/merchant/user-merchant";
import {HudService} from "../../../providers/hud-service";
import {ConfigService} from "../../../providers/config-service";
import {MerchantInfoPage} from "../../profile/merchant-info/merchant-info";

/*
 Generated class for the FastLoanLoanDemand page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-fast-loan-loan-demand',
    templateUrl: 'fast-loan-demand.html'
})
export class FastLoanLoanDemandPage extends BasePage {
    loanForm: FormGroup;
    myExtraBankNo = "";
    bankNo: string;
    merchant: UserMerchant;
    repaymentTypes: Array<any>;
    terms: Array<any>;
    nowRepayMent = "";
    nowDeadLine = "";
    inputNow: boolean;

    constructor(public events: Events, public configService: ConfigService, public hudService: HudService, public merchantService: MerchantService, public navParams: NavParams, public stubService: StubService, private formBuilder: FormBuilder, public util: Util, public fastLoanService: FastLoanService, public el: ElementRef, public modalCtrl: ModalController) {
        super(stubService);
        this.loanForm = this.formBuilder.group({
            loanAmount: ['', Validators.required],
            deadline: ['', Validators.required],
            repayment: ['', Validators.required]
        });
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'FastLoanLoanDemandPage';
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        this.merchant = this.navParams.get('selectedMerchant');
        this.getDefaultMerchant();
        this.terms = this.configService.getFastLoanTerms();
        this.repaymentTypes = this.configService.getFastLoanRepaymentTypes();
        this.events.subscribe('merchant:selected', (merchant) => {
            if (!Util.isEqualsValue(this.merchant, merchant)) {
                this.merchant = merchant;
                this.myExtraBankNo = '';
                this.bankNo = ''
                this.getMchtStlmBank();
            }
        });
    }

    ionViewWillUnload() {
        super.ionViewWillUnload();
        this.events.unsubscribe('merchant:selected');
    }

    ionViewDidEnter() {
        super.ionViewDidEnter();
    }

    shouldShowMerchantInfo() {
        if (Util.isNotNullOrUndefined(this.merchant)) {
            return true;
        }
        return false;
    }

    goMerchantList() {
        this.push(MerchantInfoPage, {isSelect: true, loanType: LoanType.FastLoan});
    }

    getDefaultMerchant() {
        if (!Util.isNotNullOrUndefined(this.merchant)) {
            this.fastLoanService.listQualifiedMerchants(merchants => {
                if (Util.isNotNullOrUndefined(merchants) && merchants.length !== 0) {
                    if (merchants.length === 1) {
                        this.merchant = merchants[0];
                        this.getMchtStlmBank();
                    }
                }
            });
        } else {
            this.getMchtStlmBank();
            if (!this.merchant.preCredit) {
                this.fastLoanService.listQualifiedMerchants(merchants => {
                    if (Util.isNotNullOrUndefined(merchants) && merchants.length !== 0) {
                        merchants.forEach((userMerchant, index) => {
                            if (this.merchant.mchtCd === userMerchant.mchtCd) {
                                this.merchant.preCredit = userMerchant.preCredit;
                            }
                        });
                    }
                });
            }
        }
    }

    getMchtStlmBank() {
        let merchantInfo = new MerchantRequestInfo(this.merchant.mchtCd);
        this.merchantService.getMchtStlmBank(merchantInfo, (bankNo) => {
            this.bankNo = bankNo;
        });
    }

    importNum(event) {
        // event.stopPropagation();
        // event.preventDefault();
        // this.myExtraBankNo = this.myExtraBankNo0 + this.myExtraBankNo1 + this.myExtraBankNo2 + this.myExtraBankNo3;
        // let aInputs = this.el.nativeElement.querySelectorAll(".account-box .account-num");
        // if (this.myExtraBankNo.length === 4) {
        //     aInputs[3].focus();
        //     return false;
        // }
        // for (let i = 0; i < aInputs.length; i++) {
        //     if (this.myExtraBankNo.length === i) {
        //         aInputs[i].focus();
        //         return false;
        //     }
        // }
        this.myExtraBankNo = this.myExtraBankNo.replace(/\s/g, "");
        if (this.myExtraBankNo.length === 4) {
            event.target.blur();
        }
    }

    accountFocus() {
        this.el.nativeElement.querySelector("#account-num input").focus();
    }

    // deleteNum(event) {
    //     if (event.keyCode === 8) {
    //         let nowBankNo = this.myExtraBankNo0 + this.myExtraBankNo1 + this.myExtraBankNo2 + this.myExtraBankNo3;
    //         if (nowBankNo.length !== 4 && nowBankNo.length !== 0) {
    //             this.myExtraBankNo = nowBankNo.substring(0, nowBankNo.length - 1);
    //             let aInputs = this.el.nativeElement.querySelectorAll(".account-box .account-num");
    //             for (let i = 0; i < aInputs.length; i++) {
    //                 if (this.myExtraBankNo.length === i) {
    //                     aInputs[i].focus();
    //                     break;
    //                 }
    //             }
    //         }
    //     }
    // }
    goNext() {
        if (!Util.isNotNullOrUndefined(this.merchant)) {
            this.hudService.getToast('请选择商户').present();
            return;
        }
        if (this.myExtraBankNo === '' || this.myExtraBankNo.length !== 4) {
            this.hudService.getToast('请填写放款账户后四位').present();
            return;
        }

        if (this.bankNo.slice(-4) !== this.myExtraBankNo) {
            this.hudService.getToast('放款账户后四位不正确').present();
            return;
        }

        this.util.checkFormValid(this.loanForm);
        if (!this.loanForm.valid) {
            return;
        }

        let formValue = this.loanForm.value;
        if (isNaN(parseFloat(formValue.loanAmount))) {
            this.hudService.getToast('贷款金额必须为数字').present();
            return;
        }

        if (parseFloat(formValue.loanAmount) > this.merchant.preCredit) {
            this.hudService.getToast('贷款金额必须小于或等于' + this.merchant.preCredit).present();
            return;
        }

        if (parseFloat(formValue.loanAmount) < FAST_LOAN.MIN_CREDIT) {
            this.hudService.getToast('贷款金额必须大于或等于' + FAST_LOAN.MIN_CREDIT).present();
            return;
        }

        if (parseFloat(formValue.loanAmount) % FAST_LOAN.MULTIPLES !== 0) {
            this.hudService.getToast('贷款金额必须为1千的倍数').present();
            return;
        }

        let fastLoanRequestInfo = new FastLoanRequestInfo();
        fastLoanRequestInfo.bankAccount = this.bankNo;
        fastLoanRequestInfo.loanAmount = formValue.loanAmount;
        fastLoanRequestInfo.mchtCd = this.merchant.mchtCd;
        fastLoanRequestInfo.mchtName = this.merchant.mchtName;
        fastLoanRequestInfo.loanDuration = formValue.deadline;
        fastLoanRequestInfo.paymentType = formValue.repayment;
        console.log(fastLoanRequestInfo);

        if (fastLoanRequestInfo.loanDuration === '12') {
            if (fastLoanRequestInfo.paymentType !== 'D') {
                this.hudService.getToast('贷款期限为12个月还款方式必须为日还').present();
                return;
            }
        }

        this.push(FastLoanPerfectInfoPage, {fastLoanRequestInfo: fastLoanRequestInfo});
    }

    changeDeadline(event) {
        this.nowDeadLine = event;
        if (this.nowDeadLine === "12") {
            this.nowRepayMent = "D";
        } else {
            this.nowRepayMent = "";
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

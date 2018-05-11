import { MerchantDetailInfoModalPage } from './../../../components/merchant-detail-info-modal/merchant-detail-info-modal';
import {Util} from "./../../../utils/util";
import {ForgetPwdFirstPage} from "./../../login/forget-pwd-first/forget-pwd-first";
import {MerchantRequestInfo} from "./../../../models/network/request/loan/merchant-request-info";
import {FastLoanService} from "./../../../requests/loan/fast-loan-service";
import {ConfigService} from "./../../../providers/config-service";
import {FAST_LOAN} from "./../../../constants/constants";
import {HudService} from "./../../../providers/hud-service";
import {RepaymentInfo} from "./../../../models/network/request/loan/repayment-info";
import {RepaymentService} from "./../../../requests/loan/repayment-service";
import {Component} from "@angular/core";
import {NavParams, ModalController, App} from "ionic-angular";
import {BasePage} from "../../base/base/base";
import {StubService} from "../../../requests/stub/stub-service";
import {ChoosePaymentModalPage} from "../../../components/choose-payment-modal/choose-payment-modal";
import {FastLoanMchtDeposit} from "../../../models/network/response/loan/fast-loan-mcht-deposit";
import {PaymentType} from "../../../enums/payment-type";
import {EnterPwdModalPage} from "../../../components/enter-pwd-modal/enter-pwd-modal";
import {BrowserPage} from "../../../components/browser/browser";
import {FastLoanRealtimePayment} from "../../../models/network/response/loan/fast-loan-realtime-payment";

/*
 Generated class for the FastLoanRepayment page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-fast-loan-repayment',
    templateUrl: 'fast-loan-repayment.html'
})
export class FastLoanRepaymentPage extends BasePage {
    fastLoanMchtDeposit: FastLoanMchtDeposit;
    repaymentAmount: string;
    paymentType: PaymentType;
    fastLoanRealtimePayment: FastLoanRealtimePayment;
    nowRepaymentMethod: string;

    constructor(public app: App, public fastLoanService: FastLoanService, public configService: ConfigService, public navParams: NavParams, public stubService: StubService, public modalCtrl: ModalController, public repaymentService: RepaymentService, public hudService: HudService) {
        super(stubService);
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        this.fastLoanMchtDeposit = this.navParams.get('fastLoanMchtDeposit');
        console.log(this.fastLoanMchtDeposit);
    }

    ionViewDidEnter() {
        super.ionViewDidEnter();

        this.beginRefresh();
    }

    toogleFullRepayment() {
        this.nowRepaymentMethod = "full";
        this.repaymentAmount = this.fastLoanRealtimePayment.leftPayAmt + '';
    }

    shouldShowDetail(fastLoanRealtimePayment: FastLoanRealtimePayment) {
        if (Util.isNotNullOrUndefined(fastLoanRealtimePayment) && Util.isNotNullOrUndefined(fastLoanRealtimePayment.posPayAmt)) {
            if (fastLoanRealtimePayment.posPayAmt === -1) {
                return true;
            }
        }

        return false;
    }

    beginRefresh() {
        this.refresher._beginRefresh();
    }

    changeAmount() {
        if (this.repaymentAmount === this.fastLoanRealtimePayment.leftPayAmt.toString()) {
            this.nowRepaymentMethod = "full";
        } else if (this.repaymentAmount === this.fastLoanMchtDeposit.deposit.ctdLowRepaymentAmt.toString()) {
            this.nowRepaymentMethod = "minimum";
        } else {
            this.nowRepaymentMethod = "";
        }
    }

    toogleMinimumPayment() {
        this.nowRepaymentMethod = "minimum";
        this.repaymentAmount = this.fastLoanMchtDeposit.deposit.ctdLowRepaymentAmt + '';
    }

    doRefresh(refresher) {
        let merchantRequestInfo = new MerchantRequestInfo(this.fastLoanMchtDeposit.mchtCd);
        this.fastLoanService.getRealtimePayment(merchantRequestInfo, fastLoanRealtimePayment => {
            refresher.complete();
            if (Util.isNotNullOrUndefined(fastLoanRealtimePayment)) {
                this.fastLoanRealtimePayment = fastLoanRealtimePayment;
            } else {
                let toast = this.hudService.getToast('服务异常，请稍后再试');
                toast.onDidDismiss(() => {
                    this.pop();
                });
                toast.present();
            }
        });
    }

    gotoRepayment() {
        if (!Util.isNotNullOrUndefined(this.repaymentAmount) || isNaN(parseFloat(this.repaymentAmount))) {
            this.hudService.getToast('请输入还款金额').present();
            return;
        }

        if (parseFloat(this.repaymentAmount) > FAST_LOAN.MAXIMUM_REPAYMENT_ALLOWANCE) {
            this.hudService.getToast('还款金额不能大于' + FAST_LOAN.MAXIMUM_REPAYMENT_ALLOWANCE).present();
            return;
        }

        if (parseFloat(this.repaymentAmount) > this.fastLoanRealtimePayment.leftPayAmt) {
            this.hudService.getToast('').present();
            this.hudService.getAlert('提示', '您输入的还款金额大于剩余还款额，多出部分将作为溢缴款于次日返还', [
                {
                    text: '确定还款',
                    handler: () => {
                        this.choosePaymentType();
                    }
                },
                {
                    text: '返回修改',
                    handler: () => {
                    }
                }
            ]).present();
        } else {
            this.choosePaymentType();
        }
    }

    choosePaymentType() {
        let enterPwdModal = this.modalCtrl.create(ChoosePaymentModalPage);
        enterPwdModal.onDidDismiss((data: PaymentType) => {
            this.shouldShowShade = false;
            if (Util.isNotNullOrUndefined((data))) {
                this.paymentType = data;
                this.showEnterPwd();
            }
        });
        enterPwdModal.present();
        this.shouldShowShade = true;
    }

    showEnterPwd() {
        let myModal = this.modalCtrl.create(EnterPwdModalPage);
        myModal.onDidDismiss((passwordInfo) => {
            this.shouldShowShade = false;
            if (Util.isNotNullOrUndefined(passwordInfo) && passwordInfo.goForget) {
                setTimeout(() => {
                    this.push(ForgetPwdFirstPage, {mobile: passwordInfo.mobile});
                }, 500)
            } else {
                if (Util.isNotNullOrUndefined(passwordInfo)) {
                    if (this.paymentType === PaymentType.Tong) {
                        this.goToAllinpayTongURL();
                    } else if (this.paymentType === PaymentType.Wallet) {
                        this.goToAllinpayWalletURL();
                    }
                }
            }
        });
        myModal.present();
        this.shouldShowShade = true;
    }

    goToAllinpayWalletURL() {
        let repaymentInfo = new RepaymentInfo(this.repaymentAmount, this.fastLoanMchtDeposit.applicationTid);
        this.repaymentService.getAllinpayWalletURL(repaymentInfo, paymentUrl => {
            this.push(BrowserPage, {
                browser: {
                    title: '还款',
                    url: paymentUrl
                }
            });
        });
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'FastLoanRepaymentPage';
    }

    goToAllinpayTongURL() {
        let repaymentInfo = new RepaymentInfo(this.repaymentAmount, this.fastLoanMchtDeposit.applicationTid);

        this.repaymentService.getgetAllinpayTongUrl(repaymentInfo, allinpayTongResultInfo => {
            if (allinpayTongResultInfo) {
                let allinpay = (<any>window).plugins.allinpay;
                allinpay.pay([allinpayTongResultInfo], () => {
                    this.beginRefresh();
                }, () => {
                    this.beginRefresh();
                });
            }
        });
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

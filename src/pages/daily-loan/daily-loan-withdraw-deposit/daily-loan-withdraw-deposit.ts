import {MerchantDetailInfoModalPage} from "./../../../components/merchant-detail-info-modal/merchant-detail-info-modal";
import {ForgetPwdFirstPage} from "./../../login/forget-pwd-first/forget-pwd-first";
import {WithdrawInfo} from "../../../models/network/request/loan/withdraw-info";
import {DailyLoanWithdrawFailPage} from "../daily-loan-withdraw-fail/daily-loan-withdraw-fail";
import {DailyLoanWithdrawSuccessPage} from "../daily-loan-withdraw-success/daily-loan-withdraw-success";
import {DailyLoanService} from "../../../requests/loan/daily-loan-service";
import {Util} from "../../../utils/util";
import {PermissionPage} from "../../base/permission/permission";
import {StubService} from "../../../requests/stub/stub-service";
import {UserData} from "../../../storages/user-data";
import {HudService} from "../../../providers/hud-service";
import {EnterPwdModalPage} from "../../../components/enter-pwd-modal/enter-pwd-modal";
import {Component} from "@angular/core";
import {NavParams, ModalController} from "ionic-angular";
import {MerchantService} from "../../../requests/merchant/merchant-service";
import {MerchantRequestInfo} from "../../../models/network/request/loan/merchant-request-info";
import {DailyLoanDeposit} from "../../../models/network/response/loan/daily-loan-deposit";
import {DailyLoanWithdrawResult} from "../../../models/network/request/loan/daily-loan-withdraw-result";
import {ConfigService} from "../../../providers/config-service";

/*
 Generated class for the TtrWithdrawDeposit page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-daily-loan-withdraw-deposit',
    templateUrl: 'daily-loan-withdraw-deposit.html'
})
export class DailyLoanWithdrawDepositPage extends PermissionPage {
    bankNo: string = '';
    dailyLoanDeposit: DailyLoanDeposit;
    withdrawAmt: string;
    password: string;

    constructor(public navParams: NavParams, public hudService: HudService, public userData: UserData, public stubService: StubService, public modalCtrl: ModalController, public merchantService: MerchantService, public dailyLoanService: DailyLoanService) {
        super(stubService);
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'DailyLoanWithdrawDepositPage';
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        this.dailyLoanDeposit = this.navParams.get('dailyLoanDeposit');
    }

    ionViewWillEnter() {
        super.ionViewWillEnter();
        this.getBankNo();
    }

    enterPwd() {
        let enterPwdModal = this.modalCtrl.create(EnterPwdModalPage);
        enterPwdModal.onDidDismiss((passwordInfo) => {
            this.shouldShowShade = false;
            if (Util.isNotNullOrUndefined(passwordInfo) && passwordInfo.goForget) {
                setTimeout(() => {
                    this.push(ForgetPwdFirstPage, {mobile: passwordInfo.mobile});
                }, 500)
            } else {
                if (Util.isNotNullOrUndefined(passwordInfo)) {
                    this.password = passwordInfo.password;
                    this.submitWithdraw(new WithdrawInfo(this.dailyLoanDeposit.mchtCd, this.withdrawAmt, this.password));
                }
            }
        });
        enterPwdModal.present();
        this.shouldShowShade = true;
    }

    withDraw() {
        if (!Util.isNotNullOrUndefined(this.withdrawAmt) || isNaN(parseFloat(this.withdrawAmt))) {
            this.hudService.getToast('请输入提现金额').present();
            return;
        }

        if (parseFloat(this.withdrawAmt) > this.dailyLoanDeposit.withDrawalsAllowoAmt) {
            this.hudService.getToast('提现金额不能大于可提现金额' + this.dailyLoanDeposit.withDrawalsAllowoAmt).present();
            return;
        }

        if (parseFloat(this.withdrawAmt) < this.dailyLoanDeposit.singleAmt) {
            this.hudService.getToast('提现金额不能小于单笔最小额度' + this.dailyLoanDeposit.singleAmt).present();
            return;
        }

        this.enterPwd();
    }

    getBankNo() {
        this.merchantService.getMchtStlmBank(new MerchantRequestInfo(this.dailyLoanDeposit.mchtCd), (bankNo) => {
            this.bankNo = bankNo;
        });
    }

    withdrawAllAmt() {
        this.withdrawAmt = this.dailyLoanDeposit.withDrawalsAllowoAmt + '';
    }

    submitWithdraw(withdrawInfo: WithdrawInfo) {
        this.dailyLoanService.submitWithdraw(withdrawInfo, (dailyLoanWithdrawResult: DailyLoanWithdrawResult) => {
            if (Util.isNotNullOrUndefined(dailyLoanWithdrawResult)) {
                if (dailyLoanWithdrawResult.isSuccess === 'Y') {
                    this.push(DailyLoanWithdrawSuccessPage, {
                        withdrawAmt: this.withdrawAmt,
                        bankNo: this.bankNo,
                        selectedMchtCd: this.dailyLoanDeposit.mchtCd
                    });
                } else if (dailyLoanWithdrawResult.isSuccess === 'N') {
                    this.push(DailyLoanWithdrawFailPage, {failReason: dailyLoanWithdrawResult.failReason});
                }
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

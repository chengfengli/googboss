import {ForgetPwdFirstPage} from "./../../login/forget-pwd-first/forget-pwd-first";
import {MyValidators} from "./../../../validators/my-validators";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Component} from "@angular/core";
import {NavParams, ModalController} from "ionic-angular";
import {StubService} from "../../../requests/stub/stub-service";
import {BasePage} from "../../base/base/base";
import {ConfigService} from "../../../providers/config-service";
import {HudService} from "../../../providers/hud-service";
import {FastLoanApplyInfo} from "../../../models/network/response/loan/fast-loan-apply-info";
import {FastLoanRequestExtraInfo} from "../../../models/network/request/loan/fast-loan-request-extra-info";
import {FastLoanService} from "../../../requests/loan/fast-loan-service";
import {FastLoanDeposit} from "../../../models/network/response/loan/fast-loan-deposit";
import {GetMoneySuccessPage} from "../fast-loan-get-money-success/fast-loan-get-money-success";
import {GetMoneyStatusPage} from "../fast-loan-get-money-status/fast-loan-get-money-status";
import {Util} from "../../../utils/util";
import {EnterPwdModalPage} from "../../../components/enter-pwd-modal/enter-pwd-modal";

/*
 Generated class for the FastLoanMarriedFillInformation page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-fast-loan-married-fill-information',
    templateUrl: 'fast-loan-married-fill-information.html'
})
export class FastLoanMarriedFillInformationPage extends BasePage {
    myForm: FormGroup;
    cardTypes: Array<any>;
    houseTypes: Array<any>;
    fastLoanApplyInfo: FastLoanApplyInfo;
    spouseAddress: string;

    constructor(public modalCtrl: ModalController, public hudService: HudService, public navParams: NavParams, public stubService: StubService, public configService: ConfigService, private formBuilder: FormBuilder, public fastLoanService: FastLoanService, public util: Util) {
        super(stubService);
        this.myForm = this.formBuilder.group({
            spouseName: ['', Validators.required],
            spouseCardType: ['', Validators.required],
            spouseCardNum: ['', Validators.required],
            spousePhoneNum: ['', MyValidators.getPhoneValidators()],
            marryBorrowerAddress: ['', Validators.required],
            spouseAddress: ['', Validators.required],
            spouseLiveNature: ['', Validators.required]
        });
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'FastLoanMarriedFillInformationPage';
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        this.cardTypes = this.configService.getIdCardTypes();
        this.houseTypes = this.configService.getHouseTypes();
        this.fastLoanApplyInfo = this.navParams.get('fastLoanApplyInfo');
    }

    setSpouseAddressSame() {
        let borrowerAddressControl = this.myForm.get('marryBorrowerAddress');
        this.spouseAddress = borrowerAddressControl.value;
    }

    goToSign() {
        this.util.checkFormValid(this.myForm);
        if (!this.myForm.valid) {
            return;
        }
        if (this.myForm.get('spouseCardType').value === "I") {
            if (!this.IdentityCodeValid(this.myForm.get("spouseCardNum").value)) {
                return
            }
        }
        this.showEnterPwd();
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
                    let formValue = this.myForm.value;
                    let fastLoanRequestExtraInfo = new FastLoanRequestExtraInfo(passwordInfo.password, parseInt(this.fastLoanApplyInfo.tid), formValue.spouseName,
                        FastLoanRequestExtraInfo.RelativeRelation.SPOUSE, formValue.spousePhoneNum, formValue.marryBorrowerAddress, formValue.spouseCardType, formValue.spouseCardNum, formValue.spouseAddress, formValue.spouseLiveNature);
                    this.signContract(fastLoanRequestExtraInfo);
                }
            }
        });
        myModal.present();
        this.shouldShowShade = true;
    }

    signContract(fastLoanRequestExtraInfo: FastLoanRequestExtraInfo) {
        this.fastLoanService.signContract(fastLoanRequestExtraInfo, (fastLoanApplyInfo) => {
            if (fastLoanApplyInfo.loanCashedStatus === FastLoanDeposit.LoanAuditStatus.PAYMENT_FAILED) {
                this.push(GetMoneyStatusPage, {fastLoanApplyInfo: fastLoanApplyInfo});
            } else {
                this.push(GetMoneySuccessPage, {fastLoanApplyInfo: fastLoanApplyInfo});
            }
        });
    }

    IdentityCodeValid(code): boolean {
        let tip = "";
        let pass = true;

        if (!code || !/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/i.test(code)) {
            tip = "您输入的身份证号格式错误";
            pass = false;
        }
        if (!pass) {
            this.hudService.getToast(tip).present();
        }
        ;
        return pass;
    }
}

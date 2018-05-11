import {ForgetPwdFirstPage} from "./../../login/forget-pwd-first/forget-pwd-first";
import {MyValidators} from "./../../../validators/my-validators";
import {Component} from "@angular/core";
import {NavParams, ModalController} from "ionic-angular";
import {BasePage} from "../../base/base/base";
import {StubService} from "../../../requests/stub/stub-service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Util} from "../../../utils/util";
import {FastLoanApplyInfo} from "../../../models/network/response/loan/fast-loan-apply-info";
import {FastLoanRequestExtraInfo} from "../../../models/network/request/loan/fast-loan-request-extra-info";
import {ConfigService} from "../../../providers/config-service";
import {FastLoanService} from "../../../requests/loan/fast-loan-service";
import {FastLoanDeposit} from "../../../models/network/response/loan/fast-loan-deposit";
import {GetMoneySuccessPage} from "../fast-loan-get-money-success/fast-loan-get-money-success";
import {GetMoneyStatusPage} from "../fast-loan-get-money-status/fast-loan-get-money-status";
import {EnterPwdModalPage} from "../../../components/enter-pwd-modal/enter-pwd-modal";

/*
 Generated class for the FastLoanUnmarriedFillInformation page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-fast-loan-unmarried-fill-information',
    templateUrl: 'fast-loan-unmarried-fill-information.html'
})
export class FastLoanUnmarriedFillInformationPage extends BasePage {

    myForm: FormGroup;
    relationTypes: Array<any>;
    fastLoanApplyInfo: FastLoanApplyInfo;

    constructor(public util: Util, public modalCtrl: ModalController, public configService: ConfigService, public fastLoanService: FastLoanService, public navParams: NavParams, public stubService: StubService, private formBuilder: FormBuilder) {
        super(stubService);
        this.myForm = this.formBuilder.group({
            kinsfolkName: ['', Validators.required],
            kinsfolkPhoneNum: ['', MyValidators.getPhoneValidators()],
            kinsfolkRelationship: ['', Validators.required],
            borrowerAddress: ['', Validators.required]
        });
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        this.relationTypes = this.configService.getRelationTypes();
        this.fastLoanApplyInfo = this.navParams.get('fastLoanApplyInfo');
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'FastLoanUnmarriedFillInformationPage';
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
                    let fastLoanRequestExtraInfo = new FastLoanRequestExtraInfo(passwordInfo.password, parseInt(this.fastLoanApplyInfo.tid), formValue.kinsfolkName,
                        formValue.kinsfolkRelationship, formValue.kinsfolkPhoneNum, formValue.borrowerAddress);
                    this.signContract(fastLoanRequestExtraInfo);
                }
            }
        });
        myModal.present();
        this.shouldShowShade = true;
    }

    goToSign() {
        this.util.checkFormValid(this.myForm);
        if (!this.myForm.valid) {
            return;
        }
        this.showEnterPwd();
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
}

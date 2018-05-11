import {ForgetPwdFirstPage} from "./../../login/forget-pwd-first/forget-pwd-first";
import {Component} from "@angular/core";
import {NavParams, ModalController} from "ionic-angular";
import {BasePage} from "../../base/base/base";
import {StubService} from "../../../requests/stub/stub-service";
import {FastLoanRequestInfo} from "../../../models/network/request/loan/fast-loan-request-info";
import {EnterPwdModalPage} from "../../../components/enter-pwd-modal/enter-pwd-modal";
import {FastLoanApplyStatusPage} from "../fast-loan-apply-status/fast-loan-apply-status";
import {Util} from "../../../utils/util";
import {FastLoanService} from "../../../requests/loan/fast-loan-service";
import {ConfigService} from "../../../providers/config-service";

/*
 Generated class for the FastLoanApplyInfoPreview page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-fast-loan-apply-info-preview',
    templateUrl: 'fast-loan-apply-info-preview.html'
})
export class FastLoanApplyInfoPreviewPage extends BasePage {
    itemBg = 'assets/images/img/item_bg@2x.png'
    fastLoanRequestInfo: FastLoanRequestInfo;

    constructor(public fastLoanService: FastLoanService, public modalCtrl: ModalController, public navParams: NavParams, public stubService: StubService) {
        super(stubService);
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        this.fastLoanRequestInfo = this.navParams.get('fastLoanRequestInfo');
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'FastLoanApplyInfoPreviewPage';
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
                    this.fastLoanRequestInfo.password = passwordInfo.password;
                    this.submitFastLoanApplication();
                }
            }
        });
        myModal.present();
        this.shouldShowShade = true;
    }

    goBack() {
        this.pop();
    }

    submitFastLoanApplication() {
        this.fastLoanService.submitFastLoanApplication(this.fastLoanRequestInfo, (fastLoanApplyInfo) => {
            if (Util.isNotNullOrUndefined(fastLoanApplyInfo)) {
                this.push(FastLoanApplyStatusPage, {fastLoanApplyInfo: fastLoanApplyInfo});
            }
        });
    }
}

import {FastLoanApplyInfoPreviewPage} from "../fast-loan-apply-info-preview/fast-loan-apply-info-preview";
import {NavParams} from "ionic-angular";
import {FastLoanRequestInfo} from "./../../../models/network/request/loan/fast-loan-request-info";
import {UserData} from "../../../storages/user-data";
import {HudService} from "../../../providers/hud-service";
import {PermissionPage} from "./../../base/permission/permission";
import {Component} from "@angular/core";
import {StubService} from "./../../../requests/stub/stub-service";
import {ConfigService} from "../../../providers/config-service";

/*
 Generated class for the IdAuthentication page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-fast-loan-perfect-info',
    templateUrl: 'fast-loan-perfect-info.html'
})
export class FastLoanPerfectInfoPage extends PermissionPage {
    eduState = 0;
    marriedState = 0;
    housingState = 0;
    fastLoanRequestInfo: FastLoanRequestInfo;

    constructor(public navParams: NavParams, public hudService: HudService, public userData: UserData, public stubService: StubService) {
        super(stubService);

    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        this.fastLoanRequestInfo = this.navParams.get('fastLoanRequestInfo');
    }

    chooseEdu($event) {
        this.eduState = $event.target.getAttribute('eduState');
    }

    chooseMarried($event) {
        this.marriedState = $event.target.getAttribute('marriedState');
    }

    chooseHousing($event) {
        this.housingState = $event.target.getAttribute('housingState');
    }

    submitApply() {
        if (this.eduState === 0 || this.marriedState === 0 || this.housingState === 0) {
            this.hudService.getToast('请完善资料').present();
            return;
        }
        this.fastLoanRequestInfo.eduLevel = this.eduState + '';
        this.fastLoanRequestInfo.maritalStatus = this.marriedState + '';
        this.fastLoanRequestInfo.houseStatus = this.housingState + '';
        this.push(FastLoanApplyInfoPreviewPage, {fastLoanRequestInfo: this.fastLoanRequestInfo});
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'FastLoanPerfectInfoPage';
    }

}

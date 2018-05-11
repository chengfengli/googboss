import {FastLoanService} from "./../../../requests/loan/fast-loan-service";
import {PermissionPage} from "./../../base/permission/permission";
import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";
import {StubService} from "../../../requests/stub/stub-service";
import {FastLoanApplyRequestInfo} from "../../../models/network/response/loan/fast-loan-apply-request-info";
import {FastLoanContractInfo} from "../../../models/network/response/loan/fast-loan-contract-info";
import {ConfigService} from "../../../providers/config-service";

/*
 Generated class for the FastLoanContracts page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-fast-loan-contracts',
    templateUrl: 'fast-loan-contracts.html'
})
export class FastLoanContractsPage extends PermissionPage {
    fastLoanApplyRequestInfo: FastLoanApplyRequestInfo;
    fastLoanContractInfo: FastLoanContractInfo;

    constructor(public navParams: NavParams, public stubService: StubService, public fastLoanService: FastLoanService) {
        super(stubService);
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        console.log('ionViewDidLoad FastLoanContractsPage');
        this.fastLoanApplyRequestInfo = this.navParams.get('fastLoanApplyRequestInfo');
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'FastLoanContractsPage';
    }

    ionViewDidEnter() {
        super.ionViewDidEnter();
        this.getContactInfo();

    }

    getContactInfo() {
        this.fastLoanService.getFastLoanSignContractInfo(this.fastLoanApplyRequestInfo, fastLoanContractInfo => {
            this.fastLoanContractInfo = fastLoanContractInfo;
        });
    }

}

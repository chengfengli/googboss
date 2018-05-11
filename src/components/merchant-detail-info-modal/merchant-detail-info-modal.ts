import {NavParams, ViewController} from "ionic-angular";
import {Component} from "@angular/core";
import {PermissionPage} from "../../pages/base/permission/permission";
import {StubService} from "../../requests/stub/stub-service";
import {ConfigService} from "../../providers/config-service";

/*
 Generated class for the MerchantDetailInfoModalPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-merchant-detail-info-modal',
    templateUrl: 'merchant-detail-info-modal.html'
})
export class MerchantDetailInfoModalPage extends PermissionPage {
    mchtName: string;
    mchtCd: string;

    constructor(public stubService: StubService, public viewCtrl: ViewController, public params: NavParams) {
        super(stubService);
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        this.mchtName = this.params.get("mchtName");
        this.mchtCd = this.params.get("mchtCd");
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'MerchantDetailInfoModalPage';
    }

    closeModal() {
        this.viewCtrl.dismiss();
    }
}

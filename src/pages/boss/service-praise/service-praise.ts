import {ConfigService} from "./../../../providers/config-service";
import {CallCenterService} from "../../../requests/call-center/call-center-service";
import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";
import {PermissionPage} from "../../base/permission/permission";
import {HudService} from "../../../providers/hud-service";
import {StubService} from "../../../requests/stub/stub-service";
import {CallCenterScoreRequestInfo} from "../../../models/network/request/center/call-center-score-request-info";
import {CenterApplyRequstInfo} from "../../../models/network/request/center/center-apply-requst-info";

/*
 Generated class for the ServicePraise page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-service-praise',
    templateUrl: 'service-praise.html'
})
export class ServicePraisePage extends PermissionPage {
    resetCurrentName(): void {
        ConfigService.currentName = "ServicePraisePage";
    }

    scoreSpeed = 0;
    scoreQuality = 0;
    scoreAttitude = 0;
    scoreAvg = 0;
    centerApplyRequstInfo: CenterApplyRequstInfo;

    constructor(public hudService: HudService, public callCenterService: CallCenterService, public navParams: NavParams, public stubService: StubService) {
        super(stubService);
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        console.log('ionViewDidLoad ServicePraisePage');
        this.centerApplyRequstInfo = this.navParams.get('centerApplyRequstInfo');
    }

    goToPraise() {
        if (this.scoreSpeed === 0 || this.scoreQuality === 0 || this.scoreAttitude === 0 || this.scoreAvg === 0) {
            this.hudService.getToast('请选择星级').present();
            return;
        }
        let callCenterScoreRequestInfo = new CallCenterScoreRequestInfo(this.centerApplyRequstInfo.mchtNo, this.centerApplyRequstInfo.code, this.scoreSpeed, this.scoreQuality, this.scoreAttitude, this.scoreAvg);
        this.callCenterService.saveScore(callCenterScoreRequestInfo, () => {
            let toast = this.hudService.getToast('评价成功');
            toast.onDidDismiss(() => {
                this.pop();
            });
            toast.present();
        });
    }

}

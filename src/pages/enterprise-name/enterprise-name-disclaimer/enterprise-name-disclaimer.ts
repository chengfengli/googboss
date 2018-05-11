import {ConfigService} from "../../../providers/config-service";
import {StubService} from "./../../../requests/stub/stub-service";
import {BasePage} from "./../../base/base/base";
import {Component} from "@angular/core";

/*
 Generated class for the EnterpriseNameDisclaimer page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-enterprise-name-disclaimer',
    templateUrl: 'enterprise-name-disclaimer.html'
})
export class EnterpriseNameDisclaimerPage extends BasePage {

    constructor(public stubService: StubService) {
        super(stubService);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad EnterpriseNameDisclaimerPage');
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'EnterpriseNameDisclaimerPage';
    }

}

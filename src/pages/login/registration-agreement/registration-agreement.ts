import {ConfigService} from "./../../../providers/config-service";
import {BasePage} from "./../../base/base/base";
import {Component} from "@angular/core";
import {StubService} from "../../../requests/stub/stub-service";

/*
 Generated class for the RegistrationAgreement page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-registration-agreement',
    templateUrl: 'registration-agreement.html'
})
export class RegistrationAgreementPage extends BasePage {
    resetCurrentName(): void {
        ConfigService.currentName = "RegistrationAgreementPage";
    }

    constructor(public stubService: StubService) {
        super(stubService);
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        console.log('ionViewDidLoad RegistrationAgreementPage');
    }

}

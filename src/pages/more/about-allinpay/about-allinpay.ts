import {ConfigService} from "../../../providers/config-service";
import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";
import {BasePage} from "../../base/base/base";
import {StubService} from "../../../requests/stub/stub-service";

/*
 Generated class for the AboutAllinpay page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-about-allinpay',
    templateUrl: 'about-allinpay.html'
})
export class AboutAllinpayPage extends BasePage {

    constructor(public navParams: NavParams, public stubService: StubService) {
        super(stubService);
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        console.log('ionViewDidLoad AboutAllinpayPage');
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'AboutAllinpayPage';
    }

}

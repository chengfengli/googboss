import { EnterpriNameImg } from './../../../models/enterprisename/enterpriname';
import {ConfigService} from "../../../providers/config-service";
import {LoginPage} from "./../../login/login/login";
import {HudService} from "./../../../providers/hud-service";
import {PermissionPage} from "./../../base/permission/permission";
import {UserData} from "./../../../storages/user-data";
import {EnterpriseNameSelectTemplatePage} from "./../../enterprise-name/enterprisename-selecttemplate/enterprisename-selecttemplate";
import {EnterpriseNameMyCardPage} from "./../../enterprise-name/enterprise-name-my-card/enterprise-name-my-card";
import {EnterpriseCardService} from "./../../../requests/enterprise-name/enterprise-card-service";
import {SearchGbBusinessCardDTO} from "./../../../models/enterprisename/card";
import {StubService} from "./../../../requests/stub/stub-service";
import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";
import {ResetServerAndPortPage} from "../../reset-server-and-port/reset-server-and-port";
import { BrowserTab } from '@ionic-native/browser-tab';

/*
 Generated class for the DiscoverHome page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-discover-home',
    templateUrl: 'discover-home.html'
})
export class DiscoverHomePage extends PermissionPage {
    nameCardData:EnterpriNameImg[]=[];
    card: SearchGbBusinessCardDTO;

    constructor(private browserTab: BrowserTab, public navParams: NavParams, public stubService: StubService, public nameCardService: EnterpriseCardService, public userdData: UserData, public hudService: HudService) {
        super(stubService);
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'DiscoverHomePage';
    }

    ionViewDidEnter() {
        super.ionViewDidEnter();
        var v = this.getNavCtrl().getViews()[this.getNavCtrl().getViews().length - 1];
        console.log(v);
        console.log(v.instance);
        if (v.instance instanceof DiscoverHomePage) {
            console.log("true");
        } else {
            console.log('false');
        }

        this.userdData.hasLoggedIn().subscribe((hasLogin) => {
            if (hasLogin) {
                this.nameCardService.getNameCard(this.card, (data) => {
                    this.nameCardData = data.results;
                });
            }
        });
    }

    goToBusinessCard() {
        if (this.nameCardData != undefined) {
            if (this.nameCardData.length > 0) {
                this.push(EnterpriseNameMyCardPage, {nameCards: this.nameCardData});
            } else {
                this.push(EnterpriseNameSelectTemplatePage);
            }
        } else {
            let toast = this.hudService.getToast("请先登录！");
            toast.onDidDismiss(() => {
                this.push(LoginPage);
            });
            toast.present();
        }
    }

    goToResetServer() {
        this.push(ResetServerAndPortPage);
    //       this.browserTab.isAvailable()
    // .then((isAvailable: boolean) => {

    //   if (isAvailable) {

    //     this.browserTab.openUrl('https://www.baidu.com');

    //   } else {

    //     // open URL with InAppBrowser instead or SafariViewController

    //   }

    // });

    }
}

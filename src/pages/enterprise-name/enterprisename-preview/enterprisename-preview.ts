import {ConfigService} from "../../../providers/config-service";
import {HudService} from "./../../../providers/hud-service";
import {Util} from "./../../../utils/util";
import {EnterpriseNameMyCardPage} from "./../enterprise-name-my-card/enterprise-name-my-card";
import {LoadingController, NavParams} from "ionic-angular";
import {DomSanitizer} from "@angular/platform-browser";
import {BasePage} from "./../../base/base/base";
import {EnterpriseCardService} from "../../../requests/enterprise-name/enterprise-card-service";
import {Enterprisename} from "./../../../models/enterprisename/enterprisename";
import {Component} from "@angular/core";
import {StubService} from "../../../requests/stub/stub-service";

@Component({
    selector: 'enterprisename-preview',
    templateUrl: 'enterprisename-preview.html'
})
export class EnterpriseNamePreviewPage extends BasePage {
    browser: any = {
        secUrl: '', // 安全链接
        url: ''
    };
    nameCard: Enterprisename;
    //是否编辑
    edit = false;
    background = "";
    height = 505;

    constructor(public loadingCtrl: LoadingController, private sanitizer: DomSanitizer, public navPara: NavParams, public nameCardService: EnterpriseCardService,
                public stubService: StubService, public hudService: HudService) {
        super(stubService);
        let browser = this.navPara.get('browser');
        if (browser) {
            this.browser.url = browser.url;
            this.browser.secUrl = this.sanitizer.bypassSecurityTrustResourceUrl(browser.url);
        } else {
            this.browser.secUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.browser.url);
        }
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'EnterpriseNamePreviewPage';
    }

    ionViewDidEnter() {
        super.ionViewDidEnter();
        this.nameCard = this.navPara.get("nameCard");
        this.background = this.navPara.get("background");
        if (Util.isNotNullOrUndefined(this.nameCard.shopImg1) || Util.isNotNullOrUndefined(this.nameCard.shopImg2) || Util.isNotNullOrUndefined(this.nameCard.shopImg3)) {
            this.height = 607;
        }
        this.edit = this.navPara.get("edit");
    }

    /**返回 */
    goBack() {
        this.pop();
    }

    /**提交审核 */
    submit() {
        if (this.edit) {
            this.nameCardService.editNameCard(this.nameCard, () => {
                this.push(EnterpriseNameMyCardPage);
            });
        } else {
            this.nameCardService.addNameCard(this.nameCard, () => {
                this.push(EnterpriseNameMyCardPage);
            });
        }
    }
}
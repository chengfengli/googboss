import {EnterpriseCardService} from "./../../../requests/enterprise-name/enterprise-card-service";
import {EnterpriNameImg} from "./../../../models/enterprisename/enterpriname";
import {EnterpriseNameDisclaimerPage} from "./../enterprise-name-disclaimer/enterprise-name-disclaimer";
import {ViewCard} from "./../../../models/enterprisename/view-card";
import {ConfigService} from "./../../../providers/config-service";
import {Util} from "./../../../utils/util";
import {HudService} from "./../../../providers/hud-service";
import {DomSanitizer} from "@angular/platform-browser";
import {BasePage} from "./../../base/base/base";
import {EnterpriseNameFormPage} from "./../enterprisename-form/enterprisename-form";
import {EnterpriseNameSelectTemplatePage} from "./../enterprisename-selecttemplate/enterprisename-selecttemplate";
import {Component} from "@angular/core";
import {NavParams, ActionSheetController} from "ionic-angular";
import {StubService} from "../../../requests/stub/stub-service";
import {SocialSharing} from "@ionic-native/social-sharing";
/*
 名片详情
 */
@Component({
    selector: 'page-enterprise-name-details',
    templateUrl: 'enterprise-name-details.html'
})
export class EnterpriseNameDetailsPage extends BasePage {
    nameCard = new EnterpriNameImg();
    browser: any = {
        secUrl: '', // 安全链接
        url: '',
    };
    //iframe的高度
    height = 505;
    //名片对应的背景
    templateBackground = "";

    constructor(private socialSharing: SocialSharing, public hudService: HudService, private sanitizer: DomSanitizer, public navParams: NavParams,
                public actionCtrl: ActionSheetController, public stubService: StubService, public configService: ConfigService, public nameCardService: EnterpriseCardService,) {
        super(stubService);
        let browser = this.navParams.get('browser');
        if (browser) {
            this.browser.url = browser.url;
            this.browser.secUrl = this.sanitizer.bypassSecurityTrustResourceUrl(browser.url);
        } else {
            this.browser.secUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.browser.url);
        }
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'EnterpriseNameDetailsPage';
    }

    ionViewDidEnter() {
        super.ionViewDidEnter();
        this.nameCard.cardId = this.navParams.get("cardId");
        //名片的背景，在预览是使用
        this.templateBackground = this.navParams.get("templateBackground");
        let cardId = new ViewCard();
        cardId.cardId = this.nameCard.cardId;
        //通过名片id获取名片数据
        this.nameCardService.getNameCardById(cardId, (data) => {
            this.nameCard = data;
            this.templateBackground = ConfigService.imageURL + this.nameCard.templateBackground;
            this.nameCard.templateBackground = ConfigService.imageURL + this.nameCard.templateBackground;
            //判断是否有网店图片，并改变iframe的高度
            if (Util.isNotNullOrUndefined(this.nameCard.shopImg1) || Util.isNotNullOrUndefined(this.nameCard.shopImg2) || Util.isNotNullOrUndefined(this.nameCard.shopImg3)) {
                this.height = 607;
            }
        });
    }

    /**添加名片 */
    addNameCard() {
        this.push(EnterpriseNameSelectTemplatePage);
    }

    /**分享 */
    share() {
        if (this.nameCard.status == "0" || this.nameCard.status == "2") {
            this.hudService.getToast("未通过审核的名片不能分享!").present();
        } else {
            let viewCard = new ViewCard();
            viewCard.cardId = this.nameCard.cardId;
            this.socialSharing.share('更多企业信息、更多产品信息尽在我的企业名片!', '我的名片', "", ConfigService.hostURL + '/cards/share.htm' + Util.toQueryString(viewCard));
        }
    }

    /**编辑 */
    edit() {
        this.push(EnterpriseNameFormPage, {
            nameCard: this.nameCard,
            edit: true,
            templateBackground: this.nameCard.templateBackground,
            templateNo: this.nameCard.templateNo
        });
    }

    /**免责声明 */
    disclaimer() {
        this.push(EnterpriseNameDisclaimerPage);
    }
}

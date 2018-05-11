import { CardTemplateInfo } from './../../../models/enterprisename/card-template-info';
import {EnterpriseCardService} from "./../../../requests/enterprise-name/enterprise-card-service";
import {ConfigService} from "./../../../providers/config-service";
import {forwardRef, Inject, Component, ViewChild} from "@angular/core";
import {StubService} from "../../../requests/stub/stub-service";
import {Slides} from "ionic-angular";
import {BasePage} from "./../../base/base/base";
import {EnterpriseNameFormPage} from "../enterprisename-form/enterprisename-form";

@Component({
    selector: 'enterprisename-selecttemplate',
    templateUrl: 'enterprisename-selecttemplate.html'
})
export class EnterpriseNameSelectTemplatePage extends BasePage {
    @ViewChild(Slides) slides: Slides;
    //选择模版的下标，默认是0
    modelIndex: number = 0;
    //存储模板数据的数组
    items:CardTemplateInfo[] = [];
    imageURL = ConfigService.imageURL;
    //初始化默认背景
    background = "assets/images/img/back_one@3x.png";

    constructor(public stubService: StubService, @Inject(forwardRef(() => EnterpriseCardService)) public nameCardService: EnterpriseCardService,
                public configService: ConfigService) {
        super(stubService);
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'EnterpriseNameSelectTemplatePage';
    }

    ionViewDidEnter() {
        super.ionViewDidEnter();
        //获取名片模板数据
        this.nameCardService.getModels((data) => {
            this.items = data;
            //修改背景
            this.background = this.imageURL + this.items[0].templateBackground;
        });
    }

    /**跳转：编辑企业名片信息 */
    goEditNameCardPage() {
        //名片模板编号
        let templateNo = this.items[this.modelIndex].templateNo;
        this.push(EnterpriseNameFormPage, {templateNo: templateNo, templateBackground: this.background});
    }

    /**返回 */
    goBack() {
        this.pop();
    }

    /**模板切换事件 */
    slideChange() {
        let slideLength = this.items.length;
        let slideIndex = this.slides.getActiveIndex();
        if (slideIndex >= slideLength) {
            slideIndex -= 1;
        }
        this.modelIndex = slideIndex;
        this.background = this.imageURL + this.items[slideIndex].templateBackground;
    }
}
import { EnterpriNameImg } from './../../../models/enterprisename/enterpriname';
import {UserData} from "./../../../storages/user-data";
import {ViewCard} from "../../../models/enterprisename/view-card";
import {SearchGbBusinessCardDTO} from "./../../../models/enterprisename/card";
import {Util} from "./../../../utils/util";
import {ConfigService} from "./../../../providers/config-service";
import {BasePage} from "./../../base/base/base";
import {EnterpriseNameSelectTemplatePage} from "./../enterprisename-selecttemplate/enterprisename-selecttemplate";
import {EnterpriseNameDetailsPage} from "../enterprise-name-details/enterprise-name-details";
import {EnterpriseCardService} from "../../../requests/enterprise-name/enterprise-card-service";
import {Component, ViewChild} from "@angular/core";
import {InfiniteScroll, NavParams} from "ionic-angular";
import {StubService} from "../../../requests/stub/stub-service";


/*
 我的名片列表
 */
@Component({
    selector: 'page-enterprise-name-my-card',
    templateUrl: 'enterprise-name-my-card.html'
})
export class EnterpriseNameMyCardPage extends BasePage {
    @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
    namecardList: string = "all";
    items:EnterpriNameImg[] = [];
    searchGbBusinessCardDTO: SearchGbBusinessCardDTO;
    pageNo = 1;
    status = "";
    imageURL = "";
    private token: string;

    constructor(public navParams: NavParams, public cardService: EnterpriseCardService, public stubService: StubService,
                public configService: ConfigService, private userData: UserData) {
        super(stubService);
        this.userData.getToken().subscribe((token) => {
            this.token = token;
        });
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'EnterpriseNameMyCardPage';
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
    }

    ionViewDidEnter() {
        super.ionViewDidEnter();
        this.refresher._beginRefresh();
        this.imageURL = ConfigService.imageURL;
    }


    /**获取名片列表 */
    getNameCard(status) {
        this.status = status;
        this.pageNo = 1;
        this.beginRefresh();
    }

    updateNoDateStatus() {
        if (this.items.length === 0) {
            this.shouldShowNoData = true;
        } else {
            this.shouldShowNoData = false;
        }
    }

    loadNameCardData() {
        let searchGbBusinessCardDTO = new SearchGbBusinessCardDTO();
        searchGbBusinessCardDTO.status = this.status;
        searchGbBusinessCardDTO.pageNo = this.pageNo;
        this.cardService.getNameCard(searchGbBusinessCardDTO, (data) => {
            this.refresher.complete();
            this.infiniteScroll.complete();
            this.shouldShowNetError = false;
            if (this.pageNo === 1) {
                if (Util.isNotNullOrUndefined(data.results) && data.results.length > 0) {
                    this.items = data.results;
                    this.hasMoreData = true;
                    this.shouldShowNoData = false;
                } else {
                    this.items = [];
                    this.hasMoreData = false;
                    this.shouldShowNoData = true;
                }
            } else {
                if (Util.isNotNullOrUndefined(data.results) && data.results.length > 0) {
                    this.items = this.items.concat(data.results);
                } else {
                    this.hasMoreData = false;
                }
            }
        }, () => {
            this.shouldShowNetError = false;
            this.refresher.complete();
            this.infiniteScroll.complete();
            this.updateNoDateStatus();
        }, () => {
            this.refresher.complete();
            this.infiniteScroll.complete();
            this.shouldShowNetError = true;
            this.shouldShowNoData = false;
        });
    }

    /**名片详情 currentNameCard：点击名片的对象*/
    details(currentNameCard) {
        let nameCard = new ViewCard();
        //名片编号
        nameCard.cardId = currentNameCard.cardId;
        this.push(EnterpriseNameDetailsPage, {
            browser: {
                url: ConfigService.hostURL + '/cards/views.htm' + Util.toQueryString(nameCard)
            },
            cardId: currentNameCard.cardId
        });
    }

    /**新建名片 */
    addNameCard() {
        this.push(EnterpriseNameSelectTemplatePage);
    }

    /**刷新 */
    doRefresh() {
        this.pageNo = 1;
        this.loadNameCardData();
    }

    /**点击刷新 */
    beginRefresh() {
        this.refresher._beginRefresh();
    }

    /**加载更多 */
    loadMore(ionInfinite) {
        this.pageNo = this.pageNo + 1;
        this.loadNameCardData();
    }

    /**返回 */
    goBack() {
        this.popToRoot();
    }

}

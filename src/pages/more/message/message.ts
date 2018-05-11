import {UserData} from "../../../storages/user-data";
import {ConfigService} from "../../../providers/config-service";
import {MessageRequestInfo} from "./../../../models/network/request/message/message-request-info";
import {MessageService} from "./../../../requests/message/message-service";
import {Message} from "./../../../models/network/response/message/message";
import {Component, ViewChild} from "@angular/core";
import {InfiniteScroll, App} from "ionic-angular";
import {PermissionPage} from "../../base/permission/permission";
import {StubService} from "../../../requests/stub/stub-service";
import {Util} from "../../../utils/util";
import {BrowserPage} from "../../../components/browser/browser";
import {GetMoneyStatusPage} from "../../fast-loan/fast-loan-get-money-status/fast-loan-get-money-status";
import {FastLoanTabsPage} from "../../fast-loan/fast-loan-tabs/fast-loan-tabs";
import {FastLoanApplyStatusPage} from "../../fast-loan/fast-loan-apply-status/fast-loan-apply-status";
import {DailyLoanApplyStatusPage} from "../../daily-loan/daily-loan-apply-status/daily-loan-apply-status";
import {DailyLoanMerchantListPage} from "../../daily-loan/daily-loan-merchant-list/daily-loan-merchant-list";
import {DailyLoanContractPage} from "../../daily-loan/daily-loan-contract/daily-loan-contract";
import {EnterpriseNameDetailsPage} from "../../enterprise-name/enterprise-name-details/enterprise-name-details";
import {ViewCard} from "../../../models/enterprisename/view-card";

/*
 Generated class for the Message page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-message',
    templateUrl: 'message.html'
})
export class MessagePage extends PermissionPage {
    @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
    messages: Message[] = [];
    pageNo = 1;

    constructor(public userData: UserData, public app: App, public stubService: StubService, public messageService: MessageService) {
        super(stubService);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MessagePage');
        super.ionViewDidLoad();
    }

    ionViewDidEnter() {
        super.ionViewDidEnter();
        this.beginRefresh();
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'MessagePage';
    }

    listMyMessages() {
        let messageRequestInfo = new MessageRequestInfo();
        messageRequestInfo.pageNo = this.pageNo;
        this.messageService.listMyMessages(messageRequestInfo, (messages) => {
            this.refresher.complete();
            this.infiniteScroll.complete();
            this.shouldShowNetError = false;
            if (this.pageNo === 1) {
                if (Util.isNotNullOrUndefined(messages) && messages.length > 0) {
                    this.messages = messages;
                    this.hasMoreData = true;
                } else {
                    this.messages = [];
                    this.hasMoreData = false;
                }
            } else {
                if (Util.isNotNullOrUndefined(messages) && messages.length > 0) {
                    this.messages = this.messages.concat(messages);
                } else {
                    this.hasMoreData = false;
                }
            }
            this.updateNoDateStatus();
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

    updateNoDateStatus() {
        if (this.messages.length === 0) {
            this.shouldShowNoData = true;
        } else {
            this.shouldShowNoData = false;
        }
    }

    doRefresh(event: Event) {
        this.pageNo = 1;
        this.listMyMessages();
    }

    loadMore(event) {
        this.pageNo = this.pageNo + 1;
        this.listMyMessages();
    }

    beginRefresh() {
        this.refresher._beginRefresh();
    }

    goToMessageDetail(message: Message) {
        if (message.action === 'PAGE') {
            if (message.parameters !== null && message.parameters !== '') {
                let parameters = JSON.parse(message.parameters);
                if (message.page === 'EnterpriseNameDetailsPage') {
                    let nameCard = new ViewCard();
                    nameCard.cardId = parameters.cardId;
                    this.stubService.push(EnterpriseNameDetailsPage, {
                        browser: {
                            url: ConfigService.hostURL + '/cards/views.htm' + Util.toQueryString(nameCard)
                        },
                        cardId: parameters.cardId,
                    });
                } else if (message.page === 'DailyLoanContractPage') {
                    // parameters = JSON.parse(parameters.dailyLoanStatusRequestInfo);
                    // this.stubService.push(DailyLoanContractPage, { dailyLoanStatusRequestInfo: parameters });
                } else if (message.page === 'DailyLoanMerchantListPage') {
                    this.stubService.push(DailyLoanMerchantListPage, {selectedMchtCd: parameters.selectedMchtCd});
                } else if (message.page === 'DailyLoanApplyStatusPage') {
                    // parameters = JSON.parse(parameters.dailyLoanVerifyResult);
                    // this.stubService.push(DailyLoanApplyStatusPage, { dailyLoanVerifyResult: parameters, dailyLoanStatusRequestInfo: parameters.applicationTid });
                } else if (message.page === 'FastLoanApplyStatusPage') {
                    // parameters = JSON.parse(parameters.fastLoanApplyInfo);
                    // this.stubService.push(FastLoanApplyStatusPage, { fastLoanApplyInfo: parameters });
                } else if (message.page === 'FastLoanTabsPage') {
                    this.app.getRootNav().push(FastLoanTabsPage, {selectedMchtCd: parameters.selectedMchtCd});
                } else if (message.page === 'GetMoneyStatusPage') {
                    parameters = JSON.parse(parameters.fastLoanApplyInfo);
                    this.stubService.push(GetMoneyStatusPage, {fastLoanApplyInfo: parameters});
                }
            }
        } else if (message.action === 'URL') {
            this.stubService.push(BrowserPage, {
                browser: {
                    title: '',
                    url: message.page
                }
            });
        }
    }

}

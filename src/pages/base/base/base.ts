import {ConfigService} from "./../../../providers/config-service";
import {Util} from "./../../../utils/util";
import {Component, ViewChild} from "@angular/core";
import {StubService} from "../../../requests/stub/stub-service";
import {StubInfo} from "../../../models/network/request/stub/stub-info";
import {NavController, Refresher} from "ionic-angular";
@Component({
    selector: 'page-base',
    templateUrl: 'base.html'
})
export abstract class BasePage {

    enterTime: Date;
    leaveTime: Date;
    hasMoreData = false;
    shouldShowShade = false;
    shouldShowNetError = false;
    shouldShowNoData = false;
    netErrorImg = "assets/images/img/wuwangluo@2x.png";
    noDataImg = "assets/images/img/wujilu@2x.png";
    @ViewChild(Refresher) refresher: Refresher;
    @ViewChild("header") header: any;

    constructor(public stubService: StubService) {
    }

    ionViewDidLoad() {
        if (Util.isNotNullOrUndefined(this.refresher)) {
            (this.refresher)._top = this.header.nativeElement.clientHeight + 13 + "px";
        }
    }

    ionViewWillUnload() {

    }

    ionViewWillEnter() {
        this.resetCurrentName();
    }

    abstract resetCurrentName(): void;

    ionViewDidEnter() {
        this.enterTime = new Date();
    }

    ionViewWillLeave() {
        this.leaveTime = new Date();
        let duration = this.leaveTime.getTime() - this.enterTime.getTime();
        let pageName = ConfigService.currentName;
        let stubInfo = new StubInfo(duration, pageName);
        console.log(stubInfo);
        this.stubService.send(stubInfo);
        Util.wait = 60;
    }

    reloadData() {
        this.shouldShowNetError = false;
        this.refresher.enabled = true;
        this.beginRefresh();
    }

    beginRefresh() {

    }

    push(page, data = {}) {
        this.stubService.push(page, data);
    }

    pop() {
        this.stubService.pop();
    }

    popToRoot() {
        this.stubService.popToRoot();
    }

    popTo(page) {
        this.stubService.popTo(page);
    }

    getNavCtrl(): NavController {
        return this.stubService.getNavCtrl();
    }

    setRoot(page, data = {}) {
        this.stubService.setRoot(page, data);
    }

    popToRootNavRoot() {
        this.stubService.popToRootNavRoot();
    }

}

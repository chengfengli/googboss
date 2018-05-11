import {NavParams, Platform, Events, ViewController} from "ionic-angular";
import {Component, ElementRef} from "@angular/core";
import {BasePage} from "../../pages/base/base/base";
import {StubService} from "../../requests/stub/stub-service";
import {ConfigService} from "../../providers/config-service";

/*
 Generated class for the DatePickerModal page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-date-picker-modal',
    templateUrl: 'date-picker-modal.html'
})
export class DatePickerModalPage extends BasePage {

    nowTimeTab: string = "";
    startTime: string;
    endsTime: string;
    todayTime: any;
    myPlatform: string;

    constructor(public stubService: StubService, public viewCtrl: ViewController, public events: Events, public params: NavParams, public platform: Platform, public el: ElementRef) {
        super(stubService);
    }

    data: Date = new Date();
    weekdays = [];

    eventos: any = [];

    useSwipe = true;

    rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    ionViewDidLoad() {
        this.startTime = this.params.get("startTime");
        this.endsTime = this.params.get("endsTime");
        if (this.params.get('nowChoose') === "start") {
            this.nowTimeTab = "startTime";
        } else if (this.params.get('nowChoose') === "end") {
            this.nowTimeTab = "endsTime";
        }
    }

    ionViewWillEnter() {
        if (this.platform.is("android")) {
            this.el.nativeElement.querySelector(".dismiss-btn-box").className = "dismiss-btn-box android";
        } else if (this.platform.is("ios")) {
            this.el.nativeElement.querySelector(".dismiss-btn-box").className = "dismiss-btn-box ios";
        }
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'EnterPwdModalPage';
    }

    onChange(event) {
        let nowTime = this.dateFormate(event);
        if (this.nowTimeTab === "startTime") {
            if (nowTime > this.endsTime) {
                this.startTime = this.endsTime;
                this.endsTime = nowTime;
            } else {
                this.startTime = nowTime;
            }
        } else if (this.nowTimeTab === "endsTime") {
            if (this.startTime > nowTime) {
                this.endsTime = this.startTime;
                this.startTime = nowTime;
            } else {
                this.endsTime = nowTime;
            }
        } else {
            return false;
        }
        this.changeTime();
    }

    closeModal() {
        this.viewCtrl.dismiss();
    }

    changeTime() {
        let nowTime = {
            startTime: this.startTime,
            endsTime: this.endsTime
        }
        this.events.publish('myRepaymentListTime', nowTime);
    }

    reset() {
        this.startTime = "";
        this.endsTime = "";
        this.nowTimeTab = "";
        this.changeTime();
    }

    changeTabsTime() {
        let today = new Date();
        if (this.nowTimeTab === "sevenDay") {
            this.startTime = this.dateFormate(new Date((today.getTime() - 7 * 24 * 60 * 60 * 1000)));
            this.endsTime = this.dateFormate(today);
        } else if (this.nowTimeTab === "fifteenDay") {
            this.startTime = this.dateFormate(new Date((today.getTime() - 15 * 24 * 60 * 60 * 1000)));
            this.endsTime = this.dateFormate(today);
        } else if (this.nowTimeTab === "oneMonth") {
            this.startTime = this.dateFormate(new Date((today.getTime() - 30 * 24 * 60 * 60 * 1000)));
            this.endsTime = this.dateFormate(today);
        } else if (this.nowTimeTab === "halfYear") {
            this.startTime = this.dateFormate(new Date((today.getTime() - 6 * 30 * 24 * 60 * 60 * 1000)));
            this.endsTime = this.dateFormate(today);
        }
        this.changeTime();
    }

    dateFormate(data): string {
        let y = data.getFullYear();
        let m = data.getMonth() + 1;
        if (String(m).length === 1) {
            m = "0" + m;
        }
        let d = data.getDate();
        if (String(d).length === 1) {
            d = "0" + d;
        }
        return y + "-" + m + "-" + d;
    }
}

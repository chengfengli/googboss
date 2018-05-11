import {ConfigService} from "./../../providers/config-service";
import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";

/*
 Generated class for the ResetServerAndPort page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-reset-server-and-port',
    templateUrl: 'reset-server-and-port.html'
})
export class ResetServerAndPortPage {
    url: string;
    port: string;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ResetServerAndPortPage');

    }

    change() {
        let urlStr = 'http://' + this.url + ':' + this.port;
        ConfigService.hostURL = urlStr;
        this.navCtrl.pop();
    }

}

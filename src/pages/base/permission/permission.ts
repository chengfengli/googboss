import {Component} from "@angular/core";
import {BasePage} from "../base/base";
import {StubService} from "../../../requests/stub/stub-service";

/*
 Generated class for the Permission page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-permission',
    templateUrl: 'permission.html'
})
export abstract class PermissionPage extends BasePage {
    abstract resetCurrentName(): void;


    static isPermission = true;

    constructor(public stubService: StubService) {
        super(stubService);
    }

    ionViewWillEnter() {
        super.ionViewWillEnter();
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
    }

    ionViewWillUnload() {
        super.ionViewWillUnload();
    }
}

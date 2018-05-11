import {ConfigService} from "./../../providers/config-service";
import {StubService} from "./../../requests/stub/stub-service";
import {BasePage} from "./../../pages/base/base/base";
import {Component} from "@angular/core";
import {NavParams, ViewController} from "ionic-angular";
import {PaymentType} from "../../enums/payment-type";

/*
 Generated class for the ChoosePaymentModal page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-choose-payment-modal',
    templateUrl: 'choose-payment-modal.html'
})
export class ChoosePaymentModalPage extends BasePage {
    resetCurrentName(): void {
        ConfigService.currentName = 'ChoosePaymentModalPage';
    }

    tlqbImg = 'assets/images/img/tonglianqianbao@2x.png';
    tltImg = 'assets/images/img/tongliantong@2x.png';
    paymentType = PaymentType.Wallet;

    constructor(public navParams: NavParams, public viewCtrl: ViewController, public stubService: StubService) {
        super(stubService);
    }

    chooseWallet() {
        this.paymentType = PaymentType.Wallet;
    }

    chooseTong() {
        this.paymentType = PaymentType.Tong;
    }

    shouldSelectWallet(): boolean {
        if (this.paymentType === PaymentType.Wallet) {
            return true;
        }
        return false;
    }

    shouldSelectTong(): boolean {
        if (this.paymentType === PaymentType.Tong) {
            return true;
        }
        return false;
    }

    goToPayment() {
        this.viewCtrl.dismiss(this.paymentType);
    }

    dismissModal() {
        this.viewCtrl.dismiss();
    }
}

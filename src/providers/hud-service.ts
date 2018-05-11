import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {AlertController, Loading, LoadingController, ToastController} from "ionic-angular";

/*
 Generated class for the HudService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class HudService {

    constructor(public loadingCtrl: LoadingController, public alertController: AlertController, public toastController: ToastController) {
    }

    getAlert(title, message, buttonText) {
        let alert = this.alertController.create({
            title: title,
            message: message,
            buttons: buttonText,
            enableBackdropDismiss: false
        });
        return alert;
    }

    getLoading(content): Loading {
        let loading = this.loadingCtrl.create({
            dismissOnPageChange: false,
            content: content
        });
        return loading;
    }

    getToast(message) {
        let toast = this.toastController.create({
            message: message,
            duration: 2000,
            position: 'middle'
        });
        return toast;
    }
}

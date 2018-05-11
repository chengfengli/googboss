import {ConfigService} from "../../../providers/config-service";
import {Account} from "./../../../models/user/account";
import {CustomValidators} from "ng2-validation";
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import {Component, forwardRef, Inject} from "@angular/core";
import {NavParams} from "ionic-angular";
import {HudService} from "../../../providers/hud-service";
import {UserData} from "../../../storages/user-data";
import {StubService} from "../../../requests/stub/stub-service";
import {PermissionPage} from "../../base/permission/permission";
import {MyValidators} from "../../../validators/my-validators";
import {Util} from "../../../utils/util";
import {UpdatetPasswordInfo} from "../../../models/network/request/user/updatet-password-info";
import {UserService} from "../../../requests/user/user-service";

/*
 Generated class for the UpdatePassword page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-update-password',
    templateUrl: 'update-password.html'
})
export class UpdatePasswordPage extends PermissionPage {

    private myForm: FormGroup;
    account: Account;

    constructor(public navParams: NavParams, @Inject(forwardRef(() => UserService)) public userServcice: UserService, public util: Util, private formBuilder: FormBuilder, public hudService: HudService, public userData: UserData, public stubService: StubService) {
        super(stubService);

        let newPassword = new FormControl('', MyValidators.getPasswordValidators());
        this.myForm = this.formBuilder.group({
            oldPassword: ['', Validators.required],
            newPassword: newPassword,
            confirmNewPassword: ['', [Validators.required, CustomValidators.equalTo(newPassword)]],
        });
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        console.log('ionViewDidLoad UpdatePasswordPage');
        this.account = this.navParams.get('account');
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'UpdatePasswordPage';
    }

    updatePassword() {
        this.util.checkFormValid(this.myForm);
        if (!this.myForm.valid) {
            return;
        }
        let formValue = this.myForm.value;
        let passwordInfo = new UpdatetPasswordInfo(null, null, Util.md5Str(formValue.newPassword), Util.md5Str(formValue.oldPassword));
        this.userServcice.resetPassword(passwordInfo, () => {
            this.account.password = passwordInfo.newPassword;
            this.userData.setAccount(this.account);
            let toast = this.hudService.getToast("设置成功");
            toast.onDidDismiss(() => {
                this.pop();
            });
            toast.present();
        });
    }

}

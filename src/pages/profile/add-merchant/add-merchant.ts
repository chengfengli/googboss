import {ConfigService} from "../../../providers/config-service";
import {Util} from "./../../../utils/util";
import {StubService} from "./../../../requests/stub/stub-service";
import {UserData} from "./../../../storages/user-data";
import {HudService} from "./../../../providers/hud-service";
import {PermissionPage} from "./../../base/permission/permission";
import {Component} from "@angular/core";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {MerchantService} from "../../../requests/merchant/merchant-service";
import {BindMerchantInfo} from "../../../models/network/request/merchant/bind-merchant-info";

/*
 Generated class for the AddMerchant page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-add-merchant',
    templateUrl: 'add-merchant.html'
})
export class AddMerchantPage extends PermissionPage {
    addMchtForm: FormGroup;

    constructor(public util: Util, public hudService: HudService, public userData: UserData, public stubService: StubService, public formBuilder: FormBuilder, public merchantService: MerchantService) {
        super(stubService);
        this.initialForm();
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'AddMerchantPage';
    }

    initialForm() {
        this.addMchtForm = this.formBuilder.group({
            mchtCd: ['', Validators.required],
        });
    }

    addMcht(event) {
        event.preventDefault();
        this.util.checkFormValid(this.addMchtForm);
        if (!this.addMchtForm.valid) {
            return;
        }
        let formValue = this.addMchtForm.value;
        let bindMerchantInfo = new BindMerchantInfo();
        bindMerchantInfo.mchtCd = formValue.mchtCd;

        this.merchantService.saveMerchant(bindMerchantInfo, (saveMerchantResult) => {
            if (saveMerchantResult.result) {
                this.addMchtForm.reset();
                let toast = this.hudService.getToast('添加成功');
                toast.onDidDismiss(() => {
                    this.pop();
                });
                toast.present();
            } else {
                this.addMchtForm.reset();
                let toast = this.hudService.getToast('提交成功，等待审核');
                toast.onDidDismiss(() => {
                    this.pop();
                });
                toast.present();
            }
        });
    }
}

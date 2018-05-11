import {ConfigService} from "./../../../providers/config-service";
import {HudService} from "./../../../providers/hud-service";
import {Util} from "./../../../utils/util";
import {MyValidators} from "./../../../validators/my-validators";
import {Inject, forwardRef, Component} from "@angular/core";
import {AllinpayInfo} from "./../../../models/network/request/user/allinpay-info";
import {JoinAllinpayService} from "./../../../requests/user/join-allinpay-service";
import {BasePage} from "../../base/base/base";
import {StubService} from "../../../requests/stub/stub-service";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";

/*
 Generated class for the JoinAllinpay page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-join-allinpay',
    templateUrl: 'join-allinpay.html'
})
export class JoinAllinpayPage extends BasePage {

    mcthName: string;
    contactName: string;
    contactMobile: number;
    remark: string;
    private myForm: FormGroup

    constructor(public stubService: StubService, @Inject(forwardRef(() => JoinAllinpayService)) public joinAllinpayService: JoinAllinpayService, public formBuilder: FormBuilder, public util: Util, public hudService: HudService) {
        super(stubService);
        this.myForm = this.formBuilder.group({
            mcthName: ['', Validators.required],
            contractName: ['', Validators.required],
            contractPhone: ['', MyValidators.getPhoneValidators()],
            remark: ['', [Validators.required, Validators.minLength(10)]]
        });
    }

    resetCurrentName(): void {
        ConfigService.currentName = "JoinAllinpayPage";
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        console.log('ionViewDidLoad JoinAllinpayPage');
    }

    preventDefault() {
        return false;
    }

    joinIn(event) {
        event.preventDefault();
        this.util.checkFormValid(this.myForm);
        if (!this.myForm.valid) {
            return;
        }
        let myFormInfo = new AllinpayInfo();
        myFormInfo.taskType = "申请开通通联商户";
        myFormInfo.mcthName = this.mcthName;
        myFormInfo.contactName = this.contactName;
        myFormInfo.contactMobile = this.contactMobile;
        myFormInfo.remark = this.remark;
        this.joinAllinpayService.joinAllinpay(myFormInfo, () => {
            this.hudService.getToast("申请成功").present();
            setTimeout(() => {
                this.pop();
            }, 2000)
        })
    }
}

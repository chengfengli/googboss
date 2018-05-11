import { MerchantDetailInfoModalPage } from './../../../components/merchant-detail-info-modal/merchant-detail-info-modal';
import {MyValidators} from "./../../../validators/my-validators";
import {MerchantService} from "./../../../requests/merchant/merchant-service";
import {UserMerchant} from "./../../../models/merchant/user-merchant";
import {ConfigService} from "./../../../providers/config-service";
import {Component} from "@angular/core";
import {NavParams, Events, ModalController} from "ionic-angular";
import {PermissionPage} from "../../base/permission/permission";
import {StubService} from "../../../requests/stub/stub-service";
import {Validators, FormGroup, FormBuilder} from "@angular/forms";
import {Util} from "../../../utils/util";
import {CenterApplyRequstInfo} from "../../../models/network/request/center/center-apply-requst-info";
import {CallCenterService} from "../../../requests/call-center/call-center-service";
import {MerchantInfoPage} from "../../profile/merchant-info/merchant-info";
import {MerchantSerchInfo} from "../../../models/network/request/merchant/merchant-serch-info";
import {AddMerchantPage} from "../../profile/add-merchant/add-merchant";
import {HudService} from "../../../providers/hud-service";

/*
 Generated class for the ApplyAllinpayService page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-apply-allinpay-service',
    templateUrl: 'apply-allinpay-service.html'
})
export class ApplyAllinpayServicePage extends PermissionPage {
    resetCurrentName(): void {
        ConfigService.currentName = "ApplyAllinpayServicePage";
    }

    customerServiceTypes = [];
    private myForm: FormGroup;
    merchant: UserMerchant;

    constructor(public merchantService: MerchantService, public hudService: HudService, public events: Events, public navParams: NavParams, public callCenterService: CallCenterService, public util: Util, private formBuilder: FormBuilder, public stubService: StubService, public configService: ConfigService, public modalCtrl:ModalController) {
        super(stubService);
        this.myForm = this.formBuilder.group({
            customerServiceType: ['', Validators.required],
            timeStarts: ['', Validators.required],
            timeEnds: ['', Validators.required],
            contractAddress: ['', Validators.required],
            contractName: ['', Validators.required],
            contractPhone: ['', MyValidators.getPhoneValidators()],
            remark: ['', Validators.required]
        });
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        console.log('ionViewDidLoad ApplyAllinpayServicePage');
        this.customerServiceTypes = this.configService.getCustomerServiceTypes();
        this.getDefaultMerchant();
        this.events.subscribe('merchant:selected', (merchant) => {
            if (Util.isNotNullOrUndefined(merchant)) {
                this.merchant = merchant;
            }
        });
    }

    getDefaultMerchant() {
        if (!Util.isNotNullOrUndefined(this.merchant)) {
            let merchantSerchInfo = new MerchantSerchInfo();
            merchantSerchInfo.pageSize = 1;
            merchantSerchInfo.pageNo = 1;
            merchantSerchInfo.status = '1';
            merchantSerchInfo.orderBy = 'a.create_time';
            merchantSerchInfo.orderSort = 'desc';

            this.merchantService.listUserMerchans(merchantSerchInfo, (merchants) => {
                if (Util.isNotNullOrUndefined(merchants) && merchants.length !== 0) {
                    this.merchant = merchants[0];
                } else {
                    let toast = this.hudService.getToast('暂无商户，请先添加商户');
                    toast.onDidDismiss(() => {
                        this.push(AddMerchantPage);
                    });
                    toast.present();
                }
            });
        }
    }

    goMerchantList() {
        this.push(MerchantInfoPage, {isSelect: true});
    }

    goToApply(event: Event) {
        this.util.checkFormValid(this.myForm);
        if (!this.myForm.valid) {
            return;
        }
        let formValue = this.myForm.value;
        if (formValue.contractAddress.length > 32) {
            this.hudService.getToast('联系地址不能超过32个字').present();
            return;
        }
        if (formValue.contractName.length > 10) {
            this.hudService.getToast('联系人姓名不能超过10个字').present();
            return;
        }
        if (formValue.remark.length > 32) {
            this.hudService.getToast('申请描述不能超过32个字').present();
            return;
        }
        let centerApplyRequstInfo = new CenterApplyRequstInfo(formValue.contractName, this.merchant.mchtName, formValue.contractPhone, formValue.customerServiceType.mainId, formValue.customerServiceType.subId, formValue.remark, formValue.contractAddress, this.merchant.mchtCd, formValue.timeStarts + '-' + formValue.timeEnds);
        this.callCenterService.saveApply(centerApplyRequstInfo, () => {
            let toast = this.hudService.getToast('申请成功');
            toast.onDidDismiss(() => {
                this.pop();
            });
            toast.present();
        });
    }
    goMchtDetail(e, name, id) {
        e.preventDefault();
        e.stopPropagation();
        let myModal = this.modalCtrl.create(MerchantDetailInfoModalPage, {mchtName: name, mchtCd: id});
        myModal.onDidDismiss((data) => {
            this.shouldShowShade = false;
        })
        myModal.present();
        this.shouldShowShade = true;
    }
}

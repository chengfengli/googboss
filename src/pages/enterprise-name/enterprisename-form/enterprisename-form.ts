import { Enterprisename } from '../../../models/enterprisename/enterprisename';
import {EnterprisenameDto} from "./../../../models/enterprisename/enterprisenamedto";
import {UserData} from "./../../../storages/user-data";
import {Util} from "./../../../utils/util";
import {ConfigService} from "../../../providers/config-service";
import {NavParams, ActionSheetController, Platform, ActionSheet} from "ionic-angular";
import {Inject, forwardRef, Component} from "@angular/core";
import {EnterpriseCardService} from "../../../requests/enterprise-name/enterprise-card-service";
import {MoreNameCardData} from "./../../../storages/morenamecard-data";
import {BasePage} from "./../../base/base/base";
import {StubService} from "../../../requests/stub/stub-service";
import {HudService} from "../../../providers/hud-service";
import {Camera} from "@ionic-native/camera";
import {Storage} from "@ionic/storage";
import {EnterpriseNamePreviewPage} from "../enterprisename-preview/enterprisename-preview";


@Component({
    selector: 'enterprisename-form',
    templateUrl: 'enterprisename-form.html'
})
export class EnterpriseNameFormPage extends BasePage {
    //名片背景
    templateBackground = "";
    imgTyep: string;
    isShowMore = false;
    isShowDel1 = true;
    isShowDel2 = true;
    isShowDel3 = true;
    showImg1 = false;
    showImg2 = false;
    showImg3 = false;
    showLogoTxt = false;
    logoImg = 'assets/images/img/namecard_logo@3x.png';
    shopImg1 = "assets/images/img/add@2x.png";
    shopImg2 = "assets/images/img/add@2x.png";
    shopImg3 = "assets/images/img/add@2x.png";

    defaultLogo: string = "assets/images/img/namecard_logo@3x.png";
    defaultImg: string = "assets/images/img/add@2x.png";

    nameCard = new EnterprisenameDto();
    //区号
    areacode: string = "";
    actionHud: ActionSheet;
    //号码
    phone: string = "";
    //是否编辑:默认不编辑
    edit = false;
    //是否裁剪图片
    picEdit: boolean;
    private token: string;

    constructor(public stubService: StubService, public hudService: HudService, public actionCtrl: ActionSheetController,
                public platform: Platform, public moreData: MoreNameCardData, @Inject(forwardRef(() => EnterpriseCardService)) public nameCardService: EnterpriseCardService,
                public storage: Storage, public navParams: NavParams, public configService: ConfigService, public userData: UserData, private camera: Camera) {
        super(stubService);
        this.userData.getToken().subscribe((token) => {
            this.token = token;
        });
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'EnterpriseNameFormPage';
    }

    ionViewDidEnter() {
        super.ionViewDidEnter();
        this.nameCard.templateNo = this.navParams.get("templateNo");
        this.templateBackground = this.navParams.get("templateBackground");
        if (Util.isNotNullOrUndefined(this.navParams.get("nameCard"))) {
            this.nameCard.cardId = this.navParams.get("nameCard").cardId;
            this.nameCard.cardName = this.navParams.get("nameCard").cardName;
            this.nameCard.companyName = this.navParams.get("nameCard").companyName;
            this.nameCard.companyIntroduce = this.navParams.get("nameCard").companyIntroduce;
            this.nameCard.mobile = this.navParams.get("nameCard").mobile;
            this.nameCard.phone = this.navParams.get("nameCard").phone;
            this.nameCard.wxNo = this.navParams.get("nameCard").wxNo;
            this.nameCard.remark = this.navParams.get("nameCard").remark;
            this.nameCard.logo = this.navParams.get("nameCard").logo;
            if (Util.isNotNullOrUndefined(this.navParams.get("nameCard").shopName) ||
                Util.isNotNullOrUndefined(this.navParams.get("nameCard").shopLink)) {
                this.isShowMore = true;
                this.nameCard.shopName = this.navParams.get("nameCard").shopName;
                this.nameCard.shopLink = this.navParams.get("nameCard").shopLink;
            }
            if (Util.isNotNullOrUndefined(this.navParams.get("nameCard").logo)) {
                this.showLogoTxt = true;
                this.logoImg = this.navParams.get("nameCard").imgHost + this.navParams.get("nameCard").logo;
                this.nameCard.logo = this.navParams.get("nameCard").logo;
            }
            if (Util.isNotNullOrUndefined(this.navParams.get("nameCard").shopImg1)) {
                this.isShowMore = true;
                this.isShowDel1 = false;
                this.showImg1 = true;
                this.shopImg1 = this.navParams.get("nameCard").imgHost + this.navParams.get("nameCard").shopImg1;
                this.nameCard.shopImg1 = this.navParams.get("nameCard").shopImg1;
            }
            if (Util.isNotNullOrUndefined(this.navParams.get("nameCard").shopImg2)) {
                this.isShowMore = true;
                this.isShowDel2 = false;
                this.showImg2 = true;
                this.shopImg2 = this.navParams.get("nameCard").imgHost + this.navParams.get("nameCard").shopImg2;
                this.nameCard.shopImg2 = this.navParams.get("nameCard").shopImg2;
            }
            if (Util.isNotNullOrUndefined(this.navParams.get("nameCard").shopImg3)) {
                this.isShowMore = true;
                this.isShowDel3 = false;
                this.showImg3 = true;
                this.shopImg3 = this.navParams.get("nameCard").imgHost + this.navParams.get("nameCard").shopImg3;
                this.nameCard.shopImg3 = this.navParams.get("nameCard").shopImg3;
            }
            if (this.nameCard.phone != "") {
                let index = this.nameCard.phone.lastIndexOf('-');
                this.areacode = this.nameCard.phone.substring(0, index);
                this.phone = this.nameCard.phone.substring(index + 1);
            }
            this.edit = this.navParams.get("edit");
        }
    }

    ionViewWillLeave() {
        super.ionViewWillLeave();
        this.actionHud.dismiss();
    }

    /**打开相册 */
    choosePhoto(sourceType, edit) {
        const options = {
            quality: 100,//定义保存图片的质量，取值范围为[0,100]，100表示质量最高
            destinationType: this.camera.DestinationType.FILE_URI,
            // 选择返回数据的格式，取值为三个常量之一
            // Camera.DestinationType.DATA_URL//表示返回图片作为base64编码 "data:image/jpeg;base64,"+
            // Camera.DestinationType.FILE_URI//表示返回图片作为文件URI
            // Camera.DestinationType.NATIVE_URI//表示返回图片作为文件URI
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            saveToPhotoAlbum: true,
            sourceType: sourceType,//拍照时，此参数必须有，否则拍照之后报错，照片不能保存
            correctOrientation: true,
            allowEdit: edit,
            targetWidth: 100,
            targetHeight: 100,
        }
        this.camera.getPicture(options).then((imageData) => {
            if (this.imgTyep == "logo") {
                this.nameCardService.imgUpload(imageData, (result) => {
                    let response = JSON.parse(result.response);
                    this.showLogoTxt = true;
                    this.logoImg = response.data.pathPrefix + response.data.relativePath;
                    ;
                    this.nameCard.logo = response.data.relativePath;
                });
            } else if (this.imgTyep == "img1") {
                this.nameCardService.imgUpload(imageData, (result) => {
                    let response = JSON.parse(result.response);
                    this.showImg1 = true;
                    this.isShowDel1 = false;
                    this.shopImg1 = response.data.pathPrefix + response.data.relativePath;
                    this.nameCard.shopImg1 = response.data.relativePath;
                });
            } else if (this.imgTyep == "img2") {
                this.nameCardService.imgUpload(imageData, (result) => {
                    let response = JSON.parse(result.response);
                    this.showImg2 = true;
                    this.isShowDel2 = false;
                    this.shopImg2 = response.data.pathPrefix + response.data.relativePath;
                    this.nameCard.shopImg2 = response.data.relativePath;
                });
            } else if (this.imgTyep == "img3") {
                this.nameCardService.imgUpload(imageData, (result) => {
                    let response = JSON.parse(result.response);
                    this.showImg3 = true;
                    this.isShowDel3 = false;
                    this.shopImg3 = response.data.pathPrefix + response.data.relativePath;
                    this.nameCard.shopImg3 = response.data.relativePath;
                });
            }
        }, (err) => {
        });
    }


    /**显示更多信息 */
    showMore() {
        this.isShowMore = true;
    }

    /**设置企业商标 */
    setPhoto(imgTyep) {
        this.imgTyep = imgTyep;
        if (imgTyep == "logo") {
            this.picEdit = true;
        } else {
            this.picEdit = false;
        }
        this.actionHud = this.actionCtrl.create({
            cssClass: 'action-sheets-basic-page',
            buttons: [
                {
                    cssClass: 'action-sheets-button-pic',
                    text: '从相册选择...',
                    icon: !this.platform.is('ios') ? 'ios-image' : 'md-image',
                    handler: (img, showImg) => {
                        this.choosePhoto(0, this.picEdit);
                    }
                },
                {
                    cssClass: 'action-sheets-button-pic',
                    text: '拍照',
                    icon: !this.platform.is('ios') ? 'ios-camera' : 'md-camera',
                    handler: () => {
                        this.choosePhoto(this.camera.PictureSourceType.CAMERA, this.picEdit);
                    }
                }
            ]
        });
        this.actionHud.present();
    }


    /**添加网店图片 */
    addShopImg(img) {
        this.setPhoto(img);
    }

    /*删除图片*/
    deletePic(shopImg, showImg, isShowDel) {

        this.hudService.getAlert(null, "删除后不能恢复，确定删除？", [
            {
                text: '残忍删除',
                handler: () => {
                    this.nameCard[shopImg] = "";
                    this[showImg] = false;
                    this[isShowDel] = true;
                    this[shopImg] = this.defaultImg;
                }
            },
            {
                text: '我再想想',
                handler: () => {
                }
            }
        ]).present();
    }

    private checkFormValid() {
        let areacodeReg = /^(0\d{2,3})$/;//区号正则表达式
        let phoneReg = /^\d{7,8}$/;//电话号码正则表达式
        //let phonereg = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;固定电话正则表达式
        let mobilereg = /^1[3578]\d{9}$/;//手机号正则表达式
        if (!Util.isNotNullOrUndefined(this.nameCard.logo)) {
            this.hudService.getToast("请设置一张企业LOGO图片").present();
            return false;
        }
        if (!Util.isNotNullOrUndefined(this.nameCard.cardName)) {
            this.hudService.getToast("请输入名片名称").present();
            return false;
        }
        if (!Util.isNotNullOrUndefined(this.nameCard.companyName)) {
            this.hudService.getToast("请输入企业名称").present();
            return false;
        }
        if (this.nameCard.cardName.length > 15) {
            this.hudService.getToast("名片名称不能超过15个字").present();
            return false;
        }
        if (this.nameCard.companyName.length > 15) {
            this.hudService.getToast("企业名称不超过15个字").present();
            return false;
        }
        if (!Util.isNotNullOrUndefined(this.nameCard.companyIntroduce)) {
            this.hudService.getToast("请输入企业介绍").present();
            return false;
        }
        if (this.nameCard.companyIntroduce.length > 30) {
            this.hudService.getToast("企业企业不超过30个字").present();
            return false;
        }
        if (!Util.isNotNullOrUndefined(this.nameCard.mobile) && !Util.isNotNullOrUndefined(this.nameCard.phone) && !Util.isNotNullOrUndefined(this.nameCard.wxNo)) {
            this.hudService.getToast("联系方式至少填一样").present();
            return false;
        }
        if (Util.isNotNullOrUndefined(this.nameCard.mobile)) {
            if (!mobilereg.test(this.nameCard.mobile)) {
                this.hudService.getToast("请填写正确的手机号").present();
                return false;
            }
        }
        if (Util.isNotNullOrUndefined(this.nameCard.phone)) {
            if (!areacodeReg.test(this.nameCard.phone.substring(0, this.nameCard.phone.indexOf("-")))) {
                this.hudService.getToast("请填写正确区号").present();
                return false;
            }
            if (!phoneReg.test(this.nameCard.phone.substring(this.nameCard.phone.indexOf("-") + 1))) {
                this.hudService.getToast("请填写正确的座机号").present();
                return false;
            }
        }
        if (Util.isNotNullOrUndefined(this.nameCard.wxNo) && this.nameCard.wxNo.length > 30) {
            this.hudService.getToast("微信公众号不能超过32个字").present();
            return false;
        }
        if (Util.isNotNullOrUndefined(this.nameCard.remark) && this.nameCard.remark.length > 10) {
            this.hudService.getToast("名片备注不能超过10个字").present();
            return false;
        }
        if (Util.isNotNullOrUndefined(this.nameCard.shopName) && this.nameCard.shopName.length > 32) {
            this.hudService.getToast("网店名称不能超过32个字").present();
            return false;
        }
        if (Util.isNotNullOrUndefined(this.nameCard.shopLink) && this.nameCard.shopLink.length > 100) {
            this.hudService.getToast("网店链接不能超过100个字").present();
            return false;
        }
        return true;
    }

    /**预览 */
    preview() {
        if (Util.isNotNullOrUndefined(this.areacode) || Util.isNotNullOrUndefined(this.phone)) {
            this.nameCard.phone = this.areacode + "-" + this.phone;
        }else{
            this.nameCard.phone="";
        }
        if (this.checkFormValid()) {
            this.push(EnterpriseNamePreviewPage, {
                browser: {
                    url: ConfigService.hostURL + '/cards/preview.htm' + Util.toQueryString(this.nameCard)
                },
                nameCard: this.nameCard,
                background: this.templateBackground,
                edit: this.edit
            });
        }
    }

    /**返回 */
    goBack() {
        this.pop();
    }
}
import {MerchantDetailInfoModalPage} from "./../../../components/merchant-detail-info-modal/merchant-detail-info-modal";
import {ConfigService} from "../../../providers/config-service";
import {UserData} from "./../../../storages/user-data";
import {LoanTypeInfo} from "./../../../models/network/request/user/loan-type-info";
import {IdAuthenticateSuccessPage} from "./../id-authenticate-success/id-authenticate-success";
import {BusinessData} from "./../../../storages/business-data";
import {MerchantFundsChartsPage} from "./../../business/merchant-funds-charts/merchant-funds-charts";
import {UserMerchant} from "./../../../models/merchant/user-merchant";
import {FastLoanLoanDemandPage} from "../../fast-loan/fast-loan-demand/fast-loan-demand";
import {LoanType} from "../../../enums/loan-type";
import {Util} from "../../../utils/util";
import {UserProfile} from "./../../../models/user/user-profile";
import {UserService} from "./../../../requests/user/user-service";
import {PermissionPage} from "./../../base/permission/permission";
import {HudService} from "./../../../providers/hud-service";
import {IdAuthenticationPage} from "./../id-authentication/id-authentication";
import {Component, Inject, forwardRef} from "@angular/core";
import {NavParams, ModalController} from "ionic-angular";
import {StubService} from "../../../requests/stub/stub-service";
import {MerchantInfoPage} from "../merchant-info/merchant-info";
import {DailyLoanChooseMerchantPage} from "../../daily-loan/daily-loan-choose-merchant/daily-loan-choose-merchant";
import {Device} from "ionic-native";
/*
 Generated class for the FastLoanPerfectInfo page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-perfect-info',
    templateUrl: 'perfect-info.html'
})
export class PerfectInfoPage extends PermissionPage {
    profile = new UserProfile();
    verificationStatus: string;
    bindMerchantStatus: string;
    creditReportStatus: string;
    loanType = LoanType.Normal;
    selectedMerchant: UserMerchant;
    hasLoaded = false;
    myPraise: boolean = false;

    constructor(public userData: UserData, public hudService: HudService, public stubService: StubService, @Inject(forwardRef(() => UserService)) public userService: UserService, public navParams: NavParams, public businessData: BusinessData, public modalCtrl: ModalController) {
        super(stubService);
    }

    ionViewDidLoad() {
        super.ionViewDidLoad();
        if (Util.isNotNullOrUndefined(this.navParams.get('loanType'))) {
            this.loanType = this.navParams.get('loanType');
        }
        this.selectedMerchant = this.navParams.get('selectedMerchant');
        this.myPraise = this.navParams.get("myPraise");
    }

    resetCurrentName(): void {
        ConfigService.currentName = 'PerfectInfoPage';
    }

    ionViewDidEnter() {
        super.ionViewDidEnter();
        this.getProfile();
    }

    shouldShowApplyButton() {
        if (Util.isNotNullOrUndefined(this.loanType) && this.loanType !== LoanType.Normal) {
            return true;
        }
        return false;
    }

    verifyId() {
        if (this.hasLoaded && Util.isNotNullOrUndefined(this.profile)) {
            if (!this.profile.hasVerification) {
                this.push(IdAuthenticationPage);
            } else {
                this.push(IdAuthenticateSuccessPage);
            }
        }
    }

    goToMerchantInfo() {
        if (this.hasLoaded && Util.isNotNullOrUndefined(this.profile)) {
            if (!this.profile.hasVerification) {
                this.hudService.getToast('请先完成实名认证').present();
                return;
            }
            this.push(MerchantInfoPage, {loanType: LoanType.Normal});
        }

    }

    goToUploadCredit() {
        if (this.hasLoaded && Util.isNotNullOrUndefined(this.profile)) {
            if (!this.profile.hasVerification) {
                this.hudService.getToast('请先完成实名认证').present();
                return;
            }
            let credit = (<any>window).plugins.credit;
            this.userData.getAccount().subscribe(account => {
                this.stubService.getCredit(data => {
                    data.deviceId = Device.uuid;
                    data.mobile = account.userName;
                    credit.upload([data], () => {
                        this.getProfile();
                    }, () => {
                        this.getProfile();
                    });
                });
            });
        }
    }

    isDailyLoan() {
        if (this.loanType === LoanType.DailyLoan || this.loanType === LoanType.Business) {
            return true;
        }
        return false;
    }

    isFastLoan() {
        if (this.loanType === LoanType.FastLoan) {
            return true;
        }
        return false;
    }

    goChooseMerchant() {
        if (!this.profile.hasVerification) {
            this.hudService.getToast('您还未完成实名认证，请先完成实名认证再添加商户').present();
            return;
        }
        if (this.loanType === LoanType.DailyLoan) {
            this.push(DailyLoanChooseMerchantPage, {selectedMerchant: this.selectedMerchant});
        }

        if (this.loanType === LoanType.FastLoan) {
            this.push(FastLoanLoanDemandPage, {selectedMerchant: this.selectedMerchant});
        }
        if (this.loanType === LoanType.Business) {
            this.push(MerchantFundsChartsPage, {selectedMerchant: this.selectedMerchant});
            this.businessData.setFirstUse();
        }
    }

    loanTypeIsBusiness() {
        if (this.loanType === LoanType.Business) {
            return true;
        } else {
            return false;
        }
    }

    getProfile() {
        let loanTypeInfo = new LoanTypeInfo();
        loanTypeInfo.loanType = this.loanType;
        this.userService.profiles(loanTypeInfo, (profile) => {
            this.profile = profile;
            if (Util.isNotNullOrUndefined(this.selectedMerchant)) {
                this.profile.merchantInfos.forEach((userMerchant, index) => {
                    if (this.selectedMerchant.mchtCd === userMerchant.mchtCd) {
                        this.selectedMerchant.preCredit = userMerchant.preApproval;
                    }
                });
            }
            this.hasLoaded = true;
            this.updateStatus();
        });
    }

    updateStatus() {
        if (Util.isNotNullOrUndefined(this.profile)) {
            this.verificationStatus = '未认证';
            this.creditReportStatus = '未上传';
            if (this.myPraise) {
                this.bindMerchantStatus = '已认证0个';
            } else {
                this.bindMerchantStatus = '可申请0个';
            }
            if (this.profile.hasVerification) {
                this.verificationStatus = '已认证';
            }
            if (this.profile.hasCreditReport) {
                this.creditReportStatus = '已上传';
            }
            if (this.profile.merchantInfos.length >= 0) {
                if (this.myPraise) {
                    this.bindMerchantStatus = '已认证' + this.profile.merchantInfos.length + '个';
                } else {
                    this.bindMerchantStatus = '可申请' + this.profile.merchantInfos.length + '个';
                }
            }
        }
    }

    isValidProfile() {

        if (!this.hasLoaded) {
            return false;
        }
        if (this.isDailyLoan()) {
            return Util.isNotNullOrUndefined(this.profile) && this.profile.hasVerification && this.profile.merchantInfos.length > 0;
        }
        return Util.isNotNullOrUndefined(this.profile) && this.profile.hasCreditReport && this.profile.hasVerification && this.profile.merchantInfos.length > 0;
    }

    shouldShowNotFull() {
        if (this.isDailyLoan()) {
            return Util.isNotNullOrUndefined(this.profile) && this.profile.hasVerification && this.profile.merchantInfos.length > 0;
        }
        return Util.isNotNullOrUndefined(this.profile) && this.profile.hasCreditReport && this.profile.hasVerification && this.profile.merchantInfos.length > 0;
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

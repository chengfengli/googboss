import {JoinAllinpayService} from "./../requests/user/join-allinpay-service";
import {ContractRatesPipe} from "./../pipes/contract-rates-pipe";
import {CalendarModule} from "ion2-calendar/dist";
import {NameCardStatusPipe} from "./../pipes/name-card-status";
import {MoreNameCardData} from "./../storages/morenamecard-data";
import {FastLoanPaymentStatusPipe} from "./../pipes/fast-loan-payment-status-pipe";
import {Util} from "../utils/util";
import "intl";
import "intl/locale-data/jsonp/en";
import {Network} from "@ionic-native/network";
import {Keyboard} from "@ionic-native/keyboard";
import {CurrencyRatesPipe} from "../pipes/currency-rates-pipe";
import {CurrencyFormatPipe} from "../pipes/currency-format-pipe";
import {MerchantStatusPipe} from "../pipes/merchant-status-pipe";
import {StorageService} from "../providers/storage-service";
import {ImageSourcePipe} from "../pipes/image-source-pipe";
import {UserService} from "../requests/user/user-service";
import {HttpService} from "../providers/http-service";
import {UserData} from "../storages/user-data";
import {StubService} from "../requests/stub/stub-service";
import {NgModule, ErrorHandler} from "@angular/core";
import {IonicApp, IonicModule, IonicErrorHandler} from "ionic-angular";
import {IonicStorageModule} from "@ionic/storage";
import {MyApp} from "./app.component";
import {ChartsModule} from "ng2-charts/charts/charts";
import "../../node_modules/chart.js/dist/Chart.bundle.min.js";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {CodePush} from "@ionic-native/code-push";
import {BusinessService} from "../requests/business/business-service";
import {BusinessData} from "../storages/business-data";
import {IonJPushModule} from "ionic2-jpush";
import { BrowserTab } from '@ionic-native/browser-tab';
//首页
import {HomePage} from "../pages/home/home";
import {TabsPage} from "../pages/tabs/tabs";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CustomFormsModule} from "ng2-validation";
//登录注册
import {LoginSignupPage} from "../pages/login/login-signup/login-signup";
import {LoginPage} from "../pages/login/login/login";
import {SignupPage} from "../pages/login/signup/signup";
import {ForgetPwdFirstPage} from "../pages/login/forget-pwd-first/forget-pwd-first";
import {BindPhonePage} from "../pages/login/bind-phone/bind-phone";
import {ResetPwdPage} from "../pages/login/reset-pwd/reset-pwd";
import {ResetPwdSuccessPage} from "../pages/login/reset-pwd-success/reset-pwd-success";
//快快贷
import {FastLoanIntroPage} from "../pages/fast-loan/fast-loan-intro/fast-loan-intro";
import {FastLoanPerfectInfoPage} from "../pages/fast-loan/fast-loan-perfect-info/fast-loan-perfect-info";
//天天融
import {DailyLoanIntroPage} from "../pages/daily-loan/daily-loan-intro/daily-loan-intro";
import {DailyLoanWithdrawDepositPage} from "../pages/daily-loan/daily-loan-withdraw-deposit/daily-loan-withdraw-deposit";
import {DailyLoanContractPage} from "../pages/daily-loan/daily-loan-contract/daily-loan-contract";
import {DailyLoanWithdrawSuccessPage} from "../pages/daily-loan/daily-loan-withdraw-success/daily-loan-withdraw-success";
import {DailyLoanWithdrawFailPage} from "../pages/daily-loan/daily-loan-withdraw-fail/daily-loan-withdraw-fail";
//个人资料
import {PerfectInfoPage} from "../pages/profile/perfect-info/perfect-info";
import {IdAuthenticationPage} from "../pages/profile/id-authentication/id-authentication";
import {MerchantInfoPage} from "../pages/profile/merchant-info/merchant-info";
import {AddMerchantPage} from "../pages/profile/add-merchant/add-merchant";
import {IdAuthenticateSuccessPage} from "../pages/profile/id-authenticate-success/id-authenticate-success";
import {DailyLoanChooseMerchantPage} from "../pages/daily-loan/daily-loan-choose-merchant/daily-loan-choose-merchant";
//service
import {ConfigService} from "../providers/config-service";
import {HudService} from "../providers/hud-service";
//pipe
import {SignupSuccessPage} from "../pages/login/signup-success/signup-success";
import {SmsService} from "../requests/sms/sms-service";
import {ForgetPwdHomePage} from "../pages/login/forget-pwd-home/forget-pwd-home";
import {RegistrationAgreementPage} from "../pages/login/registration-agreement/registration-agreement";
import {MerchantService} from "../requests/merchant/merchant-service";
//modals
import {EnterPwdModalPage} from "../components/enter-pwd-modal/enter-pwd-modal";
import {DailyLoanMerchantListPage} from "../pages/daily-loan/daily-loan-merchant-list/daily-loan-merchant-list";
import {DailyLoanSettingsPage} from "../pages/daily-loan/daily-loan-settings/daily-loan-settings";
import {FastLoanLoanDemandPage} from "../pages/fast-loan/fast-loan-demand/fast-loan-demand";
import {FastLoanMarriedFillInformationPage} from "../pages/fast-loan/fast-loan-married-fill-information/fast-loan-married-fill-information";
import {FastLoanUnmarriedFillInformationPage} from "../pages/fast-loan/fast-loan-unmarried-fill-information/fast-loan-unmarried-fill-information";
import {DailyLoanService} from "../requests/loan/daily-loan-service";
import {GetMoneyStatusPage} from "../pages/fast-loan/fast-loan-get-money-status/fast-loan-get-money-status";
import {GetMoneySuccessPage} from "../pages/fast-loan/fast-loan-get-money-success/fast-loan-get-money-success";
import {FastLoanBillingDetailsPage} from "../pages/fast-loan/fast-loan-billing-details/fast-loan-billing-details";
import {FastLoanRepaymentPage} from "../pages/fast-loan/fast-loan-repayment/fast-loan-repayment";
import {DailyLoanApplyStatusPage} from "../pages/daily-loan/daily-loan-apply-status/daily-loan-apply-status";
import {FastLoanRepaymentPlanPage} from "../pages/fast-loan/fast-loan-repayment-plan/fast-loan-repayment-plan";
import {FastLoanMerchantListPage} from "../pages/fast-loan/fast-loan-merchant-list/fast-loan-merchant-list";
import {FastLoanRepaymentDetailsPage} from "../pages/fast-loan/fast-loan-repayment-details/fast-loan-repayment-details";
import {FastLoanTabsPage} from "../pages/fast-loan/fast-loan-tabs/fast-loan-tabs";
import {FastLoanApplyInfoPreviewPage} from "../pages/fast-loan/fast-loan-apply-info-preview/fast-loan-apply-info-preview";
import {FastLoanApplyStatusPage} from "../pages/fast-loan/fast-loan-apply-status/fast-loan-apply-status";
import {ChoosePaymentModalPage} from "../components/choose-payment-modal/choose-payment-modal";
import {ApplyAllinpayServicePage} from "../pages/boss/apply-allinpay-service/apply-allinpay-service";
import {MyCustomServicePage} from "../pages/boss/my-custom-service/my-custom-service";
import {BossHomePage} from "../pages/boss/boss-home/boss-home";
import {WithdrawApplyStatusPipe} from "../pipes/withdraw-apply-status-pipe";
import {DailyLoanApplyStatusPipe} from "../pipes/daily-loan-apply-status-pipe";
import {MyTtrListPage} from "../pages/boss/my-daily-loan-list/my-daily-loan-list";
import {MyFastLoanListPage} from "../pages/boss/my-fast-loan-list/my-fast-loan-list";
import {MyRepaymentListPage} from "../pages/boss/my-repayment-list/my-repayment-list";
import {ServicePraisePage} from "../pages/boss/service-praise/service-praise";
import {MoreHomePage} from "../pages/more/more-home/more-home";
import {MessagePage} from "../pages/more/message/message";
import {UpdatePasswordPage} from "../pages/more/update-password/update-password";
import {FastLoanService} from "../requests/loan/fast-loan-service";
import {UpdatePhoneVerificationPage} from "../pages/more/update-phone-verification/update-phone-verification";
import {UpdatePhoneResetPage} from "../pages/more/update-phone-reset/update-phone-reset";
import {AboutAllinpayPage} from "../pages/more/about-allinpay/about-allinpay";
import {FastLoanTermsPipe} from "../pipes/fast-loan-terms-pipe";
import {FastLoanRepaymentTypePipe} from "../pipes/fast-loan-repayment-type-pipe";
import {EducationPipe} from "../pipes/education-pipe";
import {MarriedStatusPipe} from "../pipes/married-status-pipe";
import {HousingStatusPipe} from "../pipes/housing-status-pipe";
import {FundsSummaryPage} from "../pages/business/funds-summary/funds-summary";
import {MerchantFundsChartsPage} from "../pages/business/merchant-funds-charts/merchant-funds-charts";
import {POSTransactionsDayPage} from "../pages/business/pos-transactions-day/pos-transactions-day";
import {POSTransactionsMonthlyPage} from "../pages/business/pos-transactions-monthly/pos-transactions-monthly";
import {TodayFundsDetailsPage} from "../pages/business/today-funds-details/today-funds-details";
import {FastLoanContractsPage} from "../pages/fast-loan/fast-loan-contracts/fast-loan-contracts";
import {BusinessIntroPage} from "../pages/business/business-intro/business-intro";
import {RepaymentService} from "../requests/loan/repayment-service";
import {FastLoanRepaymentSourcePipe} from "../pipes/fast-loan-repayment-source-pipe";
import {MessageService} from "../requests/message/message-service";
import {BrowserPopoverPage} from "../components/browser/browser-popover";
import {BrowserPage} from "../components/browser/browser";
import {CallCenterService} from "../requests/call-center/call-center-service";
import {FastLoanInitiativeRepaymentStatusPipe} from "../pipes/fast-loan-initiative-repayment-status-pipe";
import {BasePage} from "../pages/base/base/base";
import {PermissionPage} from "../pages/base/permission/permission";
import {DailyLoanNotSuccessReasonPage} from "../pages/daily-loan/daily-loan-not-success-reason/daily-loan-not-success-reason";
import {TimeStampPipe} from "../pipes/time-stamp-pipe";
import {FastLoanApplyStatusPipe} from "../pipes/fast-loan-apply-status-pipe";
import {SensitiveInformationProtectionPipe} from "../pipes/sensitive-information-protection-pipe";
import {ScreenOrientation} from "@ionic-native/screen-orientation";
/*企业名片*/
import {EnterpriseCardService} from "./../requests/enterprise-name/enterprise-card-service";
import {EnterpriseNameSelectTemplatePage} from "../pages/enterprise-name/enterprisename-selecttemplate/enterprisename-selecttemplate";
import {EnterpriseNameDisclaimerPage} from "./../pages/enterprise-name/enterprise-name-disclaimer/enterprise-name-disclaimer";
import {EnterpriseNameFormPage} from "../pages/enterprise-name/enterprisename-form/enterprisename-form";
import {CardTypePipe} from "../pipes/card-type-pipe";
import {FastLoanUnavailablePage} from "../pages/fast-loan/fast-loan-unavailable/fast-loan-unavailable";
import {EnterpriseNameDetailsPage} from "../pages/enterprise-name/enterprise-name-details/enterprise-name-details";
import {EnterpriseNameMyCardPage} from "../pages/enterprise-name/enterprise-name-my-card/enterprise-name-my-card";
import {Transfer} from "@ionic-native/transfer";
import {EnterpriseNamePreviewPage} from "../pages/enterprise-name/enterprisename-preview/enterprisename-preview";
import {DailyLoanAntiTransactionApplyTypePipe} from "../pipes/daily-loan-anti-transaction-apply-type-pipe";
import {DailyLoanAntiTransactionApplyStatusPipe} from "../pipes/daily-loan-anti-transaction-apply-status-pipe";
import {DailyLoanAntiTransactionStatusPipe} from "../pipes/daily-loan-anti-transaction-status-pipe";
import {SocialSharing} from "@ionic-native/social-sharing";
import {DiscoverHomePage} from "../pages/discover/discover-home/discover-home";
import {Camera} from "@ionic-native/camera";
import {AppVersion} from "@ionic-native/app-version";
import {DatePickerModalPage} from "../components/date-picker-modal/date-picker-modal";
import {IonCalendar} from "../components/ion-calendar/ion-calendar";
import {AllinpayServiceTypePipe} from "../pipes/allinpay-service-type-pipe";
import {StringToDatePipe} from "../pipes/string-to-date-pipe";
import {ResetServerAndPortPage} from "../pages/reset-server-and-port/reset-server-and-port";
import {EnterCaptchaPage} from "../components/enter-captcha/enter-captcha";
import {DailyCurrencyRatesPipe} from "../pipes/daily-currency-rates-pipe";
import {JoinAllinpayPage} from "../pages/boss/join-allinpay/join-allinpay";
import {MerchantDetailInfoModalPage} from "../components/merchant-detail-info-modal/merchant-detail-info-modal";
import {MyFastLoanRepaymentSourcePipe } from '../pipes/my-fast-loan-repayment-source';
@NgModule({
    declarations: [
        MyApp,
        <any>BasePage,
        <any>PermissionPage,
        HomePage,
        TabsPage,
        LoginSignupPage,
        LoginPage,
        SignupPage,
        ForgetPwdFirstPage,
        BindPhonePage,
        ResetPwdPage,
        ResetPwdSuccessPage,
        ImageSourcePipe,
        FastLoanRepaymentSourcePipe,
        FastLoanInitiativeRepaymentStatusPipe,
        DatePickerModalPage,
        MerchantStatusPipe,
        FastLoanIntroPage,
        PerfectInfoPage,
        IdAuthenticationPage,
        FastLoanPerfectInfoPage,
        MerchantInfoPage,
        SignupSuccessPage,
        ForgetPwdHomePage,
        AddMerchantPage,
        IdAuthenticateSuccessPage,
        DailyLoanChooseMerchantPage,
        RegistrationAgreementPage,
        DailyLoanIntroPage,
        DailyLoanContractPage,
        DailyLoanWithdrawDepositPage,
        EnterPwdModalPage,
        DailyLoanWithdrawFailPage,
        DailyLoanWithdrawSuccessPage,
        CurrencyFormatPipe,
        CurrencyRatesPipe,
        WithdrawApplyStatusPipe,
        CardTypePipe,
        TimeStampPipe,
        DailyLoanMerchantListPage,
        DailyLoanSettingsPage,
        FastLoanLoanDemandPage,
        FastLoanMarriedFillInformationPage,
        FastLoanUnmarriedFillInformationPage,
        ResetServerAndPortPage,
        MerchantDetailInfoModalPage,
        GetMoneyStatusPage,
        GetMoneySuccessPage,
        FastLoanPaymentStatusPipe,
        MyFastLoanRepaymentSourcePipe,
        FastLoanBillingDetailsPage,
        FastLoanRepaymentPage,
        DailyLoanApplyStatusPage,
        FastLoanRepaymentPlanPage,
        FastLoanMerchantListPage,
        FastLoanRepaymentDetailsPage,
        FastLoanTabsPage,
        AllinpayServiceTypePipe,
        FastLoanApplyInfoPreviewPage,
        FastLoanApplyStatusPage,
        ChoosePaymentModalPage,
        ApplyAllinpayServicePage,
        MyCustomServicePage,
        BossHomePage,
        DailyLoanApplyStatusPipe,
        FastLoanApplyStatusPipe,
        MyTtrListPage,
        DiscoverHomePage,
        MyFastLoanListPage,
        MyRepaymentListPage,
        ServicePraisePage,
        MoreHomePage,
        MessagePage,
        UpdatePasswordPage,
        UpdatePhoneVerificationPage,
        UpdatePhoneResetPage,
        AboutAllinpayPage,
        FastLoanTermsPipe,
        FastLoanRepaymentTypePipe,
        DailyLoanAntiTransactionApplyTypePipe,
        DailyLoanAntiTransactionApplyStatusPipe,
        DailyLoanAntiTransactionStatusPipe,
        EducationPipe,
        MarriedStatusPipe,
        ContractRatesPipe,
        HousingStatusPipe,
        FundsSummaryPage,
        StringToDatePipe,
        MerchantFundsChartsPage,
        POSTransactionsDayPage,
        POSTransactionsMonthlyPage,
        JoinAllinpayPage,
        TodayFundsDetailsPage,
        FastLoanContractsPage,
        BusinessIntroPage,
        BrowserPopoverPage,
        BrowserPage,
        DailyLoanNotSuccessReasonPage,
        SensitiveInformationProtectionPipe,
        DailyCurrencyRatesPipe,
        IonCalendar,
        //企业名片
        EnterpriseNameSelectTemplatePage,
        EnterpriseNameFormPage,
        FastLoanUnavailablePage,
        EnterpriseNameMyCardPage,
        EnterpriseNameDetailsPage,
        EnterpriseNamePreviewPage,
        EnterCaptchaPage,
        NameCardStatusPipe,
        EnterpriseNameDisclaimerPage
    ],
    imports: [
        IonJPushModule,
        IonicModule.forRoot(MyApp, {
                backButtonText: '',
                backButtonIcon: 'arrow-dropleft',
                iconMode: 'ios',
                mode: 'ios',
                tabsHideOnSubPages: true,
                swipeBackEnabled: false
            },
        ), FormsModule, CustomFormsModule, ReactiveFormsModule, IonicStorageModule.forRoot(), ChartsModule, CalendarModule],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        <any>BasePage,
        <any>PermissionPage,
        HomePage,
        TabsPage,
        LoginSignupPage,
        EnterCaptchaPage,
        LoginPage,
        SignupPage,
        ForgetPwdFirstPage,
        BindPhonePage,
        ResetPwdPage,
        ResetPwdSuccessPage,
        JoinAllinpayPage,
        FastLoanIntroPage,
        PerfectInfoPage,
        IdAuthenticationPage,
        FastLoanPerfectInfoPage,
        MerchantInfoPage,
        SignupSuccessPage,
        MerchantDetailInfoModalPage,
        ForgetPwdHomePage,
        DatePickerModalPage,
        AddMerchantPage,
        IdAuthenticateSuccessPage,
        DailyLoanChooseMerchantPage,
        RegistrationAgreementPage,
        DailyLoanIntroPage,
        DailyLoanContractPage,
        DailyLoanWithdrawDepositPage,
        EnterPwdModalPage,
        DailyLoanWithdrawFailPage,
        DailyLoanWithdrawSuccessPage,
        ResetServerAndPortPage,
        DailyLoanMerchantListPage,
        DailyLoanSettingsPage,
        FastLoanLoanDemandPage,
        FastLoanMarriedFillInformationPage,
        FastLoanUnmarriedFillInformationPage,
        GetMoneyStatusPage,
        DiscoverHomePage,
        GetMoneySuccessPage,
        FastLoanBillingDetailsPage,
        FastLoanRepaymentPage,
        DailyLoanApplyStatusPage,
        FastLoanRepaymentPlanPage,
        FastLoanMerchantListPage,
        FastLoanRepaymentDetailsPage,
        FastLoanTabsPage,
        FastLoanApplyInfoPreviewPage,
        FastLoanApplyStatusPage,
        ChoosePaymentModalPage,
        ApplyAllinpayServicePage,
        MyCustomServicePage,
        BossHomePage,
        MyTtrListPage,
        MyFastLoanListPage,
        MyRepaymentListPage,
        ServicePraisePage,
        MoreHomePage,
        MessagePage,
        UpdatePasswordPage,
        FundsSummaryPage,
        MerchantFundsChartsPage,
        POSTransactionsDayPage,
        POSTransactionsMonthlyPage,
        TodayFundsDetailsPage,
        FastLoanContractsPage,
        BusinessIntroPage,
        UpdatePhoneVerificationPage,
        UpdatePhoneResetPage,
        AboutAllinpayPage,
        BrowserPopoverPage,
        BrowserPage,
        DailyLoanNotSuccessReasonPage,
        //企业名片
        EnterpriseNameSelectTemplatePage,
        EnterpriseNameFormPage,
        FastLoanUnavailablePage,
        EnterpriseNameMyCardPage,
        EnterpriseNameDetailsPage,
        EnterpriseNamePreviewPage,
        EnterpriseNameDisclaimerPage
    ],
    providers: [{
        provide: ErrorHandler,
        useClass: IonicErrorHandler
    }, CallCenterService, BrowserTab, ConfigService, AppVersion, Network, Keyboard, StatusBar, CodePush, SplashScreen, InAppBrowser, HttpService, HudService, UserService, UserData, StorageService, StubService, SmsService, MerchantService, DailyLoanService, FastLoanService, RepaymentService, Util, MessageService, BusinessData, BusinessService, MoreNameCardData, EnterpriseCardService, Transfer, SocialSharing, Camera, ScreenOrientation, JoinAllinpayService]
})
export class AppModule {
}

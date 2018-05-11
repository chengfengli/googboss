import {Observable} from "rxjs";
import {ViewCard} from "../models/enterprisename/view-card";
import {TabsPage} from "./../pages/tabs/tabs";
import {DailyLoanContractPage} from "./../pages/daily-loan/daily-loan-contract/daily-loan-contract";
import {Keyboard} from "@ionic-native/keyboard";
import {MoreHomePage} from "./../pages/more/more-home/more-home";
import {BossHomePage} from "./../pages/boss/boss-home/boss-home";
import {DiscoverHomePage} from "./../pages/discover/discover-home/discover-home";
import {HomePage} from "./../pages/home/home";
import {ScreenOrientation} from "@ionic-native/screen-orientation";
import {HudService} from "./../providers/hud-service";
import {LoginSignupPage} from "./../pages/login/login-signup/login-signup";
import {Util} from "./../utils/util";
import {StubActiveInfo} from "./../models/network/request/stub/stub-active-info";
import {UserData} from "../storages/user-data";
import {ConfigService} from "../providers/config-service";
import {Component} from "@angular/core";
import {App, Platform} from "ionic-angular";
import {CodePush} from "@ionic-native/code-push";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {StubService} from "../requests/stub/stub-service";
import {StubFirstUseInfo} from "../models/network/request/stub/stub-first-use-info";
import {JPushService} from "ionic2-jpush";
import {EnterpriseNameDetailsPage} from "../pages/enterprise-name/enterprise-name-details/enterprise-name-details";
import {BrowserPage} from "../components/browser/browser";
import {LoginPage} from "../pages/login/login/login";
import {FastLoanRepaymentDetailsPage} from "../pages/fast-loan/fast-loan-repayment-details/fast-loan-repayment-details";
import {FastLoanRepaymentPlanPage} from "../pages/fast-loan/fast-loan-repayment-plan/fast-loan-repayment-plan";
import {FastLoanMerchantListPage} from "../pages/fast-loan/fast-loan-merchant-list/fast-loan-merchant-list";
import {DailyLoanMerchantListPage} from "../pages/daily-loan/daily-loan-merchant-list/daily-loan-merchant-list";
import {DailyLoanWithdrawFailPage} from "../pages/daily-loan/daily-loan-withdraw-fail/daily-loan-withdraw-fail";
import {DailyLoanWithdrawSuccessPage} from "../pages/daily-loan/daily-loan-withdraw-success/daily-loan-withdraw-success";
import {EnterpriseNameMyCardPage} from "../pages/enterprise-name/enterprise-name-my-card/enterprise-name-my-card";
import {FastLoanApplyStatusPage} from "../pages/fast-loan/fast-loan-apply-status/fast-loan-apply-status";
import {GetMoneyStatusPage} from "../pages/fast-loan/fast-loan-get-money-status/fast-loan-get-money-status";
import {GetMoneySuccessPage} from "../pages/fast-loan/fast-loan-get-money-success/fast-loan-get-money-success";
import {FastLoanUnavailablePage} from "../pages/fast-loan/fast-loan-unavailable/fast-loan-unavailable";
import {IdAuthenticateSuccessPage} from "../pages/profile/id-authenticate-success/id-authenticate-success";
import {PerfectInfoPage} from "../pages/profile/perfect-info/perfect-info";
import {ResetPwdSuccessPage} from "../pages/login/reset-pwd-success/reset-pwd-success";
import {DailyLoanApplyStatusPage} from "../pages/daily-loan/daily-loan-apply-status/daily-loan-apply-status";
import {FastLoanTabsPage} from "../pages/fast-loan/fast-loan-tabs/fast-loan-tabs";
import {Network} from "@ionic-native/network";


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any;
    exitTime = 0;
    appIsNewOpen = true;
    canPop = true;

    constructor(private network: Network, private keyboard: Keyboard, private jPushPlugin: JPushService, private app: App, private screenOrientation: ScreenOrientation, public stubService: StubService, private codePush: CodePush, private splashScreen: SplashScreen, private statusBar: StatusBar, private platform: Platform, private config: ConfigService, private userData: UserData, private hudService: HudService) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.keyboard.disableScroll(true);
            this.userData.hasLoggedIn().subscribe(data => {
                if (data) {
                    this.rootPage = TabsPage;
                } else {
                    this.rootPage = LoginSignupPage;
                }
            });
            this.saveActiveStub();
            platform.resume.subscribe(e => {
                this.jPushPlugin.setBadge(0);
                this.jPushPlugin.setApplicationIconBadgeNumber(0);
                this.saveActiveStub();
                this.checkUpdate();
            });

            this.userData.isFirstUse().subscribe(data => {
                if (!Util.isNotNullOrUndefined(data)) {
                    this.saveAppFirstStart();
                }
                this.userData.setFirstUse(false);
            });

            setTimeout(() => {
                this.appIsNewOpen = false;
            }, 3000);

            if (platform.is('android')) {
                platform.registerBackButtonAction(() => {
                    let nav = this.app.getActiveNav();
                    let rootNav = this.app.getRootNav();
                    let activeName = nav.getActive();
                    let rootName = rootNav.getViews()[0];
                    if (activeName.instance instanceof HomePage || activeName.instance instanceof BossHomePage || activeName.instance instanceof DiscoverHomePage || activeName.instance instanceof MoreHomePage) {
                        this.toastExitApp();
                    } else if (rootName.instance instanceof LoginSignupPage && activeName.instance instanceof LoginSignupPage) {
                        this.toastExitApp();
                    } else if (rootName.instance instanceof LoginPage && activeName.instance instanceof LoginPage) {
                        this.toastExitApp();
                    } else if (activeName.instance instanceof FastLoanMerchantListPage || activeName.instance instanceof FastLoanRepaymentPlanPage || activeName.instance instanceof FastLoanRepaymentDetailsPage) {
                        if (this.canPop) {
                            this.canPop = false;
                            Observable.fromPromise(rootNav.popToRoot()).subscribe(() => {
                                this.canPop = true;
                            });
                        }
                    } else if (activeName.instance instanceof FastLoanUnavailablePage || activeName.instance instanceof DailyLoanMerchantListPage || activeName.instance instanceof EnterpriseNameMyCardPage) {
                        if (this.canPop) {
                            this.canPop = false;
                            Observable.fromPromise(nav.popToRoot()).subscribe(() => {
                                this.canPop = true;
                            });
                        }
                    } else if (activeName.instance instanceof ResetPwdSuccessPage || activeName.instance instanceof DailyLoanWithdrawFailPage || activeName.instance instanceof DailyLoanWithdrawSuccessPage || activeName.instance instanceof GetMoneySuccessPage) {
                        console.log('do nothing');
                    } else if (activeName.instance instanceof IdAuthenticateSuccessPage) {
                        this.stubService.popTo(PerfectInfoPage);
                    } else if (activeName.instance instanceof GetMoneyStatusPage || activeName.instance instanceof FastLoanApplyStatusPage) {
                        if (ConfigService.preName === "home") {
                            if (this.canPop) {
                                this.canPop = false;
                                Observable.fromPromise(nav.popToRoot()).subscribe(() => {
                                    this.canPop = true;
                                });
                            }
                        }
                    } else {
                        if (nav.canGoBack) {
                            nav.pop();
                        }
                    }
                });
            }

            if (platform.width() < 720) {
                this.config.isLowResolution = true;
            }
            if (platform.is('ios') || platform.is('android')) {
                this.checkUpdate();
                if (platform.is('ios')) {
                    this.statusBar.backgroundColorByHexString('#ffffff');
                }
                setTimeout(() => {
                    this.splashScreen.hide();
                }, 1000);
                this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
                this.init();
                this.jPushPlugin.openNotification()
                    .subscribe(res => {
                        if (this.appIsNewOpen) {
                            setTimeout(() => {
                                this.handleNotification(res);
                            }, 500);
                        } else {
                            this.handleNotification(res);
                        }
                    });
                // this.jPushPlugin.receiveMessage()
                //     .subscribe(res => {
                //         console.log('收到推送');
                //         this.hudService.getAlert('消息', res, [
                //             {
                //                 text: '确定',
                //                 role: 'cancel',
                //                 handler: () => {
                //                 }
                //             }
                //         ]).present();
                //     });
            }
        });
    }

    checkUpdate() {
            if (this.platform.is('ios') || this.platform.is('android')) {
                const downloadProgress = (progress) => {
                    console.debug(`Downloaded ${progress.receivedBytes} of ${progress.totalBytes}`);
                }
                this.codePush.sync({}, downloadProgress).subscribe((syncStatus) => console.log(syncStatus));
            }
    }

    handleNotification(res) {
        let extras: any;
        if (this.platform.is('android')) {
            extras = res.extras;
        } else {
            this.jPushPlugin.setBadge(0);
            this.jPushPlugin.setApplicationIconBadgeNumber(0);
            extras = res;
        }
        let nav = this.app.getActiveNav();
        let rootNav = this.app.getRootNav();
        if (extras.action === 'PAGE') {
            if (this.app.getRootNav().getViews()[0].instance instanceof TabsPage) {

                let fileterViews = rootNav.getViews().filter(view => {
                    return view.instance instanceof FastLoanTabsPage;
                });
                if (fileterViews.length > 0) {
                    Observable.fromPromise(rootNav.popToRoot()).subscribe(() => {
                        this.processNotificationPageResult(extras);
                    });
                } else {
                    let activeName = nav.getActive();
                    if (activeName.instance instanceof HomePage || activeName.instance instanceof BossHomePage || activeName.instance instanceof DiscoverHomePage || activeName.instance instanceof MoreHomePage) {
                        this.processNotificationPageResult(extras, nav.getActive());
                    } else {
                        Observable.fromPromise(nav.popToRoot()).subscribe(() => {
                            this.processNotificationPageResult(extras, nav.getActive());
                        });
                    }
                }
            } else {
                Observable.fromPromise(this.app.getRootNav().setRoot(TabsPage)).subscribe(() => {
                    this.processNotificationPageResult(extras, nav.getActive());
                });
            }
        } else if (extras.action === 'URL') {
            this.stubService.push(BrowserPage, {
                browser: {
                    title: '',
                    url: extras.url
                }
            });
        }
    }

    processNotificationPageResult(extras: any, activeName?: any) {
        if (activeName) {
            if (!(activeName.instance instanceof HomePage)) {
                this.app.getRootNav().getActiveChildNav().select(0);
            }
        }
        if (extras.page === 'EnterpriseNameDetailsPage') {
            let nameCard = new ViewCard();
            nameCard.cardId = extras.cardId;
            this.stubService.push(EnterpriseNameDetailsPage, {
                browser: {
                    url: ConfigService.hostURL + '/cards/views.htm' + Util.toQueryString(nameCard)
                },
                cardId: extras.cardId,
            });
        } else if (extras.page === 'DailyLoanContractPage') {
            this.stubService.push(DailyLoanContractPage, {dailyLoanStatusRequestInfo: extras.dailyLoanStatusRequestInfo});
        } else if (extras.page === 'DailyLoanMerchantListPage') {
            this.stubService.push(DailyLoanMerchantListPage, {selectedMchtCd: extras.selectedMchtCd});
        } else if (extras.page === 'DailyLoanApplyStatusPage') {
            this.stubService.push(DailyLoanApplyStatusPage, {
                selectedMchtCd: extras.selectedMchtCd,
                dailyLoanVerifyResult: extras.dailyLoanVerifyResult,
                dailyLoanStatusRequestInfo: extras.dailyLoanVerifyResult.applicationTid
            });
        } else if (extras.page === 'FastLoanApplyStatusPage') {
            this.stubService.push(FastLoanApplyStatusPage, {fastLoanApplyInfo: extras.fastLoanApplyInfo});
        } else if (extras.page === 'FastLoanTabsPage') {
            // this.app.getRootNav().push(FastLoanTabsPage, {selectedMchtCd: extras.selectedMchtCd});
        } else if (extras.page === 'GetMoneyStatusPage') {
            this.stubService.push(GetMoneyStatusPage, {fastLoanApplyInfo: extras.fastLoanApplyInfo});
        }
    }

    saveActiveStub() {
        let stubActiveInfo = new StubActiveInfo();
        this.userData.getAccount().subscribe(data => {
            if (Util.isNotNullOrUndefined(data)) {
                stubActiveInfo.loginMobile = data.userName;
            }
            this.stubService.saveAppActive(stubActiveInfo);
        });
    }

    /**
     * 注册极光
     */
    init() {
        this.jPushPlugin.init()
            .then(res => {
            })
            .catch(err => {
            });
    }

    toastExitApp() {
        let currentTime = new Date();
        if (currentTime.getTime() - this.exitTime > 2000) {
            this.hudService.getToast('再按一次退出程序').present();
            this.exitTime = new Date().getTime();
        } else {
            this.platform.exitApp();
        }
    }

    saveAppFirstStart() {
        let stubFirstUseInfo = new StubFirstUseInfo();
        this.stubService.saveAppFirstStart(stubFirstUseInfo);
    }
}

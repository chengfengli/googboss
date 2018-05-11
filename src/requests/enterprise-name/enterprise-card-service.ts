import { BaseData } from './../../models/network/response/base/base-data';
import { CardTemplateInfo } from './../../models/enterprisename/card-template-info';
import { EnterpriNameImg } from './../../models/enterprisename/enterpriname';
import { EnterprisenameDto } from './../../models/enterprisename/enterprisenamedto';
import {UserData} from "./../../storages/user-data";
import {Device} from "ionic-native";
import {Platform} from "ionic-angular";
import {StubDeviceInfo} from "../../models/network/request/stub/stub-device-info";
import {HudService} from "../../providers/hud-service";
import {ViewCard} from "./../../models/enterprisename/view-card";
import {ConfigService} from "./../../providers/config-service";
import {SearchGbBusinessCardDTO} from "./../../models/enterprisename/card";
import {Transfer, TransferObject} from "@ionic-native/transfer";
import {ContentType} from "../../enums/content-type";
import {HttpMethod} from "../../enums/http-method";
import {Enterprisename} from "./../../models/enterprisename/enterprisename";
import {HttpService} from "./../../providers/http-service";
import {Injectable, forwardRef, Inject} from "@angular/core";
import {Headers} from "@angular/http";
import "rxjs/add/operator/map";

/*
 企业名片
 */

@Injectable()
export class EnterpriseCardService {
    private stubDeviceInfo: StubDeviceInfo;
    private token: string;

    constructor(@Inject(forwardRef(() => HttpService)) public httpService: HttpService, private transfer: Transfer, public configService: ConfigService, public hudService: HudService, public platform: Platform, private userData: UserData) {
        this.platform.ready().then(() => {
            this.stubDeviceInfo = new StubDeviceInfo(Device.model, Device.uuid, Device.platform, Device.version);
        });
    }

    /**获取模板 */
    getModels(success: (data:CardTemplateInfo[]) => void) {
        this.httpService.httpRequest('/cards/template.htm', null, HttpMethod.Get, ContentType.JSON, (data) => {
            success(data);
        }, null, false);
    }

    /**添加企业名片 */
    addNameCard(nameCard: Enterprisename, success: () => void) {
        this.httpService.httpRequest('/cards.htm', nameCard, HttpMethod.Post, ContentType.JSON, () => {
            success();
        }, null, false);
    }

    /**图片上传 */
    imgUpload(imgDate: string, success: (result) => void) {
        let headers = new Headers();
        this.userData.getToken().subscribe((token) => {
            this.token = token;
            headers.append('COOKIE', 'GSESSIONID=' + this.token);
            const fileTransfer: TransferObject = this.transfer.create();
            fileTransfer.upload(imgDate, ConfigService.hostURL + "/cards/upload.htm", { headers: headers }).then((data) => {
                success(data);
            }).catch((data) => {
                this.hudService.getToast("系统错误").present();
            });
        });
    }

    /**修改企业名片 */
    editNameCard(nameCard: EnterprisenameDto, success: () => void) {
        this.httpService.httpRequest('/cards.htm', nameCard, HttpMethod.Put, ContentType.JSON, () => {
            success();
        }, null, false);
    }

    /**我的名片 */
    getNameCard(card: SearchGbBusinessCardDTO, success: (data:BaseData<EnterpriNameImg>) => void, fail?: (data) => void, handleNetworkError?: () => void) {
        this.httpService.httpRequest(ConfigService.hostURL + '/cards/pages.htm', card, HttpMethod.Get, ContentType.JSON, (data) => {
            success(data);
        }, (data) => {
            if (fail) {
                fail(data);
            }
        }, false, handleNetworkError);
    }

    /**获取名片 */
    getNameCardById(cardId: ViewCard, success: (data:EnterpriNameImg) => void) {
        this.httpService.httpRequest(ConfigService.hostURL + '/cards/card.htm', cardId, HttpMethod.Get, ContentType.JSON, (data) => {
            success(data);
        }, null, false);
    }
}

import {StorageService} from "../providers/storage-service";
import {Injectable, forwardRef, Inject} from "@angular/core";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";

/**企业名片更多信息 */
@Injectable()
export class MoreNameCardData {

    constructor(@Inject(forwardRef(() => StorageService)) public storageService: StorageService) {
    }

    setShopName(shopName: string) {
        this.storageService.set('shopName', shopName);
    }

    getShopName(): Observable<string> {
        return this.storageService.get('shopName');
    }

    setShopLink(shopLink: string): Observable<string> {
        return this.storageService.set('shopLink', shopLink);
    }

    getShopLink(): Observable<string> {
        return this.storageService.get('shopLink');
    }

    setImg1(img1: string): Observable<string> {
        return this.storageService.set('img1', img1);
    }

    getImg1(): Observable<string> {
        return this.storageService.get('img1');
    }

    setImg2(img2: string): Observable<string> {
        return this.storageService.set('img2', img2);
    }

    getImg2(): Observable<string> {
        return this.storageService.get('img2');
    }

    setImg3(img3: string): Observable<string> {
        return this.storageService.set('img3', img3);
    }

    getImg3(): Observable<string> {
        return this.storageService.get('img3');
    }
}

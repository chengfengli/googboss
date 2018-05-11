import {StorageService} from "../providers/storage-service";
import {Injectable, forwardRef, Inject} from "@angular/core";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";

/*
 Generated class for the BusinessData provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class BusinessData {

    constructor(@Inject(forwardRef(() => StorageService)) public storageService: StorageService) {
    }

    setFirstUse() {
        this.storageService.set('firstUseBusiness', true);
    }

    getFirstUse(): Observable<boolean> {
        return this.storageService.get('firstUseBusiness');
    }
}

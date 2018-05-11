import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {Storage} from "@ionic/storage";

/*
 Generated class for the StorageService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class StorageService {

    constructor(public storage: Storage) {
        console.log('Hello StorageService Provider');
    }

    get(key: string): Observable<any> {
        return Observable.fromPromise(this.storage.get(key)).map(data => {
            return JSON.parse(data)
        });
    }

    set(key, value) {
        let newData = JSON.stringify(value);
        return Observable.fromPromise(this.storage.set(key, newData));
    }

    remove(key) {
        return Observable.fromPromise(this.storage.remove(key));
    }
}
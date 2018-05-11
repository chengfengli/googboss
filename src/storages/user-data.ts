import {StorageService} from "../providers/storage-service";
import {Injectable, forwardRef, Inject} from "@angular/core";
import {Observable} from "rxjs";
import {USER} from "../constants/constants";
import {Account} from "../models/user/account";

/*
 Generated class for the AccountData provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class UserData {

    constructor(@Inject(forwardRef(() => StorageService)) public storageService: StorageService) {
    }

    setToken(token: string) {
        this.storageService.set('token', token);
    }

    getToken(): Observable<string> {
        return this.storageService.get('token');
    }

    removeToken() {
        return this.storageService.remove('token');
    }

    getAccount(): Observable<Account> {
        return this.storageService.get('account');
    }

    setAccount(account: Account) {
        return this.storageService.set('account', account);
    }

    setHasLoggedIn(loggedIn: boolean) {
        return this.storageService.set(USER.HAS_LOGGED_IN, loggedIn);
    }

    hasLoggedIn(): Observable<boolean> {
        return this.storageService.get(USER.HAS_LOGGED_IN);
    }

    setFirstUse(isFirst: boolean) {
        return this.storageService.set(USER.FIRST_USE, isFirst);
    }

    isFirstUse(): Observable<boolean> {
        return this.storageService.get(USER.FIRST_USE);
    }

    clearUserInfo() {
        return this.setHasLoggedIn(false).combineLatest(this.removeToken());
    }

}



/**
 * Created by Allen on 2017/3/2.
 */
export class Account {
    userName: string;
    password: string;
    isPhoneLogin: boolean;

    constructor(userName: string, password: string, isPhoneLogin = true) {
        this.userName = userName;
        this.password = password;
        this.isPhoneLogin = isPhoneLogin;
    }
}
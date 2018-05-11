/**
 * Created by Allen on 2017/3/9.
 */
export class UserAuthenticationInfo {
    name: string;
    mobile: string;
    idCard: string;
    cardType: string;

    constructor(name: string, mobile: string, idCard: string, cardType: string) {
        this.name = name;
        this.mobile = mobile;
        this.idCard = idCard;
        this.cardType = cardType;
    }
}
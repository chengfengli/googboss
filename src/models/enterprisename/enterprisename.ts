export class Enterprisename {
    cardId: number;// 名片表主键
    userId: number;//用户ID
    templateNo: string;// 模板字段ID
    cardName: string;// 名片名称
    cardIntroduce: string;// 名片介绍
    companyName: string;//企业名称
    companyIntroduce: string;//企业介绍
    phone: string;// 电话号码
    mobile: string;// 手机号码
    wxNo: string;// 微信公众号/商号
    remark: string;//名片备注
    logo: string;// 商户的logo
    shopName: string;// 商店名称
    shopLink: string;// 商户微店链接
    shopImg1: string;// 商户上传的图片1
    shopImg2: string;// 商户上传的图片2
    shopImg3: string;// 商户上传的图片3
    status: string;// 状态
    delete:boolean;// 是否删除
	createTime:Date;// 创建时间
	createUserOrgId:number;// 创建用户的组织机构ID
	lastUpdateTime:Date;// 最后更新时间
	lastUpdateUserOrgId:number;// 最后更新用户的组织机构ID
	hfCardId:number; //乐融原企业名片id
}
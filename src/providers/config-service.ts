import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {DailyLoanMerchantStatus} from "../models/network/response/loan/daily-loan-merchant-status";
import {FastLoanMerchantStatus} from "../models/network/response/loan/fast-loan-merchant-status";

/*
 Generated class for the ConfigService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */

@Injectable()
export class ConfigService {
    isDev = false;
    static hostURL: string = "http://app.haolaoban168.com";
    static imageURL: string = "http://prd-gb-img.haolaoban168.com";
    // APP接口 app.haolaoban168.com
// 图片 prd-gb-img.haolaoban168.com
// 下载 download.haolaoban168.com
    isLowResolution = false;
    static shouldReloadHome = true;
    static rootName: string;
    static activeName: string;
    static dailyLoanMerchants: DailyLoanMerchantStatus[] = [];
    static fastLoanMerchants: FastLoanMerchantStatus[] = [];
    static currentName: string;
    static preName: string;

    constructor() {
    }

    getIdCardTypes() {
        return [
            {'id': 'I', 'name': '身份证'},
            {'id': 'R', 'name': '户口簿'},
            {'id': 'P', 'name': '护照'},
            {'id': 'S', 'name': '军官证/士兵证'},
            {'id': 'H', 'name': '港澳居民来往内地通行证'},
            {'id': 'W', 'name': '台湾同胞来往内地通行证'},
            {'id': 'T', 'name': '临时身份证'},
            {'id': 'F', 'name': '外国人居留证'},
            {'id': 'L', 'name': '营业执照'},
            {'id': 'C', 'name': '警官证'},
            {'id': 'O', 'name': '其他证件'}
        ]
    }

    // getBankTypes() {
    //     return [
    //         {'id': '0102', 'name': '工商银行'},
    //         {'id': '0103', 'name': '农业银行'},
    //         {'id': '0104', 'name': '中国银行'},
    //         {'id': '0105', 'name': '建设银行'},
    //         {'id': '0301', 'name': '交通银行'},
    //         {'id': '0308', 'name': '招商银行'},
    //         {'id': '0303', 'name': '光大银行'},
    //         {'id': '0305', 'name': '民生银行'},
    //         {'id': '0309', 'name': '兴业银行'},
    //         {'id': '0302', 'name': '中信银行'},
    //         {'id': '0306', 'name': '广发银行'},
    //         {'id': '0310', 'name': '浦发银行'},
    //         {'id': '0410', 'name': '平安银行'},
    //         {'id': '0403', 'name': '邮储银行'},
    //         {'id': '0304', 'name': '华夏银行'},
    //     ]
    // }

    getFastLoanRepaymentTypes() {
        return [
            {'id': 'D', 'name': '日还'},
            {'id': 'W', 'name': '周还'},
            {'id': 'H', 'name': '双周还'}
        ]
    }

    getFastLoanTerms() {
        return [
            {'id': '3', 'name': '3个月'},
            {'id': '6', 'name': '6个月'},
            {'id': '9', 'name': '9个月'},
            {'id': '12', 'name': '12个月'}
        ]
    }

    getHouseTypes() {
        return [
            {'id': '1', 'name': '自有无房贷'},
            {'id': '2', 'name': '自有有房贷'},
            {'id': '3', 'name': '宿舍'},
            {'id': '4', 'name': '租赁'},
            {'id': '5', 'name': '其他'}
        ]
    }

    getRelationTypes() {
        return [
            {'id': '2', 'name': '父亲'},
            {'id': '3', 'name': '母亲'},
            {'id': '4', 'name': '儿子'},
            {'id': '5', 'name': '女儿'}
        ]
    }

    // getCustomerServiceTypes() {
    //     return [
    //         {'mainId': '123', 'subId': '141', 'name': '异常电话-错号'},
    //         {'mainId': '123', 'subId': '144', 'name': '异常电话-骚扰电话'},
    //         {'mainId': '123', 'subId': '143', 'name': '异常电话-测试电话'},
    //         {'mainId': '123', 'subId': '142', 'name': '异常电话-断线'},
    //         {'mainId': '124', 'subId': '641', 'name': '传统受理业务-密码重置'},
    //         {'mainId': '124', 'subId': '145', 'name': '传统受理业务-POS机报修'},
    //         {'mainId': '124', 'subId': '147', 'name': '传统受理业务-账务查询'},
    //         {'mainId': '124', 'subId': '148', 'name': '传统受理业务-耗材配送'},
    //         {'mainId': '124', 'subId': '149', 'name': '传统受理业务-申请装机'},
    //         {'mainId': '124', 'subId': '150', 'name': '传统受理业务-业务咨询'},
    //         {'mainId': '124', 'subId': '151', 'name': '传统受理业务-账务调整'},
    //         {'mainId': '124', 'subId': '152', 'name': '传统受理业务-撤机'},
    //         {'mainId': '124', 'subId': '153', 'name': '传统受理业务-其它业务申办'},
    //         {'mainId': '124', 'subId': '154', 'name': '传统受理业务-资料变更'},
    //         {'mainId': '124', 'subId': '155', 'name': '传统受理业务-增机'},
    //         {'mainId': '124', 'subId': '156', 'name': '传统受理业务-换机'},
    //         {'mainId': '124', 'subId': '643', 'name': '传统受理业务-业务合作'},
    //         {'mainId': '131', 'subId': '710', 'name': '工作联系-工单催办'},
    //         {'mainId': '131', 'subId': '193', 'name': '工作联系-电话转接'},
    //         {'mainId': '131', 'subId': '192', 'name': '工作联系-日常业务联系'},
    //         {'mainId': '131', 'subId': '191', 'name': '工作联系-反馈客户'},
    //         {'mainId': '132', 'subId': '621', 'name': '客户回访-随薪借贷后回访'},
    //         {'mainId': '132', 'subId': '711', 'name': '客户回访-多媒体工单回访'},
    //         {'mainId': '132', 'subId': '713', 'name': '客户回访-工单处理结果反馈'},
    //         {'mainId': '132', 'subId': '196', 'name': '客户回访-工单满意度回访'},
    //         {'mainId': '132', 'subId': '501', 'name': '客户回访-通联宝POS贷还款提醒回访'},
    //         {'mainId': '132', 'subId': '712', 'name': '客户回访-投诉工单回访'},
    //         {'mainId': '132', 'subId': '715', 'name': '客户回访-快快贷放弃签约回访'},
    //         {'mainId': '132', 'subId': '194', 'name': '客户回访-新商户欢迎回访'},
    //         {'mainId': '132', 'subId': '716', 'name': '客户回访-快快贷续贷推动回访'},
    //         {'mainId': '133', 'subId': '662', 'name': '账户支付-POS机报修'},
    //         {'mainId': '133', 'subId': '673', 'name': '账户支付-基金支付'},
    //         {'mainId': '133', 'subId': '674', 'name': '账户支付-证券业务'},
    //         {'mainId': '133', 'subId': '665', 'name': '账户支付-账务调整'},
    //         {'mainId': '133', 'subId': '666', 'name': '账户支付-资料变更'},
    //         {'mainId': '133', 'subId': '668', 'name': '账户支付-业务咨询'},
    //         {'mainId': '133', 'subId': '672', 'name': '账户支付-网关支付'},
    //         {'mainId': '133', 'subId': '664', 'name': '账户支付-账务查询'},
    //         {'mainId': '133', 'subId': '663', 'name': '账户支付-耗材配送'},
    //         {'mainId': '133', 'subId': '667', 'name': '账户支付-撤机'},
    //         {'mainId': '133', 'subId': '669', 'name': '账户支付-业务合作'},
    //         {'mainId': '133', 'subId': '670', 'name': '账户支付-代收代付'},
    //         {'mainId': '133', 'subId': '671', 'name': '账户支付-信用卡还款'},
    //         {'mainId': '134', 'subId': '199', 'name': '其他咨询-其他咨询'},
    //         {'mainId': '134', 'subId': '709', 'name': '其他咨询-持卡人交易查询'},
    //         {'mainId': '135', 'subId': '200', 'name': '建议-对分支机构建议'},
    //         {'mainId': '135', 'subId': '202', 'name': '建议-对客服中心建议'},
    //         {'mainId': '135', 'subId': '201', 'name': '建议-对公司业务建议'},
    //         {'mainId': '136', 'subId': '208', 'name': '投诉-投诉特约商户'},
    //         {'mainId': '136', 'subId': '203', 'name': '投诉-投诉商城'},
    //         {'mainId': '136', 'subId': '204', 'name': '投诉-投诉供应商'},
    //         {'mainId': '136', 'subId': '205', 'name': '投诉-投诉分支机构'},
    //         {'mainId': '136', 'subId': '207', 'name': '投诉-投诉客服中心人员'},
    //         {'mainId': '137', 'subId': '212', 'name': '表扬-表扬客服中心人员'},
    //         {'mainId': '137', 'subId': '209', 'name': '表扬-表扬分支机构'},
    //         {'mainId': '343', 'subId': '384', 'name': '通联钱包-其他'},
    //         {'mainId': '343', 'subId': '699', 'name': '通联钱包-风险核查'},
    //         {'mainId': '343', 'subId': '698', 'name': '通联钱包-产品功能'},
    //         {'mainId': '343', 'subId': '697', 'name': '通联钱包-会员认证'},
    //         {'mainId': '343', 'subId': '344', 'name': '通联钱包-账户管理'},
    //         {'mainId': '361', 'subId': '645', 'name': '收银宝-网上收银'},
    //         {'mainId': '361', 'subId': '642', 'name': '收银宝-密码重置'},
    //         {'mainId': '361', 'subId': '644', 'name': '收银宝-提现转出'},
    //         {'mainId': '361', 'subId': '369', 'name': '收银宝-撤机'},
    //         {'mainId': '361', 'subId': '646', 'name': '收银宝-业务合作'},
    //         {'mainId': '361', 'subId': '368', 'name': '收银宝-账务调整'},
    //         {'mainId': '361', 'subId': '367', 'name': '收银宝-业务咨询'},
    //         {'mainId': '361', 'subId': '366', 'name': '收银宝-申请装机'},
    //         {'mainId': '361', 'subId': '365', 'name': '收银宝-耗材配送'},
    //         {'mainId': '361', 'subId': '364', 'name': '收银宝-账务查询'},
    //         {'mainId': '361', 'subId': '362', 'name': '收银宝-POS机报修'},
    //         {'mainId': '361', 'subId': '373', 'name': '收银宝-换机'},
    //         {'mainId': '361', 'subId': '372', 'name': '收银宝-增机'},
    //         {'mainId': '361', 'subId': '370', 'name': '收银宝-其他业务申办'},
    //         {'mainId': '361', 'subId': '371', 'name': '收银宝-资料变更'},
    //         {'mainId': '647', 'subId': '650', 'name': '当面付-资料变更'},
    //         {'mainId': '647', 'subId': '649', 'name': '当面付-账务调整'},
    //         {'mainId': '647', 'subId': '648', 'name': '当面付-账务查询'},
    //         {'mainId': '647', 'subId': '651', 'name': '当面付-业务申请'},
    //         {'mainId': '647', 'subId': '654', 'name': '当面付-业务咨询'},
    //         {'mainId': '647', 'subId': '653', 'name': '当面付-提现'},
    //         {'mainId': '647', 'subId': '652', 'name': '当面付-业务取消'},
    //         {'mainId': '647', 'subId': '655', 'name': '当面付-业务合作'},
    //         {'mainId': '656', 'subId': '660', 'name': '预付费卡业务-业务咨询'},
    //         {'mainId': '656', 'subId': '657', 'name': '预付费卡业务-POS机报修'},
    //         {'mainId': '656', 'subId': '661', 'name': '预付费卡业务-业务合作'},
    //         {'mainId': '656', 'subId': '659', 'name': '预付费卡业务-账务查询'},
    //         {'mainId': '656', 'subId': '658', 'name': '预付费卡业务-耗材配送'},
    //         {'mainId': '675', 'subId': '679', 'name': '其他业务办理-其他业务合作'},
    //         {'mainId': '675', 'subId': '677', 'name': '其他业务办理-通联钱包速开发票业务'},
    //         {'mainId': '675', 'subId': '676', 'name': '其他业务办理-风险类业务咨询'},
    //         {'mainId': '680', 'subId': '684', 'name': '理财-收银财'},
    //         {'mainId': '680', 'subId': '682', 'name': '理财-薪利宝'},
    //         {'mainId': '680', 'subId': '683', 'name': '理财-通联宝'},
    //         {'mainId': '680', 'subId': '685', 'name': '理财-业务合作'},
    //         {'mainId': '680', 'subId': '686', 'name': '理财-其他'},
    //         {'mainId': '681', 'subId': '689', 'name': '贷款-随薪借'},
    //         {'mainId': '681', 'subId': '696', 'name': '贷款-其他'},
    //         {'mainId': '681', 'subId': '693', 'name': '贷款-光大POS贷'},
    //         {'mainId': '681', 'subId': '692', 'name': '贷款-浦发POS贷'},
    //         {'mainId': '681', 'subId': '695', 'name': '贷款-业务合作'},
    //         {'mainId': '681', 'subId': '694', 'name': '贷款-车点通'},
    //         {'mainId': '681', 'subId': '691', 'name': '贷款-上海POS贷'},
    //         {'mainId': '681', 'subId': '690', 'name': '贷款-小通分期'},
    //         {'mainId': '681', 'subId': '688', 'name': '贷款-天天融'},
    //         {'mainId': '681', 'subId': '687', 'name': '贷款-快快贷'},
    //         {'mainId': '701', 'subId': '702', 'name': '充值缴费-校园缴费'},
    //         {'mainId': '701', 'subId': '704', 'name': '充值缴费-其他'},
    //         {'mainId': '701', 'subId': '703', 'name': '充值缴费-手机充值'},
    //         {'mainId': '705', 'subId': '706', 'name': '购物消费-银电商'},
    //         {'mainId': '705', 'subId': '708', 'name': '购物消费-其他'},
    //         {'mainId': '705', 'subId': '707', 'name': '购物消费-品质特产'}
    //     ];
    // }


    getCustomerServiceTypes() {
        return [
            {'mainId': '124', 'subId': '145', 'name': '终端报修-POS机报修'},
            {'mainId': '124', 'subId': '148', 'name': '耗材配送-送签购单'},
            {'mainId': '124', 'subId': '154', 'name': '资料变更'},
            {'mainId': '124', 'subId': '147', 'name': '帐务查询'},
            {'mainId': '124', 'subId': '155', 'name': '终端变更-增机'},
            {'mainId': '124', 'subId': '152', 'name': '终端变更-撤机'},
            {'mainId': '124', 'subId': '156', 'name': '终端变更-换机'},
            {'mainId': '134', 'subId': '199', 'name': '其他咨询'},
            {'mainId': '136', 'subId': '208', 'name': '投诉-投诉特约商户'},
            {'mainId': '136', 'subId': '203', 'name': '投诉-投诉商城'},
            {'mainId': '136', 'subId': '204', 'name': '投诉-投诉供应商'},
            {'mainId': '136', 'subId': '205', 'name': '投诉-投诉分支机构'},
            {'mainId': '136', 'subId': '207', 'name': '投诉-投诉客服中心人员'},
            {'mainId': '135', 'subId': '200', 'name': '建议-对分支机构建议'},
            {'mainId': '135', 'subId': '202', 'name': '建议-对客服中心建议'},
            {'mainId': '135', 'subId': '201', 'name': '建议-对公司业务建议'},
            {'mainId': '681', 'subId': '687', 'name': '贷款-快快贷'},
            {'mainId': '681', 'subId': '688', 'name': '贷款-天天融'},
            {'mainId': '681', 'subId': '689', 'name': '贷款-随薪借'},
        ];
    }
}










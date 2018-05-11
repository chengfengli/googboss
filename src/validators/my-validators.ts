import "rxjs/add/operator/map";
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {TIPS} from "../constants/constants";

/*
 Generated class for the ValidatorService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
export class MyValidators {

    static getFormErrorMessages(form: FormGroup): string[] {
        let validationMessages = {
            'mobile': {
                'required': TIPS.PHONE_LOGIN_PLACEHOLDER,
                'pattern': TIPS.PHONE_LOGIN_ERROR_PLACEHOLDER
            },
            'referral': {
                'pattern': TIPS.PHONE_REFERRAL_ERROR_PLACEHOLDER
            },
            'merchant': {
                'required': TIPS.MERCHANT_LOGIN_PLACEHOLDER
            },
            'verCode': {
                'required': '请输入验证码'
            },
            'password': {
                'required': TIPS.LOGIN_PASSWORD_PLACEHOLDER,
            },
            'confirmPassword': {
                'required': '请再次确认密码',
                'equalTo': '两次输入密码不一致'
            },
            'legalEntityName': {
                'required': '请输入法人姓名',
                'maxlength': '姓名不能超过15位'
            },
            'cardType': {
                'required': '请选择证件类型'
            },
            'cardNum': {
                'required': '请输入证件号'
            },
            'bank': {
                'required': '请选择开户行'
            },
            'bankNum': {
                'required': '请输入银行卡号',
                'maxlength': '银行卡号不能超过30位'
            },
            'bankMobile': {
                'required': TIPS.PHONE_LOGIN_PLACEHOLDER,
                'pattern': TIPS.PHONE_LOGIN_ERROR_PLACEHOLDER
            },
            'bankVerCode': {
                'required': '请输入验证码'
            },
            'mchtCd': {
                'required': '请输入商户号'
            },
            'verifyMchtCd': {
                'required': '请输入密码'
            },
            'loanAmount': {
                'required': '请输入贷款金额'
            },
            'deadline': {
                'required': '请选择贷款期限'
            },
            'captchaCode': {
                'required': '请输入图形验证码',
            },
            'repayment': {
                'required': '请选择还款方式'
            },
            'spouseName': {
                'required': '请输入配偶姓名'
            },
            'spouseCardType': {
                'required': '请选择配偶证件类型'
            },
            'spouseCardNum': {
                'required': '请输入配偶证件号'
            },
            'spousePhoneNum': {
                'required': '请输入配偶手机号',
                'pattern': TIPS.PHONE_LOGIN_ERROR_PLACEHOLDER
            },
            'marryBorrowerAddress': {
                'required': '请输入贷款人家庭住址'
            },
            'spouseAddress': {
                'required': '请输入配偶家庭住址'
            },
            'spouseLiveNature': {
                'required': '请选择配偶居住性质'
            },
            'kinsfolkName': {
                'required': '请输入直系亲属姓名'
            },
            'kinsfolkPhoneNum': {
                'required': '请输入直系亲属手机号码',
                'pattern': TIPS.PHONE_LOGIN_ERROR_PLACEHOLDER
            },
            'kinsfolkRelationship': {
                'required': '请选择直系亲属关系'
            },
            'borrowerAddress': {
                'required': '请输入贷款人家庭住址'
            },
            'oldPassword': {
                'required': '请输入原密码',
            },
            'newPassword': {
                'required': '请输入新密码',
            },
            'confirmNewPassword': {
                'required': '请再次确认新密码',
                'equalTo': '两次输入密码不一致'
            },
            'customerServiceType': {
                'required': '请选择业务申请类型'
            },
            'timeStarts': {
                'required': '请选择开始时间'
            },
            'timeEnds': {
                'required': '请选择结束时间'
            },
            'contractAddress': {
                'required': '请输入联系地址'
            },
            'mcthName': {
                'required': '请输入商户名称'
            },
            'contractName': {
                'required': '请输入联系人姓名'
            },
            'contractPhone': {
                'required': '请输入联系人电话',
                'pattern': TIPS.PHONE_LOGIN_ERROR_PLACEHOLDER
            },
            'remark': {
                'required': '请输入您的详细描述',
                'pattern': TIPS.PHONE_LOGIN_ERROR_PLACEHOLDER,
                'minlength': "备注字数至少10位"
            }
        };

        let errMsgs: string[] = [];
        let keys = Object.keys(validationMessages);

        for (const index in keys) {

            let field = keys[index];

            const control = form.get(field);

            if (control && !control.valid) {
                const messages = validationMessages[field];
                for (const key in control.errors) {
                    console.log(control.errors)
                    errMsgs.push(messages[key]);
                }
            }
        }
        return errMsgs;
    }

    static getPhoneValidators(): ValidatorFn | ValidatorFn[] {
        return [Validators.required, Validators.pattern(/0?(1)[0-9]{10}$/)];//CustomValidators.phone('zh-CN')
    }

    static getFastLoatAmount

    static getPasswordValidators(): ValidatorFn | ValidatorFn[] {
        return [Validators.required];
    }

    static getMerchantNoValidators(): ValidatorFn | ValidatorFn[] {
        return [Validators.required];
    }

    static checkPhoneIsValid(mobileControl): boolean {
        if (mobileControl.hasError('pattern') || mobileControl.hasError('required')) {
            return false;
        }
        return true;
    }

    static validateEmail(control: FormControl) {
        let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        return EMAIL_REGEXP.test(control.value) ? null : {
                validateEmail: {
                    valid: false
                }
            };
    }

    static validateEqual(control: FormControl, validateEqual: string) {
        let v = control.value;

        // control value (e.g. password)
        let e = control.root.get(validateEqual);

        // value not equal
        if (e && v !== e.value) return {
            validateEqual: false
        }
        return null;
    }

    static validateMobile(control: FormControl) {
        let MOBILE_REGEXP = /^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$/i;
        return MOBILE_REGEXP.test(control.value) ? null : {
                validateMobile: {
                    valid: false
                }
            };
    }

    static validateCheckboxes(boxes: FormControl) {
        var valid: boolean = false,
            k: any;

        for (k in boxes.value) {
            var val = boxes.value[k];

            if (val) {
                valid = true;
                break;
            }
        }

        if (valid) {
            return null;
        }

        return {
            checkboxRequired: true
        };
    }
}

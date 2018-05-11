export class BaseResponse {
    code: number;
    data: any;
    message: string;
    errMsg: string;
    token: string;
    stackTrace: string;
}
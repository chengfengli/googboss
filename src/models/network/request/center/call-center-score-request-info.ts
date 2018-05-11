export class CallCenterScoreRequestInfo {
    mchtNo: string;
    code: string;
    scoreSpeed: number;
    scoreQuality: number;
    scoreAttitude: number;
    scoreAvg: number;


    constructor(mchtNo: string, code: string, scoreSpeed: number, scoreQuality: number, scoreAttitude: number, scoreAvg: number) {
        this.mchtNo = mchtNo;
        this.code = code;
        this.scoreSpeed = scoreSpeed;
        this.scoreQuality = scoreQuality;
        this.scoreAttitude = scoreAttitude;
        this.scoreAvg = scoreAvg;
    }
}
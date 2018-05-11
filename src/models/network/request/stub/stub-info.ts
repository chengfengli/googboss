export class StubInfo {
    stayTime: number;
    pageId: string;
    requestIp: string;
    userId: number;

    constructor(duration: number, pageId: string) {
        this.stayTime = duration;
        this.pageId = pageId;
    }
}
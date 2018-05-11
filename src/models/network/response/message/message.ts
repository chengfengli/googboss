/**
 * Created by Allen on 2017/3/21.
 */
export class Message {
    id: number;
    title: string;
    action: string;
    toUserId: number;
    delete: boolean;
    createTime: Date;
    createUserId: number;
    lastUpdateTime: Date;
    lastUpdateUserId: number;
    extras: string;
    businessKey: string;
    parameters: string;
    page: string;
}
/**
 * Created by Allen on 2017/3/3.
 */
export class BaseData<T> {
    results: Array<T>;
    pageNo: number;
    pageSize: number;
    total: number;
    pageNumCount: number;
    actionUrl: string;
    offset: number;
    totalPage: number
}
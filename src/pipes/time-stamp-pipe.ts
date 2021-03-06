import {Injectable, Pipe} from "@angular/core";

/*
 Generated class for the TimeStampPipe pipe.

 See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 Angular 2 Pipes.
 */
@Pipe({
    name: 'timePipe'
})
@Injectable()
export class TimeStampPipe {
    /*
     Takes a value and makes it lowercase.
     */
    transform(value, args) {
        if (value) {
            value = this.getDateDiff(value)
        }
        return value;
    }

    getDateDiff(time: string): string {
        let result;
        let minute: number = 1000 * 60;
        let hour: number = minute * 60;
        let day: number = hour * 24;
        let month: number = day * 30;
        let now = new Date().getTime();
        let old = new Date(time).getTime();
        let diffValue = now - old;
        var monthC = diffValue / month;
        var weekC = diffValue / (7 * day);
        var dayC = diffValue / day;
        var hourC = diffValue / hour;
        var minC = diffValue / minute;
        if (monthC >= 1) {
            result = Math.round(monthC) + "个月前";
        }
        else if (weekC >= 1) {
            result = Math.round(weekC) + "周前";
        }
        else if (dayC >= 1) {
            result = Math.round(dayC) + "天前";
        }
        else if (hourC >= 1) {
            result = Math.round(hourC) + "小时前";
        }
        else if (minC >= 1) {
            result = Math.round(minC) + "分钟前";
        } else
            result = "刚刚";
        return result;
    }
}

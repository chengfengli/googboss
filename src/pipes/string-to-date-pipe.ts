import {Pipe, PipeTransform} from "@angular/core";
/**
 * Pipe to transform a string to a date
 */
@Pipe({name: 'stringToDate'})
export class StringToDatePipe implements PipeTransform {
    /**
     * Constructor
     */
    constructor() {
    }

    /**
     * Transform a date that is passed as string into a date
     * @param value The date passed as string
     * @returns {Date} The Date object
     */
    transform(value: string): string {
        if (!value) {
            return '';
        }
        let year = value.substring(0, 4);
        let month = value.substring(5, 7);
        let day = value.substring(8, 10);
        let dateStr = year + '-' + month + '-' + day;
        return dateStr;
    }
}
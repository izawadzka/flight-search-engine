import { Pipe, PipeTransform } from "@angular/core";
import dateformat = require("dateformat");

@Pipe({
    name: 'formatUTCDate'
})
export class FormatUTCDatePipe implements PipeTransform {
    transform(UTCDate: string, format: string):string {
        return dateformat(new Date(UTCDate), format);
    }
}
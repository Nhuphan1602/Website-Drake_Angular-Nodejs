import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Dateyyyymmdd',
})
export class Dateyyyymmdd implements PipeTransform {
  transform(string: any) {

    var dateParts = string.split("/");
    
    // month is 0-based, that's why we need dataParts[1] - 1
    var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    return dateObject.toString();
  }
}
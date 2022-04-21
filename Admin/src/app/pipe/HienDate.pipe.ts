import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hienDate',
})
export class hienDate implements PipeTransform {
  transform(string: any) {
    var date = new Date(string.replace('Z',''));
    return date.toLocaleDateString('vi-VN')
  }
}
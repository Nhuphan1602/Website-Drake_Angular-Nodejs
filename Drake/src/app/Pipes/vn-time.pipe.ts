import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'VnTime',
})
export class VnTime implements PipeTransform {
  transform(text: string | null) {
    return text ? new Date(text).toLocaleTimeString('vi-VN') : '';
  }
}

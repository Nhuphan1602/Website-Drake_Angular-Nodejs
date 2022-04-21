import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'VnDatetime',
})
export class VnDatetime implements PipeTransform {
  transform(text: string | null) {
    return text ? new Date(text).toLocaleString('vi-VN') : '';
  }
}

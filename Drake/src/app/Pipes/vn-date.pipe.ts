import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'VnDate',
})
export class VnDate implements PipeTransform {
  transform(text: string | null) {
    return text ? new Date(text).toLocaleDateString('vi-VN') : '';
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberWithDots',
})
export class NumberWithDots implements PipeTransform {
  transform(number: number | string) {
    if (typeof number === 'string') {
      return Math.round(parseInt(number))
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    return Math.round(number)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
}

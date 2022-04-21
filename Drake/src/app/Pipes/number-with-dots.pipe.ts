import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberWithDots',
})
export class NumberWithDots implements PipeTransform {
  transform(number: number) {
    return Math.round(number)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
}

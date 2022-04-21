import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'singleToDoubleQuote',
})
export class SingleToDoubleQuote implements PipeTransform {
  transform(text: string) {
    return text.replace("'", "''");
  }
}

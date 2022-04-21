import { NgModule } from '@angular/core';
import { Dateyyyymmdd } from './changedate.pipe';
import { hienDate } from './HienDate.pipe';
import { NumberWithDots } from './number-with-dots.pipe';
import { SingleToDoubleQuote } from './single-to-double-quote.pipe';

@NgModule({
  declarations: [Dateyyyymmdd, hienDate, NumberWithDots, SingleToDoubleQuote],
  imports: [],
  providers: [],
  bootstrap: [],
  exports: [Dateyyyymmdd, hienDate, NumberWithDots, SingleToDoubleQuote],
})
export class CustomePipesModule {}

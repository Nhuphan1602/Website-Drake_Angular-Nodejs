import { NgModule } from '@angular/core';
import { NumberWithDots } from './number-with-dots.pipe';
import { SingleToDoubleQuote } from './single-to-double-quote.pipe';
import { VnDate } from './vn-date.pipe';
import { VnDatetime } from './vn-datetime.pipe';
import { VnTime } from './vn-time.pipe';

@NgModule({
  declarations: [
    NumberWithDots,
    VnDate,
    VnDatetime,
    VnTime,
    SingleToDoubleQuote,
  ],
  imports: [],
  providers: [],
  bootstrap: [],
  exports: [NumberWithDots, VnDate, VnDatetime, VnTime, SingleToDoubleQuote],
})
export class CustomePipesModule {}

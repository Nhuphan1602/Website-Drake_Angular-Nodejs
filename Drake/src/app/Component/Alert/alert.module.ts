import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './alert.component';

@NgModule({
  declarations: [AlertComponent],
  imports: [CommonModule],
  providers: [],
  bootstrap: [AlertComponent],
  exports: [AlertComponent],
})
export class AlertModule {}

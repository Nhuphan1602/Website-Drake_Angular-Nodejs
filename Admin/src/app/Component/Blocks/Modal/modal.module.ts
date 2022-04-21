import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalComponent } from './modal.component';

@NgModule({
  declarations: [ModalComponent],
  imports: [CommonModule],
  providers: [],
  bootstrap: [ModalComponent],
  exports: [ModalComponent],
})
export class ModalModule {}

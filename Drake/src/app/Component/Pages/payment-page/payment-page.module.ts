import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomePipesModule } from 'src/app/Pipes/custome-pipes.module';

import { AlertModule } from '../../Alert/alert.module';
import { ModalModule } from '../../Modal/modal.module';
import { NavigatorComponent } from './navigator/navigator.component';
import { PaymentPageComponent } from './payment-page.component';

@NgModule({
  declarations: [PaymentPageComponent, NavigatorComponent],
  imports: [
    CommonModule,
    FormsModule,
    CustomePipesModule,
    AlertModule,
    ModalModule,
  ],
  providers: [],
  bootstrap: [PaymentPageComponent],
})
export class PaymentPageModule {}

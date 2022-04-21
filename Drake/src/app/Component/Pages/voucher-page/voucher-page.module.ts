import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomePipesModule } from 'src/app/Pipes/custome-pipes.module';
import { NavigatorComponent } from './navigator/navigator.component';
import { VoucherPageComponent } from './voucher-page.component';

@NgModule({
  declarations: [VoucherPageComponent, NavigatorComponent],
  imports: [CommonModule, CustomePipesModule],
  providers: [],
  bootstrap: [VoucherPageComponent],
})
export class VoucherPageModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomePipesModule } from 'src/app/Pipes/custome-pipes.module';
import { InvoicePageComponent } from './invoice-page.component';
import { NavigatorComponent } from './navigator/navigator.component';

@NgModule({
  declarations: [InvoicePageComponent, NavigatorComponent],
  imports: [CommonModule, CustomePipesModule],
  providers: [],
  bootstrap: [InvoicePageComponent],
})
export class InvoicePageModule {}

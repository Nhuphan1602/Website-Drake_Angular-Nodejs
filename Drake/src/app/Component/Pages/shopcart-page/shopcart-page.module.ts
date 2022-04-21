import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomePipesModule } from 'src/app/Pipes/custome-pipes.module';
import { ModalModule } from '../../Modal/modal.module';
import { NavigatorComponent } from './navigator/navigator.component';
import { ShopcartPageComponent } from './shopcart-page.component';

@NgModule({
  declarations: [ShopcartPageComponent, NavigatorComponent],
  imports: [CommonModule, FormsModule, CustomePipesModule, ModalModule],
  providers: [],
  bootstrap: [ShopcartPageComponent],
})
export class ShopcartPageModule {}

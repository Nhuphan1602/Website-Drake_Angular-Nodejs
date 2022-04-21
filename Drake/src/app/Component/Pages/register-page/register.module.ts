import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RegisterComponent } from './register.component';
import { NavigatorComponent } from './navigator/navigator.component';

import { CustomePipesModule } from 'src/app/Pipes/custome-pipes.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { ModalModule } from '../../Modal/modal.module';

@NgModule({
  declarations: [RegisterComponent, NavigatorComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    CustomePipesModule,
    ModalModule,
  ],
  providers: [],
  bootstrap: [RegisterComponent],
})
export class RegisterPageModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CustomePipesModule } from 'src/app/Pipes/custome-pipes.module';
import { ModalModule } from '../../Modal/modal.module';
import { AccountPageComponent } from './account-page.component';
import { NavigatorComponent } from './navigator/navigator.component';

@NgModule({
  declarations: [AccountPageComponent, NavigatorComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    CustomePipesModule,
    ModalModule,
  ],
  providers: [],
  bootstrap: [AccountPageComponent],
})
export class AccountPageModule {}

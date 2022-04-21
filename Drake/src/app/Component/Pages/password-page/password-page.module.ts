import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalModule } from '../../Modal/modal.module';
import { NavigatorComponent } from './navigator/navigator.component';
import { PasswordPageComponent } from './password-page.component';

@NgModule({
  declarations: [PasswordPageComponent, NavigatorComponent],
  imports: [CommonModule, FormsModule, ModalModule],
  providers: [],
  bootstrap: [PasswordPageComponent],
})
export class PasswordPageModule {}

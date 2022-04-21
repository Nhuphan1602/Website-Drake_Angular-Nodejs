import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalModule } from '../../Modal/modal.module';
import { LoginPageComponent } from './login-page.component';
import { NavigatorComponent } from './navigator/navigator.component';

@NgModule({
  declarations: [LoginPageComponent, NavigatorComponent],
  imports: [CommonModule, FormsModule, ModalModule],
  providers: [],
  bootstrap: [LoginPageComponent],
})
export class LoginPageModule {}

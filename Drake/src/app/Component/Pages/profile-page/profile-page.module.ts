import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomePipesModule } from 'src/app/Pipes/custome-pipes.module';
import { NavigatorComponent } from './navigator/navigator.component';
import { ProfilePageComponent } from './profile-page.component';

@NgModule({
  declarations: [ProfilePageComponent, NavigatorComponent],
  imports: [CommonModule, CustomePipesModule],
  providers: [],
  bootstrap: [ProfilePageComponent],
})
export class ProfilePageModule {}

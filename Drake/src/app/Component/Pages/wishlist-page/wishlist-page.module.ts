import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CustomePipesModule } from 'src/app/Pipes/custome-pipes.module';
import { ModalModule } from '../../Modal/modal.module';
import { NavigatorComponent } from './navigator/navigator.component';
import { WishlistPageComponent } from './wishlist-page.component';

@NgModule({
  declarations: [WishlistPageComponent, NavigatorComponent],
  imports: [CommonModule, CustomePipesModule, ModalModule],
  providers: [],
  bootstrap: [WishlistPageComponent],
})
export class WishlistPageModule {}

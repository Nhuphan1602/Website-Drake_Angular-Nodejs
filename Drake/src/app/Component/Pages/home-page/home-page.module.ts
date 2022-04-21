import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CustomePipesModule } from 'src/app/Pipes/custome-pipes.module';

import { HomePageComponent } from './home-page.component';
import { SlickCarousel_1_Component } from './slick-carousel1/slick-carousel1.component';
import { BannerComponent } from './banner/banner.component';
import { List_nhComponent } from './list_nh/list_nh.component';
import { ListItemsComponent } from './list_items/list_items.component';
import { ProductCardsModule } from '../../ProductCards/product-cards.module';
import { ModalModule } from '../../Modal/modal.module';

@NgModule({
  declarations: [
    HomePageComponent,
    SlickCarousel_1_Component,
    BannerComponent,
    List_nhComponent,
    ListItemsComponent,
  ],
  imports: [
    CommonModule,
    SlickCarouselModule,
    CustomePipesModule,
    ProductCardsModule,
    ModalModule,
  ],
  providers: [],
  bootstrap: [HomePageComponent],
})
export class HomePageModule {}

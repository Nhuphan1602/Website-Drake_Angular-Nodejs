import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductDetailPageComponent } from './product-detail-page.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { Detail1Component } from './detail1/detail1.component';
import { Detail2Component } from './detail2/detail2.component';
import { SpLienQuanComponent } from './sp-lienquan-carousel/sp-lienquan-carousel.component';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MatTabsModule } from '@angular/material/tabs';

import { FormsModule } from '@angular/forms';
import { CustomePipesModule } from 'src/app/Pipes/custome-pipes.module';
import { ModalModule } from '../../Modal/modal.module';

@NgModule({
  declarations: [
    ProductDetailPageComponent,
    NavigatorComponent,
    Detail1Component,
    Detail2Component,
    SpLienQuanComponent,
  ],
  imports: [
    CommonModule,
    SlickCarouselModule,
    MatTabsModule,
    FormsModule,
    CustomePipesModule,
    ModalModule,
  ],
  providers: [],
  bootstrap: [ProductDetailPageComponent],
})
export class ProductDetailModule {}

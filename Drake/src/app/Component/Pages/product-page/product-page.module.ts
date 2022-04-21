import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NavigatorAndBannerComponent } from './navigator-banner/navigator-banner.component';
import { DescriptionComponent } from './description/description.component';
import { SelectionComponent } from './selection/selection.component';
import { ListProductsComponent } from './list_products/list_products.component';
import { ProductPageComponent } from './product-page.component';

import { CustomePipesModule } from 'src/app/Pipes/custome-pipes.module';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { DataBridgeService } from './services/data-bridge.module';
import { ProductCardsModule } from '../../ProductCards/product-cards.module';
import { ModalModule } from '../../Modal/modal.module';

@NgModule({
  declarations: [
    ProductPageComponent,
    NavigatorAndBannerComponent,
    SelectionComponent,
    ListProductsComponent,
    DescriptionComponent,
  ],
  imports: [
    CommonModule,
    CustomePipesModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    ProductCardsModule,
    ModalModule,
  ],
  providers: [DataBridgeService],
  bootstrap: [ProductPageComponent],
})
export class ProductPageModule {}

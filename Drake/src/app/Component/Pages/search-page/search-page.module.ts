import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SearchPageComponent } from './search-page.component';
import { SelectionComponent } from './selection/selection.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { ListProductsComponent } from './list_products/list_products.component';

import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CustomePipesModule } from 'src/app/Pipes/custome-pipes.module';
import { DataBridgeService } from './services/data_bridge_service.module';
import { ProductCardsModule } from '../../ProductCards/product-cards.module';
import { ModalModule } from '../../Modal/modal.module';

@NgModule({
  declarations: [
    SearchPageComponent,
    NavigatorComponent,
    SelectionComponent,
    ListProductsComponent,
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    FormsModule,
    CustomePipesModule,
    ProductCardsModule,
    ModalModule,
  ],
  providers: [DataBridgeService],
  bootstrap: [SearchPageComponent],
})
export class SearchPageModule {}

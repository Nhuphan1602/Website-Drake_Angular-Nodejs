import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { CustomePipesModule } from 'src/app/Pipes/custome-pipes.module';
import { ProductCardsComponent } from './product-cards.component';

@NgModule({
  declarations: [ProductCardsComponent],
  imports: [CommonModule, CustomePipesModule, NgxPaginationModule],
  providers: [],
  bootstrap: [ProductCardsComponent],
  exports: [ProductCardsComponent],
})
export class ProductCardsModule {}

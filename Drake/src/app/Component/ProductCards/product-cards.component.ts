import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { iProductCard } from 'src/app/Interfaces/product-interface/product-interface';

@Component({
  selector: 'product-cards',
  templateUrl: 'product-cards.component.html',
  styleUrls: ['product-cards.component.scss'],
})
export class ProductCardsComponent implements OnInit, OnChanges {
  config = {
    id: 'custom',
    itemsPerPage: 24,
    currentPage: 1,
    totalItems: 0,
  };

  @Input() Pagination = false;
  @Input() ClassOption = 0;
  @Input() ProductCards: iProductCard[] = [];
  @Output() ImgClick = new EventEmitter();
  @Output() TagClick = new EventEmitter();
  @Output() HeartIconClick = new EventEmitter();
  @Output() ShopCartIconClick = new EventEmitter();
  @Output() TenClick = new EventEmitter();
  constructor() {}
  ngOnInit() {
    this.config.currentPage = 1;
    this.config.totalItems = this.ProductCards.length;
  }
  ngOnChanges() {
    this.config.currentPage = 1;
    this.config.totalItems = this.ProductCards.length;
  }
  imgClick(masp: string) {
    this.ImgClick.emit(masp);
  }
  tagClick(masp: string) {
    this.TagClick.emit(masp);
  }
  heartIconClick(product: iProductCard) {
    this.HeartIconClick.emit(product);
  }
  shopCartIconClick(masp: string) {
    this.ShopCartIconClick.emit(masp);
  }
  tenClick(masp: string) {
    this.TenClick.emit(masp);
  }
  onPageChange(event: number) {
    this.config.currentPage = event;
    window.scrollTo(0, 0);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { iProductCard } from 'src/app/Interfaces/product-interface/product-interface';
import { UtilityService } from 'src/app/Services/utility.module';

@Component({
  selector: 'sp-lienquan-carousel',
  templateUrl: 'sp-lienquan-carousel.component.html',
  styleUrls: [
    'sp-lienquan-carousel.component.scss',
    '../../../ProductCards/product-cards.component.scss',
  ],
})
export class SpLienQuanComponent implements OnInit {
  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 5,
    speed: 300,
    infinite: true,
    swipeToSlide: true,
    touchThreshold: 100,
    nextArrow:
      '<i class="fas fa-angle-left" style="position: absolute; z-index: 1000; top: 50%; left: -3%; color: #999999;font-size:2.5rem"></i>',
    prevArrow:
      '<i class="fas fa-angle-right" style="position: absolute; z-index: 1000; top: 50%; right: -3%; color: #999999;font-size:2.5rem"></i>',
    cssEase: 'linear',
  };

  @Input() RelatedProducts: iProductCard[] = [];

  constructor(private utility_service: UtilityService) {}
  ngOnInit() {}

  FromHomeToProductDetailPage(MaSP: string) {
    this.utility_service.FromHomeToProductDetailPage(MaSP);
  }
}

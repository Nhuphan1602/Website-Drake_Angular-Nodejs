import { Component, Input, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/Services/utility.module';

@Component({
  selector: 'navigator',
  templateUrl: 'navigator.component.html',
  styleUrls: ['navigator.component.scss', '../../../../Scss/navigator.scss'],
})
export class NavigatorComponent implements OnInit {
  @Input() MaSP = '';
  @Input() urlSegment_1 = '';
  @Input() urlSegment_2 = '';
  /* 
  urlSegment_1/urlSegment_2/MaSP
  */
  constructor(private utility_service: UtilityService) {}
  ngOnInit() {}
  ToHome() {
    this.utility_service.ToHome();
  }
  FromHomeToProductDetailPage() {
    this.utility_service.FromHomeToProductDetailPage(this.MaSP);
  }
  ToProductPage(TenNH = this.urlSegment_1, TenDM = this.urlSegment_2) {
    this.utility_service.ToProductPage(TenNH, TenDM);
  }
  FromProductPageToProductDetailPage() {
    this.utility_service.FromProductPageToProductDetailPage(
      this.urlSegment_1,
      this.urlSegment_2,
      this.MaSP
    );
  }

  ToSearchPage() {
    this.utility_service.ToSearchPage(this.urlSegment_2);
  }
  FromSearchPageToProductDetailPage() {
    this.utility_service.FromSearchPageToProductDetailPage(
      this.urlSegment_2,
      this.MaSP
    );
  }
}

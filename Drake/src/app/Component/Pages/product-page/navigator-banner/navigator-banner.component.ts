import { Component, OnInit, Input } from '@angular/core';
import { UtilityService } from 'src/app/Services/utility.module';

@Component({
  selector: 'product-page-navigator-banner',
  templateUrl: 'navigator-banner.component.html',
  styleUrls: [
    'navigator-banner.component.scss',
    '../../../../Scss/navigator.scss',
  ],
})
export class NavigatorAndBannerComponent implements OnInit {
  @Input() TenNH = '';
  @Input() TenDM = '';

  constructor(private utility_service: UtilityService) {}
  ngOnInit() {}
  ToHome() {
    this.utility_service.ToHome();
  }
  ToProductPage(TenNH = this.TenNH, TenDM = this.TenDM) {
    this.utility_service.ToProductPage(TenNH, TenDM);
  }
}

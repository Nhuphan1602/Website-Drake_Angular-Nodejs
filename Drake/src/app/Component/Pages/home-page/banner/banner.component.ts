import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/Services/utility.module';

@Component({
  selector: 'home-page-banner',
  templateUrl: 'banner.component.html',
  styleUrls: ['banner.component.scss'],
})
export class BannerComponent implements OnInit {
  constructor(private utility_service: UtilityService) {}
  ngOnInit() {}
  ToDiscountedProductPage() {
    this.utility_service.ToProductPage('All', 'Km');
  }
}

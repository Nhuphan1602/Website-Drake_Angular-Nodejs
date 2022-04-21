import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/Services/database.module';
import { UtilityService } from 'src/app/Services/utility.module';
import {
  iProductCard,
  iSortSelect1,
} from 'src/app/Interfaces/product-interface/product-interface';
import { SafeHtml } from '@angular/platform-browser';
import { DataBridgeService } from './services/data-bridge.module';

@Component({
  selector: 'app-product-page',
  templateUrl: 'product-page.component.html',
  styleUrls: ['product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  TenNH = '';
  TenDM = '';
  HtmlContent: SafeHtml = {};
  ProductCards: iProductCard[] = [];
  SortSelect1: iSortSelect1 = { TenDM: '', GiaTri: [] };

  constructor(
    private route: ActivatedRoute,
    private utility_service: UtilityService,
    private database_service: DatabaseService,
    private data_bridge_service: DataBridgeService
  ) {}
  ngOnInit() {
    this.route.url.subscribe((urlSegments) => {
      //Mỗi lần chuyển qua 1 danh mục khác thì set lại mặc định thông tin lựa chọn
      this.data_bridge_service.Set_SortOptionValue1({ TenDM: '', GiaTri: '' });
      this.data_bridge_service.Set_SortOptionValue2('A,MaSP');
      this.TenNH = urlSegments[0].path;
      this.TenDM = urlSegments[1].path;

      if (this.TenNH !== 'All') {
        this.database_service
          .POST_DanhMucMoTa(this.TenNH, this.TenDM)
          .subscribe((HtmlContentArray) => {
            this.HtmlContent = this.utility_service.getSafeHTMLValue(
              '<link rel="stylesheet" href="app/Component/Pages/product-page/description/description.component.css">' +
                HtmlContentArray[0]
            );
          });
      } else {
        this.HtmlContent = this.utility_service.getSafeHTMLValue('');
      }

      this.database_service
        .POST_Select_Products(
          this.TenNH === 'All' ? '*' : this.TenNH,
          this.TenDM === 'All' ? '*' : this.TenDM,
          1,
          1000
        )
        .subscribe((ProductCards) => {
          this.ProductCards = ProductCards;

          /*Lấy thông tin từ ProductCards xây dựng SortSelect1
            nếu url là .../Accessories & Apparel || .../Km
          */
          if (this.TenDM == 'Accessories & Apparel') {
            this.SortSelect1 = {
              TenDM: 'Accessories & Apparel',
              GiaTri: this.utility_service.Distinct(
                ProductCards,
                (productCard: iProductCard) => productCard.Lpt
              ),
            };
          } else if (this.TenDM == 'Km') {
            this.SortSelect1 = {
              TenDM: 'Km',
              GiaTri: this.utility_service.Distinct(
                ProductCards,
                (productCard: iProductCard) => productCard.TenNH
              ),
            };
          } else {
            this.SortSelect1 = { TenDM: '', GiaTri: [] };
          }
        });
    });
  }
}

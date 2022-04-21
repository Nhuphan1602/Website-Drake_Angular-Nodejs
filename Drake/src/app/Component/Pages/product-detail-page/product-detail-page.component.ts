import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  iProductCard,
  iProductDetail,
  iProductSize,
} from 'src/app/Interfaces/product-interface/product-interface';
import { DatabaseService } from 'src/app/Services/database.module';
import { UtilityService } from 'src/app/Services/utility.module';

@Component({
  selector: 'product-detail-page',
  templateUrl: 'product-detail-page.component.html',
  styleUrls: ['product-detail-page.component.scss'],
})
export class ProductDetailPageComponent implements OnInit {
  ProductDetail = <iProductDetail>{};
  ProductSize: iProductSize[] = [];
  RelatedProducts: iProductCard[] = [];
  //
  /*
/masp/urlSegment_1 == ''/urlSegment_2 == '' => masp index 0
/urlSegment_1 == 'search'/urlSegment_2 == '[search string]'/masp => masp index 2
/urlSegment_1 == '[nhan hieu]'/urlSegment_2 !== '[danh muc]'/masp => masp index 2
*/
  //
  MaSP = '';
  urlSegment_1 = '';
  urlSegment_2 = '';
  /* 
  urlSegment_1/urlSegment_2/MaSP
  */
  constructor(
    private route: ActivatedRoute,
    private utility_service: UtilityService,
    private database_service: DatabaseService
  ) {}
  ngOnInit() {
    this.route.url.subscribe((urlSegments) => {
      if (!urlSegments[1] && !urlSegments[2]) {
        this.urlSegment_1 = '';
        this.urlSegment_2 = '';
        this.MaSP = urlSegments[0].path;
      } else {
        this.urlSegment_1 = urlSegments[0].path;
        this.urlSegment_2 = urlSegments[1].path;
        this.MaSP = urlSegments[2].path;
      }

      this.database_service
        .POST_Select_ProductDetail(this.MaSP)
        .subscribe((ProductDetail) => {
          ProductDetail.GioiThieu = this.utility_service.convertToPlainText(
            ProductDetail.GioiThieu
          );
          ProductDetail.PhuKienTheoKem =
            this.utility_service.convertToPlainText(
              ProductDetail.PhuKienTheoKem
            );
          ProductDetail.TinhNangSanPham =
            this.utility_service.convertToPlainText(
              ProductDetail.TinhNangSanPham
            );
          this.ProductDetail = ProductDetail;
        });
      this.database_service
        .POST_Select_ProductSize(this.MaSP)
        .subscribe((ProductSize) => {
          this.ProductSize = ProductSize;
        });

      this.database_service
        .POST_Select_RelatedProducts(this.MaSP, 1, 8)
        .subscribe((relatedproducts) => {
          this.RelatedProducts = relatedproducts;
        });
    });
  }
}

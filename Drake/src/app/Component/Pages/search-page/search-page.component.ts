import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { iProductCard } from 'src/app/Interfaces/product-interface/product-interface';
import { DatabaseService } from 'src/app/Services/database.module';
import { DataBridgeService } from './services/data_bridge_service.module';

@Component({
  selector: 'search-page',
  templateUrl: 'search-page.component.html',
  styleUrls: ['search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  ProductCards: iProductCard[] = [];
  TimKiem = '';
  constructor(
    private data_bridge_service: DataBridgeService,
    private database_service: DatabaseService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.url.subscribe((urlSegments) => {
      //Mỗi lần chuyển qua 1 danh mục khác thì set lại mặc định thông tin lựa chọn
      this.data_bridge_service.Set_SortOptionValue('A,MaSP');

      this.TimKiem = urlSegments[1].path;
      this.database_service
        .POST_Search_Products(urlSegments[1].path, 1, 1000)
        .subscribe((ProductCards) => {
          this.ProductCards = ProductCards;
        });
    });
  }
}

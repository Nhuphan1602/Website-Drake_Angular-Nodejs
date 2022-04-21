import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatabaseService } from 'src/app/Services/database.module';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import {
  iProductCard,
  i2ProductCard,
} from 'src/app/Interfaces/product-interface/product-interface';
import { UtilityService } from 'src/app/Services/utility.module';
import { UserService } from 'src/app/Services/user.module';
import { Subject } from 'rxjs';
import { ModalService } from 'src/app/Services/modal-service.module';

@Component({
  selector: 'home-page-list_items',
  templateUrl: 'list_items.component.html',
  styleUrls: [
    'list_items.component.scss',
    '../../../ProductCards/product-cards.component.scss',
  ],
})
export class ListItemsComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  //
  carousel_list_products: i2ProductCard[] = [];
  converseSneaker_Chuck1970s: iProductCard[] = [];
  vansSneaker: iProductCard[] = [];
  palladiumSneaker: iProductCard[] = [];
  supraHighTop_LowTop: iProductCard[] = [];
  discountProductCards: iProductCard[] = [];
  InsertIntoWishlist: Function = () => {};
  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 5,
    speed: 300,
    infinite: true,
    swipeToSlide: true,
    touchThreshold: 100,
    nextArrow:
      '<i class="fas fa-angle-left" style="position: absolute; z-index: 1000; top: 50%; left: 4%; color: #f8c052;font-size:2.5rem"></i>',
    prevArrow:
      '<i class="fas fa-angle-right" style="position: absolute; z-index: 1000; top: 50%; right: 0.5%; color: #f8c052;font-size:2.5rem"></i>',
    cssEase: 'linear',
  };
  constructor(
    private user_service: UserService,
    private modaL_service: ModalService,
    private utility_service: UtilityService,
    private database_service: DatabaseService
  ) {}
  ngOnInit() {
    //Kiểm tra người dùng
    this.user_service.MaKH$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (makh) => {
        if (makh) {
          this.InsertIntoWishlist = (Product: iProductCard) => {
            this.database_service
              .POST_Insert_Wishlist(makh, Product.MaSP)
              .subscribe((ketqua) => {
                if (ketqua.Success) {
                  this.user_service.Insert_Wishlist([
                    {
                      MaSP: Product.MaSP,
                      Hinh: Product.c1_h1,
                      Ten: Product.Ten,
                      DongSanPham: Product.DongSanPham,
                      TinhTrang: Product.TinhTrang,
                      Gia: Product.Gia,
                      Km: Product.Km,
                    },
                  ]);
                  this.modaL_service.open('home-page-modal1');
                } else {
                  this.modaL_service.open('home-page-modal2');
                }
              });
          };
        }
      }
    );
    //Lấy sản phẩm cho khung lướt sản phẩm
    this.database_service
      .POST_Select_Products('*', 'km', 1, 30)
      .subscribe((ProductCards) => {
        this.carousel_list_products = this.Handling2ProductCard(ProductCards);
      });

    //Lấy sản phẩm cho khu vực converse Sneaker, converse Chuck 1970s
    this.database_service //Observable chaining
      .POST_Select_Products('converse', 'chuck 1970s', 1, 6)
      .pipe(
        switchMap((ProductCard) => {
          this.converseSneaker_Chuck1970s = ProductCard;
          return this.database_service.POST_Select_Products(
            'converse',
            'sneaker',
            1,
            12
          );
        }),
        tap(
          (ProductCard) =>
            (this.converseSneaker_Chuck1970s =
              this.converseSneaker_Chuck1970s.concat(ProductCard))
        )
      )
      .subscribe();

    //Lấy sản phẩm cho khu vực vans Sneaker
    this.database_service
      .POST_Select_Products('vans', 'sneaker', 1, 18)
      .subscribe((ProductCards) => {
        this.vansSneaker = ProductCards;
      });

    //Lấy sản phẩm cho khu vực supra High Top, supra Low Top
    this.database_service //Observable chaining
      .POST_Select_Products('supra', 'high top', 1, 6)
      .pipe(
        switchMap((ProductCards) => {
          this.supraHighTop_LowTop = ProductCards;
          return this.database_service.POST_Select_Products(
            'supra',
            'low top',
            1,
            6
          );
        }),
        tap(
          (ProductCards) =>
            (this.supraHighTop_LowTop =
              this.supraHighTop_LowTop.concat(ProductCards))
        )
      )
      .subscribe();

    //Lấy sản phẩm cho khu vực palladium Sneaker
    this.database_service
      .POST_Select_Products('palladium', 'sneaker', 1, 12)
      .subscribe((ProductCards) => {
        this.palladiumSneaker = ProductCards;
      });

    //Lấy sản phẩm có giảm giá
    this.database_service
      .POST_Select_Products('*', 'km', 1, 16)
      .subscribe((ProductCards) => {
        this.discountProductCards = ProductCards;
      });
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  Handling2ProductCard(ProductCards: iProductCard[]) {
    if (ProductCards.length % 2 !== 0) {
      return [];
    }
    let result = ProductCards.reduce(
      (accommodate: i2ProductCard[], ele, index, array) => {
        if (index % 2 === 0) {
          accommodate.push({
            pc1: ele,
            pc2: array[index + 1],
          });
          return accommodate;
        }
        return accommodate;
      },
      []
    );
    return result;
  }
  ToProductPage(TenNH: string, TenDM: string) {
    this.utility_service.ToProductPage(TenNH, TenDM);
  }

  FromHomeToProductDetailPage(MaSP: string) {
    this.utility_service.FromHomeToProductDetailPage(MaSP);
  }
}

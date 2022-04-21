import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {
  iProductCard,
  iSortOptionValue1,
} from 'src/app/Interfaces/product-interface/product-interface';
import { DataBridgeService } from '../../product-page/services/data-bridge.module';
import { UtilityService } from 'src/app/Services/utility.module';
import { skip, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/Services/user.module';
import { DatabaseService } from 'src/app/Services/database.module';
import { ModalService } from 'src/app/Services/modal-service.module';

@Component({
  selector: 'product-page-list_products',
  templateUrl: 'list_products.component.html',
  styleUrls: ['list_products.component.scss'],
})
export class ListProductsComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  //Tạo 2 biến tennh và tendm để tạo link truy cập trang chi tiết sản phẩm
  //
  InsertIntoWishlist: Function = () => {};
  @Input() ProductCards: iProductCard[] = [];
  @Input() ProductCards_Ref: iProductCard[] = [];
  @Input() TenNH = '';
  @Input() TenDM = '';
  constructor(
    private user_service: UserService,
    private modal_service: ModalService,
    private utility_service: UtilityService,
    private database_service: DatabaseService,
    private data_bridge_service: DataBridgeService
  ) {}
  ngOnInit() {
    //
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
                  this.modal_service.open('product-page-modal1');
                } else {
                  this.modal_service.open('product-page-modal1');
                }
              });
          };
        }
      }
    );
    //
    //Xử lí yêu cầu sắp xếp
    this.data_bridge_service.SortOptionValue2$.pipe(
      skip(1),
      takeUntil(this.ngUnsubscribe)
    ).subscribe((SortOptionValue2: string) => {
      switch (SortOptionValue2) {
        case 'A,MaSP':
          this.utility_service.bubbleSort(
            this.ProductCards,
            (index: number, array: iProductCard[]) => {
              return (
                parseInt(array[index]['row#']) >
                parseInt(array[index + 1]['row#'])
              );
            }
          );
          break;
        case 'A,Gia':
          this.utility_service.bubbleSort(
            this.ProductCards,
            (index: number, array: iProductCard[]) => {
              return (
                array[index].Gia * (1 - array[index].Km) >
                array[index + 1].Gia * (1 - array[index + 1].Km)
              );
            }
          );
          break;
        case 'D,Gia':
          this.utility_service.bubbleSort(
            this.ProductCards,
            (index: number, array: iProductCard[]) => {
              return (
                array[index].Gia * (1 - array[index].Km) <
                array[index + 1].Gia * (1 - array[index + 1].Km)
              );
            }
          );
          break;
        case 'A,TrangThai':
          this.utility_service.bubbleSort(
            this.ProductCards,
            (index: number, array: iProductCard[]) => {
              return array[index].TrangThai > array[index + 1].TrangThai;
            }
          );
          break;
        case 'D,TrangThai':
          this.utility_service.bubbleSort(
            this.ProductCards,
            (index: number, array: iProductCard[]) => {
              return array[index].TrangThai < array[index + 1].TrangThai;
            }
          );
          break;
        case 'A,Ten':
          this.utility_service.bubbleSort(
            this.ProductCards,
            (index: number, array: iProductCard[]) => {
              return array[index].Ten > array[index + 1].Ten;
            }
          );
          break;
        case 'D,Ten':
          this.utility_service.bubbleSort(
            this.ProductCards,
            (index: number, array: iProductCard[]) => {
              return array[index].Ten < array[index + 1].Ten;
            }
          );
          break;
      }
    });

    this.data_bridge_service.SortOptionValue1$.pipe(
      skip(1),
      takeUntil(this.ngUnsubscribe)
    ).subscribe((SortOptionValue1: iSortOptionValue1) => {
      if (SortOptionValue1.TenDM == 'Accessories & Apparel') {
        this.ProductCards = this.ProductCards_Ref.filter((ele) => {
          return ele.Lpt === SortOptionValue1.GiaTri;
        });
      } else if (SortOptionValue1.TenDM == 'Km') {
        this.ProductCards = this.ProductCards_Ref.filter((ele) => {
          return ele.TenNH === SortOptionValue1.GiaTri;
        });
      }
      this.data_bridge_service.Set_SortOptionValue2('A,MaSP');
    });
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  FromProductPageToProductDetailPage(MaSP: string) {
    this.utility_service.FromProductPageToProductDetailPage(
      this.TenNH,
      this.TenDM,
      MaSP
    );
  }
}

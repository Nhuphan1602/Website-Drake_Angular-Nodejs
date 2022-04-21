import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { iShopCartItem } from 'src/app/Interfaces/user-interface/user-interface';
import { DatabaseService } from 'src/app/Services/database.module';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { ModalService } from 'src/app/Services/modal-service.module';

import { UserService } from 'src/app/Services/user.module';
import { UtilityService } from 'src/app/Services/utility.module';

@Component({
  selector: 'shopcart-page',
  templateUrl: 'shopcart-page.component.html',
  styleUrls: [
    'shopcart-page.component.scss',
    '../../../Scss/mytable.scss',
    '../../../Scss/button-container.scss',
  ],
})
export class ShopcartPageComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  //
  MaKH = '';
  ShopCartItems: iShopCartItem[] = [];
  TongCong = 0;
  //
  isMasterCheck = false;
  //

  constructor(
    private user_service: UserService,
    private modal_service: ModalService,
    private utility_service: UtilityService,
    private database_service: DatabaseService,
    private local_storage_service: LocalStorageService
  ) {}
  ngOnInit() {
    this.user_service.MaKH$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (makh) => {
        if (makh) {
          this.MaKH = makh;
          //
          this.user_service.Shopcart$.pipe(
            takeUntil(this.ngUnsubscribe)
          ).subscribe((shopcart) => {
            //
            this.local_storage_service.set('SCItems', shopcart);
            //
            this.TongCong = shopcart.reduce((accumulator, ele) => {
              return accumulator + ele.Gia * (1 - ele.Km) * ele.SoLuong;
            }, 0);
            //
            this.ShopCartItems = JSON.parse(JSON.stringify(shopcart));
            //
            //Khi xóa hết các sản phẩm sẽ trả MasterCheck về False
            if (shopcart.length === 0) {
              this.isMasterCheck = false;
            }
          });
        } else {
          this.utility_service.ToHome();
        }
      }
    );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  CheckUncheckAll() {
    this.ShopCartItems.forEach((ele) => {
      ele.isChecked = this.isMasterCheck;
    });
  }
  IsAllChecked() {
    this.isMasterCheck = this.ShopCartItems.every((ele) => {
      return ele.isChecked;
    });
  }
  UpdateShopcart(index: number, masp: string, masize: string, soluong: number) {
    this.database_service
      .POST_Update_Shopcart(this.MaKH, masp, masize, soluong)
      .subscribe((ketqua) => {
        if (ketqua.Success) {
          this.ShopCartItems[index].SoLuong = soluong;
          this.user_service.Set_Shopcart(this.ShopCartItems);
          this.modal_service.open('shopcart-page-modal2');
        } else {
          this.modal_service.open('shopcart-page-modal3');
        }
      });
  }

  //Chức năng xóa
  AskForDeleteFromShopcart(masp: string) {
    this.modal_service.open(`shopcart-page-modal${masp}`);
  }
  DeleteFromShopcart(index: number, masp: string, masize: string) {
    this.database_service
      .POST_Delete_Shopcart(this.MaKH, masp, masize)
      .subscribe((ketqua) => {
        if (ketqua.Success) {
          this.ShopCartItems.splice(index, 1);
          this.user_service.Set_Shopcart(this.ShopCartItems);
        } else {
          this.modal_service.open('shopcart-page-modal4');
        }
      });
  }
  DeleteFromShopcartModalClosed(
    event: boolean,
    index: number,
    masp: string,
    masize: string
  ) {
    if (event) {
      this.DeleteFromShopcart(index, masp, masize);
    }
  }
  //

  ToProfilePage() {
    this.utility_service.ToProfilePage();
  }
  FromHomeToProductDetailPage(masp: string) {
    this.utility_service.FromHomeToProductDetailPage(masp);
  }
  ToPaymentPage() {
    /*  "target": "ES6",
       "lib": ["DOM", "DOM.Iterable", "ES6"]*/
    const SelectedProducts = this.local_storage_service
      .get<iShopCartItem[]>('SCItems')
      .filter((ele, index) => {
        return this.ShopCartItems[index].isChecked;
      });
    if (SelectedProducts.length > 0) {
      this.local_storage_service.set('SCItems', SelectedProducts);
      this.utility_service.ToPaymentPage();
    } else {
      this.modal_service.open('shopcart-page-modal1');
    }
  }
}

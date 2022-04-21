import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  iShopCartItem,
  iWishListItem,
} from 'src/app/Interfaces/user-interface/user-interface';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { UserService } from 'src/app/Services/user.module';
import { UtilityService } from 'src/app/Services/utility.module';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  MaKH = '';
  TongCong = 0;
  ShopCartItems: iShopCartItem[] = [];
  WishListItems: iWishListItem[] = [];
  constructor(
    private local_storage_service: LocalStorageService,
    private utility_service: UtilityService,
    private user_service: UserService
  ) {}
  ngOnInit() {
    this.user_service.MaKH$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (makh) => {
        this.MaKH = makh;
      }
    );
    this.user_service.Wishlist$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (wishlist) => {
        this.WishListItems = JSON.parse(JSON.stringify(wishlist));
      }
    );
    this.user_service.Shopcart$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (shopcart) => {
        this.ShopCartItems = JSON.parse(JSON.stringify(shopcart));
        this.TongCong = shopcart.reduce((accumulator, ele) => {
          return accumulator + ele.Gia * (1 - ele.Km) * ele.SoLuong;
        }, 0);
      }
    );
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  ToHome() {
    this.utility_service.ToHome();
  }
  ToLoginPage() {
    this.utility_service.ToLoginPage();
  }
  ToRegisterPage() {
    this.utility_service.ToRegisterPage();
  }
  ToProfilePage() {
    this.utility_service.ToProfilePage();
  }
  DangXuat() {
    this.user_service.Set_UserExistence(false);
    this.user_service.Set_MaKH('');
    this.user_service.Set_Wishlist([]);
    this.user_service.Set_Shopcart([]);
    this.local_storage_service.clear();
  }

  ToShopcartPage() {
    this.utility_service.ToShopcartPage();
  }
  ToWishlistPage() {
    this.utility_service.ToWishlistPage();
  }
}

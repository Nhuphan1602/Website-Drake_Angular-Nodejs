import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  iHoaDon,
  iMaGiamGia,
  iShopCartItem,
  iWishListItem,
} from '../Interfaces/user-interface/user-interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
  private UserExistence = new BehaviorSubject<boolean>(false);
  UserExistence$ = this.UserExistence.asObservable();
  Set_UserExistence(bool: boolean) {
    this.UserExistence.next(bool);
  }

  private MaKH = new BehaviorSubject<string>('');
  MaKH$ = this.MaKH.asObservable();
  Set_MaKH(makh: string) {
    this.MaKH.next(makh);
  }

  private Shopcart = new BehaviorSubject<iShopCartItem[]>([]);
  Shopcart$ = this.Shopcart.asObservable();
  Set_Shopcart(scitems: iShopCartItem[]) {
    this.Shopcart.next(scitems);
  }
  Insert_Shopcart(scitems: iShopCartItem[]) {
    this.Shopcart.next([...this.Shopcart.getValue(), ...scitems]);
  }
  Remove_ShopCart(listmasp: string[]) {
    this.Shopcart.next(
      this.Shopcart.value.filter((ele) => {
        return listmasp.indexOf(ele.MaSP) === -1;
      })
    );
  }

  private Wishlist = new BehaviorSubject<iWishListItem[]>([]);
  Wishlist$ = this.Wishlist.asObservable();
  Set_Wishlist(wlitems: iWishListItem[]) {
    this.Wishlist.next(wlitems);
  }
  Insert_Wishlist(wlitems: iWishListItem[]) {
    this.Wishlist.next([...this.Wishlist.getValue(), ...wlitems]);
  }
}

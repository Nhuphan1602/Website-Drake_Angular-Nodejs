import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  iCategoryRaw,
  iAccessory,
} from '../Interfaces/menu-interface/menu-interface';
import {
  iProductCard,
  iProductDetail,
  iProductSize,
} from '../Interfaces/product-interface/product-interface';
import {
  iHoaDon,
  iMaGiamGia,
  iPTTT,
  iPTVC,
  iShopCartItem,
  iThongTinThanhToan,
  iUser,
  iWishListItem,
} from '../Interfaces/user-interface/user-interface';
@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private http: HttpClient) {}

  POST_MenuCategories() {
    return this.http.post<iCategoryRaw[]>(
      'http://localhost:8081/api/post/menu/categories',
      {},
      {}
    );
  }
  POST_MenuAccessories() {
    return this.http.post<iAccessory[]>(
      'http://localhost:8081/api/post/menu/accessories',
      {},
      {}
    );
  }
  POST_DanhMucMoTa(tennh: string, tendm: string) {
    return this.http.post<string[]>(
      'http://localhost:8081/api/post/danhmuc/mota',
      {
        tennh: tennh,
        tendm: tendm,
      }
    );
  }
  POST_Select_Products(tennh: string, tendm: string, min: number, max: number) {
    return this.http.post<iProductCard[]>(
      'http://localhost:8081/api/post/products',
      {
        tennh: tennh,
        tendm: tendm,
        min: min,
        max: max,
      }
    );
  }

  POST_Search_Products(timkiem: string, min: number, max: number) {
    return this.http.post<iProductCard[]>(
      'http://localhost:8081/api/post/search/sp',
      { timkiem: timkiem, min: min, max: max }
    );
  }
  POST_Select_ProductDetail(masp: string) {
    return this.http.post<iProductDetail>(
      'http://localhost:8081/api/post/product/detail',
      { masp: masp }
    );
  }
  POST_Select_ProductSize(masp: string) {
    return this.http.post<iProductSize[]>(
      'http://localhost:8081/api/post/product/size',
      { masp: masp }
    );
  }
  POST_Select_RelatedProducts(masp: string, min: number, max: number) {
    return this.http.post<iProductCard[]>(
      'http://localhost:8081/api/post/related/products',
      {
        masp: masp,
        min: min,
        max: max,
      }
    );
  }
  POST_Login_User(email: string, password: string) {
    return this.http.post<iUser>('http://localhost:8081/api/post/login/kh', {
      email: email,
      password: password,
    });
  }
  POST_Register_User(form: {
    DiaChiChinh: string;
    Email: string;
    GioiTinh: string;
    Ho: string;
    NgaySinh: string;
    Password: string;
    QuanHuyen: string;
    Sdt: string;
    Ten: string;
    TinhThanh: string;
  }) {
    return this.http.post<{ Success: boolean }>(
      'http://localhost:8081/api/post/register/kh',
      form
    );
  }
  POST_Update_User(form: {
    makh: string;
    ho: string;
    ten: string;
    gioitinh: string;
    ngaysinh: string;
    sdt: string;
    diachichinh: string;
    tinhthanh: string;
    quanhuyen: string;
    email: string;
  }) {
    return this.http.post<{ Success: boolean }>(
      'http://localhost:8081/api/post/update/kh',
      form
    );
  }
  POST_Update_Password_User(
    makh: string,
    newpassword: string,
    oldpassword: string
  ) {
    return this.http.post<{ Success: boolean }>(
      'http://localhost:8081/api/post/update/mk/kh',
      {
        MaKH: makh,
        newpassword: newpassword,
        oldpassword: oldpassword,
      }
    );
  }
  POST_Select_Wishlist(makh: string) {
    return this.http.post<iWishListItem[]>(
      'http://localhost:8081/api/post/select/wishlist',
      { makh: makh }
    );
  }
  POST_Insert_Wishlist(makh: string, masp: string) {
    return this.http.post<{ Success: boolean }>(
      'http://localhost:8081/api/post/insert/wishlist',
      {
        makh: makh,
        masp: masp,
      }
    );
  }

  POST_Delete_Wishlist(makh: string, masp: string) {
    return this.http.post<{ Success: boolean }>(
      'http://localhost:8081/api/post/delete/wishlist',
      {
        makh: makh,
        masp: masp,
      }
    );
  }
  POST_Select_Shopcart(makh: string) {
    return this.http.post<iShopCartItem[]>(
      'http://localhost:8081/api/post/select/shopcart',
      {
        makh: makh,
      }
    );
  }
  POST_Insert_Shopcart(
    makh: string,
    masp: string,
    masize: string,
    soluong: string
  ) {
    return this.http.post<{ Success: boolean }>(
      'http://localhost:8081/api/post/insert/shopcart',
      {
        makh: makh,
        masp: masp,
        masize: masize,
        soluong: soluong,
      }
    );
  }
  POST_Update_Shopcart(
    makh: string,
    masp: string,
    masize: string,
    soluong: number
  ) {
    return this.http.post<{ Success: boolean }>(
      'http://localhost:8081/api/post/update/shopcart',
      {
        makh: makh,
        masp: masp,
        masize: masize,
        soluong: soluong,
      }
    );
  }
  POST_Delete_Shopcart(makh: string, masp: string, masize: string) {
    return this.http.post<{ Success: boolean }>(
      'http://localhost:8081/api/post/delete/shopcart',
      {
        makh: makh,
        masp: masp,
        masize: masize,
      }
    );
  }
  POST_Select_Hoadon(makh: string) {
    return this.http.post<iHoaDon[]>(
      'http://localhost:8081/api/post/select/hoadon',
      {
        makh: makh,
      }
    );
  }
  POST_Select_Khmgg(makh: string) {
    return this.http.post<iMaGiamGia[]>(
      'http://localhost:8081/api/post/select/khmgg',
      {
        makh: makh,
      }
    );
  }
  POST_Select_Pttt() {
    return this.http.post<iPTTT[]>(
      'http://localhost:8081/api/post/select/pttt',
      {}
    );
  }
  POST_Select_Ptvc() {
    return this.http.post<iPTVC[]>(
      'http://localhost:8081/api/post/select/ptvc',
      {}
    );
  }
  POST_ThanhToan_HoaDon(ThongTinThanhToan: iThongTinThanhToan) {
    return this.http.post<{ Success: boolean }>(
      'http://localhost:8081/api/post/thanhtoan/hoadon',
      { ThongTinThanhToan: ThongTinThanhToan }
    );
  }
}

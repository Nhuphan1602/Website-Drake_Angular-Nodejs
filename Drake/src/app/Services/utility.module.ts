import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor(private domSanitizer: DomSanitizer, private router: Router) {}

  //Nếu mà truyền vào cb với tham số là phần tử của mảng thì không được.
  //Do không thể lấy phần tử tiếp theo của phần tử truyền vào cb.
  bubbleSort(array: any[], cb: Function) {
    for (let i = 0; i < array.length; i++) {
      for (let x = 0; x < array.length - 1 - i; x++) {
        if (cb(x, array)) {
          [array[x], array[x + 1]] = [array[x + 1], array[x]];
        }
      }
    }
  }
  convertToPlainText(htmlString: string | null) {
    if (htmlString === null) {
      return '';
    }

    // Create a new div element
    let tempDivElement = document.createElement('div');

    // Set the HTML content with the given value
    tempDivElement.innerHTML = htmlString;

    // Retrieve the text property of the element
    return tempDivElement.textContent || tempDivElement.innerText || '';
  }

  Distinct(array: any[], cb: Function) {
    let result = array.reduce((accumulator: string[], Ele, Index, Array) => {
      if (
        !accumulator.some((aEle, aIndex, Accumulator) => {
          return aEle === cb(Ele);
        })
      ) {
        accumulator.push(cb(Ele) ? cb(Ele) : '');
      }
      return accumulator;
    }, []);
    return result;
  }
  getSafeHTMLValue(value: string) {
    return this.domSanitizer.bypassSecurityTrustHtml(value);
  }
  Date_Sql(date: Date) {
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-');
  }
  Datetime_Sql(date: Date) {
    return (
      [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-') +
      ' ' +
      [date.getHours(), date.getMinutes(), date.getSeconds()].join(':')
    );
  }

  //Trang thanh toán
  ToPaymentPage() {
    this.router.navigateByUrl('taikhoan/payment');
  }

  //Trang voucher
  ToVoucherPage() {
    this.router.navigateByUrl('taikhoan/voucher');
  }

  //Trang lịch sử hóa đơn
  ToInvoicePage() {
    this.router.navigateByUrl('taikhoan/hoadon');
  }

  //Trang Shop Cart
  ToShopcartPage() {
    this.router.navigateByUrl('taikhoan/shopcart');
  }

  //Trang Wish List
  ToWishlistPage() {
    this.router.navigateByUrl('taikhoan/wishlist');
  }

  //Trang thay đổi mật khẩu
  ToPasswordPage() {
    this.router.navigateByUrl('taikhoan/thaydoimatkhau');
  }

  //Trang Cập nhật thông tin tài khoản người dùng
  ToAccountPage() {
    this.router.navigateByUrl('taikhoan/capnhat');
  }

  //Trang hồ sơ người dùng
  ToProfilePage() {
    this.router.navigateByUrl('taikhoan');
  }

  //Trang đăng nhập
  ToLoginPage() {
    this.router.navigateByUrl('login');
  }

  //Trang đăng kí
  ToRegisterPage() {
    this.router.navigateByUrl('register');
  }

  //Trang chủ
  ToHome() {
    this.router.navigateByUrl('');
  }

  //Trang giới thiệu cửa hàng
  ToGTCHPage() {
    this.router.navigateByUrl('gioi-thieu-cua-hang');
  }

  //Trang sản phẩm
  ToProductPage(TenNH: string, TenDM: string) {
    this.router.navigateByUrl(`${TenNH}/${TenDM}`);
  }

  //Trang tìm kiếm
  ToSearchPage(TimKiem: string) {
    this.router.navigateByUrl(`search/${TimKiem}`);
  }

  //Trang chi tiết sản phẩm
  FromHomeToProductDetailPage(MaSP: string) {
    this.router.navigateByUrl(`${MaSP}`);
  }
  FromProductPageToProductDetailPage(
    TenNH: string,
    TenDM: string,
    MaSP: string
  ) {
    this.router.navigateByUrl(`${TenNH}/${TenDM}/${MaSP}`);
  }
  FromSearchPageToProductDetailPage(TimKiem: string, MaSP: string) {
    this.router.navigateByUrl(`search/${TimKiem}/${MaSP}`);
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Component/Pages/home-page/home-page.component';

import { SearchPageComponent } from './Component/Pages/search-page/search-page.component';
import { ProductPageComponent } from './Component/Pages/product-page/product-page.component';
import { ProductDetailPageComponent } from './Component/Pages/product-detail-page/product-detail-page.component';

import { ProfilePageComponent } from './Component/Pages/profile-page/profile-page.component';
import { LoginPageComponent } from './Component/Pages/login-page/login-page.component';
import { RegisterComponent } from './Component/Pages/register-page/register.component';
import { WishlistPageComponent } from './Component/Pages/wishlist-page/wishlist-page.component';
import { ShopcartPageComponent } from './Component/Pages/shopcart-page/shopcart-page.component';
import { PaymentPageComponent } from './Component/Pages/payment-page/payment-page.component';
import { AccountPageComponent } from './Component/Pages/account-page/account-page.component';
import { PasswordPageComponent } from './Component/Pages/password-page/password-page.component';
import { VoucherPageComponent } from './Component/Pages/voucher-page/voucher-page.component';
import { InvoicePageComponent } from './Component/Pages/invoice-page/invoice-page.component';

import { ShopInfoPage } from './Component/Pages/shop-info-page/shop-info-page.component';

const routes: Routes = [
  {
    path: 'taikhoan/hoadon',
    component: InvoicePageComponent,
  },
  {
    path: 'taikhoan/voucher',
    component: VoucherPageComponent,
  },
  {
    path: 'taikhoan/thaydoimatkhau',
    component: PasswordPageComponent,
  },
  {
    path: 'taikhoan/capnhat',
    component: AccountPageComponent,
  },
  {
    path: 'taikhoan/wishlist',
    component: WishlistPageComponent,
  },
  {
    path: 'taikhoan/payment',
    component: PaymentPageComponent,
  },
  {
    path: 'taikhoan/shopcart',
    component: ShopcartPageComponent,
  },
  {
    path: 'taikhoan',
    component: ProfilePageComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'gioi-thieu-cua-hang',
    component: ShopInfoPage,
  },
  {
    path: 'search/:timkiem/:masp',
    component: ProductDetailPageComponent,
  },
  {
    path: 'search/:timkiem',
    component: SearchPageComponent,
  },

  {
    path: ':tennh/:tendm:/:masp',
    component: ProductDetailPageComponent,
  },
  {
    path: ':tennh/:tendm',
    component: ProductPageComponent,
  },
  {
    path: ':masp',
    component: ProductDetailPageComponent,
  },
  {
    path: '**',
    component: HomePageComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  DateAdapter,
  MatNativeDateModule,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { CustomDateAdapter } from './app.dateAdapter';

import { AppComponent } from './app.component';
import { FooterComponent } from './Component/Blocks/Footer/footer.component';
import { HeaderComponent } from './Component/Blocks/Header/header.component';
import { MenuComponent } from './Component/Blocks/Menu/menu.component';

import { AppRoutingModule } from './app-routing.module';
import { HomePageModule } from './Component/Pages/home-page/home-page.module';
import { ProductPageModule } from './Component/Pages/product-page/product-page.module';
import { SearchPageModule } from './Component/Pages/search-page/search-page.module';
import { ProductDetailModule } from './Component/Pages/product-detail-page/product-detail-page.module';
import { RegisterPageModule } from './Component/Pages/register-page/register.module';
import { LoginPageModule } from './Component/Pages/login-page/login-page.module';
import { ProfilePageModule } from './Component/Pages/profile-page/profile-page.module';
import { CustomePipesModule } from './Pipes/custome-pipes.module';
import { WishlistPageModule } from './Component/Pages/wishlist-page/wishlist-page.module';
import { ShopcartPageModule } from './Component/Pages/shopcart-page/shopcart-page.module';
import { AccountPageModule } from './Component/Pages/account-page/account-page.module';
import { VoucherPageModule } from './Component/Pages/voucher-page/voucher-page.module';
import { PasswordPageModule } from './Component/Pages/password-page/password-page.module';
import { InvoicePageModule } from './Component/Pages/invoice-page/invoice-page.module';
import { PaymentPageModule } from './Component/Pages/payment-page/payment-page.module';
import { ModalModule } from './Component/Modal/modal.module';
import { AlertModule } from './Component/Alert/alert.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, MenuComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    CustomePipesModule,
    HomePageModule,
    SearchPageModule,
    ProductPageModule,
    ProductDetailModule,
    LoginPageModule,
    RegisterPageModule,
    ProfilePageModule,
    WishlistPageModule,
    ShopcartPageModule,
    AccountPageModule,
    PasswordPageModule,
    VoucherPageModule,
    InvoicePageModule,
    PaymentPageModule,
    ModalModule,
    AlertModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: DateAdapter, useClass: CustomDateAdapter },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

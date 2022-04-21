import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomePipesModule } from './pipe/pipe.module';
import {
  DateAdapter,
  MatNativeDateModule,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { CustomDateAdapter } from './app.dateAdapter';
import { ModalModule } from './Component/Blocks/Modal/modal.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FooterComponent } from './Component/Blocks/Footer/footer.component';
import { HeaderComponent } from './Component/Blocks/Header/header.component';
import { MenuComponent } from './Component/Blocks/Menu/menu.component';
import { QuanLyHoaDonComponent } from './Component/Pages/Quanlyhoadon/Quanlyhoadon.component';
import { QuanLyKhachHangComponent } from './Component/Pages/Quanlykhachhang/Quanlykhachhang.component';
import { QuanLyMaGiamGiaComponent } from './Component/Pages/Quanlymagiamgia/Quanlymagiamgia.component';
import { QuanLySanPhamComponent } from './Component/Pages/Quanlysanpham/Quanlysanpham.component';
import { QuanLySizeComponent } from './Component/Pages/Quanlysize/Quanlysize.component';
import { ThongkeComponent } from './Component/Pages/ThongKe/thongke.component';
import { QuanLyChiTietHoaDonComponent } from './Component/Pages/Quanlychitiethoadon/Quanlychitiethoadon.component';
import { QuanlyPTTTComponent } from './Component/Pages/QuanlyPTTT/QuanlyPTTT.component';
import { QuanlyPTVCComponent } from './Component/Pages/QuanlyPTVC/QuanlyPTVC.component';
import { MainComponent } from './Component/Pages/Main/main.component';
import { QuanLySPSizeComponent } from './Component/Pages/Quanlyspsize/Quanlyspsize.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    MainComponent,
    ThongkeComponent,
    QuanLyKhachHangComponent,
    QuanLyHoaDonComponent,
    QuanLyMaGiamGiaComponent,
    QuanLySanPhamComponent,
    QuanLySizeComponent,
    QuanLyChiTietHoaDonComponent,
    QuanlyPTTTComponent,
    QuanlyPTVCComponent,
    QuanLySPSizeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    CustomePipesModule,
    ModalModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: DateAdapter, useClass: CustomDateAdapter },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuanLyChiTietHoaDonComponent } from './Component/Pages/Quanlychitiethoadon/Quanlychitiethoadon.component';
import { QuanLyHoaDonComponent } from './Component/Pages/Quanlyhoadon/Quanlyhoadon.component';
import { QuanLyKhachHangComponent } from './Component/Pages/Quanlykhachhang/Quanlykhachhang.component';
import { QuanLyMaGiamGiaComponent } from './Component/Pages/Quanlymagiamgia/Quanlymagiamgia.component';
import { QuanLySanPhamComponent } from './Component/Pages/Quanlysanpham/Quanlysanpham.component';
import { QuanLySizeComponent } from './Component/Pages/Quanlysize/Quanlysize.component';
import { ThongkeComponent } from './Component/Pages/ThongKe/thongke.component';
import { QuanlyPTTTComponent } from './Component/Pages/QuanlyPTTT/QuanlyPTTT.component';
import { QuanlyPTVCComponent } from './Component/Pages/QuanlyPTVC/QuanlyPTVC.component';
import { QuanLySPSizeComponent } from './Component/Pages/Quanlyspsize/Quanlyspsize.component';

const routes: Routes = [
  { path: 'thongke', component: ThongkeComponent },
  { path: 'quanlykhachhang', component: QuanLyKhachHangComponent },
  { path: 'quanlyhoadon', component: QuanLyHoaDonComponent },
  { path: 'quanlychitiethoadon', component: QuanLyChiTietHoaDonComponent },
  { path: 'quanlymagiamgia', component: QuanLyMaGiamGiaComponent },
  { path: 'quanlysize', component: QuanLySizeComponent },
  { path: 'quanlysanpham', component: QuanLySanPhamComponent },
  { path: 'quanlyPTTT', component: QuanlyPTTTComponent },
  { path: 'quanlyPTVC', component: QuanlyPTVCComponent },
  { path: 'quanlyspsize', component: QuanLySPSizeComponent },
  { path: '**', redirectTo: '/thongke', pathMatch: 'full' },
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

import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.module';
import { ThongKe, TiLe } from 'src/app/Interfaces/interfaces';

@Component({
  selector: 'app-thongke',
  templateUrl: './thongke.component.html',
  styleUrls: ['./thongke.component.scss'],
})
export class ThongkeComponent implements OnInit {
  nam = '';
  public DanhSach_TK: ThongKe[] = [];
  public DanhSach_TKTheoNam: ThongKe[] = [];
  public DanhSach_TKTongTheoNam: ThongKe[] = [];
  public DanhSach_Nam: ThongKe[] = [];
  public DanhSach_TiLe: TiLe[] = [];

  constructor(private services: DatabaseService) {}

  ngOnInit(): void {
    this.services.POST_showTKhientai().subscribe((result) => {
      this.DanhSach_TK = result;
    });
    this.services.POST_showTiLe().subscribe((result) => {
      this.DanhSach_TiLe = result;
    });
    this.services.POST_showNam().subscribe((result) => {
      this.DanhSach_Nam = result;
    });
    this.DanhSach_TKTongTheoNam = [];
    this.DanhSach_TKTheoNam = [];
  }

  onEnter() {
    this.services.POST_showTKtheonam(this.nam).subscribe((result) => {
      this.DanhSach_TKTheoNam = result;
    });
    this.services.POST_showTKtongtheonam(this.nam).subscribe((result) => {
      this.DanhSach_TKTongTheoNam = result;
    });
  }

  refresh() {
    this.ngOnInit();
  }
}

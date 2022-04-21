import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.module';
import {
  HoaDon,
  HoaDon_KH,
  HoaDon_MaGiamGia,
  HoaDon_MaPTTT,
  HoaDon_MaPTVC,
} from 'src/app/Interfaces/interfaces';

@Component({
  selector: 'app-quanlyhoadon',
  templateUrl: './Quanlyhoadon.component.html',
  styleUrls: ['./Quanlyhoadon.component.scss'],
})
export class QuanLyHoaDonComponent implements OnInit {
  mahd = '';
  makh = '';
  magiamgia = '';
  mapttt = '';
  trangthai = '';
  ngaymua = new Date();
  ngaynhanhang = new Date();
  tongtien = 0;
  timkiem = '';
  timkiemtheo = '';
  tenkh = '';
  tenmgg = '';
  tenpttt = '';
  ghichu = '';
  maptvc = '';
  tenptvc = '';

  public itemtt = [{ name: 'Chưa thanh toán' }, { name: 'Đã thanh toán' }];
  public DanhSach_HD: HoaDon[] = [];
  public Option_MaKH: HoaDon_KH[] = [];
  public Option_MaGiamGia: HoaDon_MaGiamGia[] = [];
  public Option_MaPTTT: HoaDon_MaPTTT[] = [];
  public Option_MaPTVC: HoaDon_MaPTVC[] = [];
  public ot_timkiem = [
    { name: 'Mã hóa đơn', val: 'MaHD' },
    { name: 'Mã Khách hàng', val: 'MaKH' },
    { name: 'Mã giảm giá', val: 'MaGiamGia' },
    { name: 'Mã phương thức thanh toán', val: 'MaPTTT' },
    { name: 'Tổng tiền trên từ', val: 'TongTienTren' },
    { name: 'Tổng tiền dưới từ', val: 'TongTienDuoi' },
  ];

  constructor(private services: DatabaseService) {}

  ngOnInit(): void {
    this.services.POST_showHD().subscribe((result) => {
      console.log(result);
      this.DanhSach_HD = result;
    });
    this.services.POST_showHD_MaKH().subscribe((result) => {
      this.Option_MaKH = result;
    });
    this.services.POST_showHD_MaGiamGia().subscribe((result) => {
      this.Option_MaGiamGia = result;
    });
    this.services.POST_showHD_MaPTTT().subscribe((result) => {
      this.Option_MaPTTT = result;
    });
    this.services.POST_showHD_MaPTVC().subscribe((result) => {
      this.Option_MaPTVC = result;
    });
  }
  isNumeric(value: any) {
    return /^\d+\.\d+$|^\d+$/.test(value);
  }
  getHD(hd: HoaDon) {
    this.mahd = hd.MaHD;
    this.makh = hd.MaKH;
    this.magiamgia = hd.MaGiamGia;
    this.mapttt = hd.MaPTTT;
    this.trangthai = hd.TrangThai;
    this.ngaymua = new Date(hd.Ngaymua.replace('Z', ''));
    this.ngaynhanhang = new Date(hd.Ngaynhanhang.replace('Z', ''));
    this.tongtien = hd.TongTien;
    this.ghichu = hd.GhiChu;
    this.maptvc = hd.MaPTVC;
  }

  getHDCT(a: string, b: string, c: string, d: string) {
    this.tenkh = a;
    this.tenmgg = b;
    this.tenpttt = c;
    this.tenptvc = d;
  }

  saveHD() {
    if (this.tongtien.toString() == '') {
      alert('Mời nhập đủ dữ liệu');
    } else {
      this.services
        .POST_saveHD(
          this.makh,
          this.magiamgia,
          this.mapttt,
          this.maptvc,
          this.trangthai,
          this.ngaymua.toLocaleDateString('fr-CA'),
          this.ngaynhanhang.toLocaleDateString('fr-CA'),
          this.tongtien,
          this.ghichu,
          this.mahd
        )
        .subscribe((ketquasave) => {
          alert(ketquasave);
          window.location.reload();
        });
    }
  }

  deleteHD() {
    this.services.POST_deleteHD(this.mahd).subscribe((ketquadelete) => {
      alert(ketquadelete);
      window.location.reload();
    });
  }

  onChangeSelect(event: any) {
    this.timkiemtheo = event.target.value;
  }

  onEnter(value: string) {
    if (
      (this.timkiemtheo === 'TongTienTren' ||
        this.timkiemtheo === 'TongTienDuoi') &&
      this.isNumeric(this.timkiem) == false
    ) {
      alert('Giá trị tìm kiếm phải là số');
    } else {
      if (this.timkiemtheo != '') {
        this.timkiem = value;
        this.services
          .POST_findHD(this.timkiem, this.timkiemtheo)
          .subscribe((ketquatim) => {
            this.DanhSach_HD = ketquatim;
          });
      } else {
        alert('Hãy chọn cách tìm kiếm');
      }
    }
  }

  refresh() {
    this.ngOnInit();
    this.timkiem = '';
  }
}

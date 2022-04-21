import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.module';
import { SP, NH, DM, LPT } from 'src/app/Interfaces/interfaces';

@Component({
  selector: 'app-quanlysanpham',
  templateUrl: './Quanlysanpham.component.html',
  styleUrls: ['./Quanlysanpham.component.scss'],
})
export class QuanLySanPhamComponent implements OnInit {
  @ViewChild('loaidm1') loaidm1 = <ElementRef<HTMLSelectElement>>{};
  @ViewChild('loailpt1') loailpt1 = <ElementRef<HTMLSelectElement>>{};
  public DanhSach_SP: SP[] = [];
  public DanhSach_NH: NH[] = [];
  public DanhSach_DM: DM[] = [];
  public DanhSach_LPT: LPT[] = [];
  constructor(private services: DatabaseService) {}
  public items = [
    { name: 'Giày', value: 'Giay' },
    { name: 'Phụ trang', value: 'PhuTrang' },
  ];

  public DanhSach_TT = [
    { name: 'New', value: 'a-new' },
    { name: 'Restock', value: 'b-restock' },
    { name: 'None', value: 'c-non' },
  ];
  public ot_timkiem = [
    { name: 'Mã sản phẩm', val: 'MaSP' },
    { name: 'Tên sản phẩm', val: 'Ten' },
    { name: 'Nhãn hiệu', val: 'MaNH' },
    { name: 'Danh mục', val: 'MaDM' },
    { name: 'Giá sản phẩm trên từ', val: 'GiaTrenTu' },
    { name: 'Giá sản phẩm dưới từ', val: 'GiaDuoiTu' },
    { name: 'Khuyến mãi trên từ', val: 'KmTrenTu' },
    { name: 'Khuyến mãi dưới từ', val: 'KmDuoiTu' },
    { name: 'Trạng thái', val: 'TrangThai' },
  ];
  ngOnInit(): void {
    this.showtheo = 'Giay';
    this.is_hide = true;
    this.services.POST_showSP(this.showtheo).subscribe((result) => {
      this.DanhSach_SP = result;
    });
    this.services.POST_showNH().subscribe((result) => {
      this.DanhSach_NH = result;
    });
    this.services.POST_showLPT().subscribe((result) => {
      this.DanhSach_LPT = result;
    });
    this.services.POST_showDM(1).subscribe((result) => {
      this.DanhSach_DM = result;
    });
  }
  showtheo = '';
  table = 'Giay';
  is_hide = true;
  images: any;
  masp = '';
  tensp = '';
  trangthai = '';
  c1_h1 = '';
  c1_h2 = '';
  c1_h3 = '';
  c1_h4 = '';
  c1_h5 = '';
  c2_h1 = '';
  c2_h2 = '';
  c2_h3 = '';
  c2_h4 = '';
  c2_h5 = '';
  giasp = '';
  km = '';
  madm = '';
  manh = '';
  malpt = '';
  gioithieu = '';
  dongsanpham = '';
  bosuutap = '';
  noisanxuat = '';
  chedobaohanh = '';
  cuahangphanphoi = '';
  phukientheokem = '';
  chedovanchuyen = '';
  chitietvanchuyen = '';
  gioitinh = '';
  chatlieu = '';
  mausac = '';
  phanthan = '';
  loplot = '';
  degiay = '';
  tinhnangsanpham = '';
  file: any;
  filename = '';
  kichthuocsanpham = '';
  masptam = '';
  timkiem = '';
  timkiemtheo = '';
  loaisp = '';
  onChangeSelectLSP(event: any) {
    this.showtheo = event.target.value;
    if (this.showtheo === 'Giay') {
      this.is_hide = true;
      if (Object.keys(this.ot_timkiem).length == 10) {
        this.ot_timkiem = this.ot_timkiem.splice(0, 8);
      }
    } else if (this.showtheo === 'PhuTrang') {
      this.is_hide = false;
      this.ot_timkiem.push({ name: 'Mã loại phụ trang', val: 'MaLPT' });
    }
    this.services.POST_showSP(this.showtheo).subscribe((result) => {
      this.DanhSach_SP = result;
    });
  }
  onChangeSelectLSPThem(event: any) {
    this.table = event.target.value;
    if (this.table === 'Giay') {
      this.is_hide = true;
    } else if (this.table === 'PhuTrang') {
      this.is_hide = false;
    }
  }
  onChangeSelectNH(event: any) {
    this.services.POST_getMaSP(event.target.value).subscribe((result) => {
      var str = parseInt(result[0].substring(2, 6)) + 1;
      this.masp = result[0].substring(0, 2) + str.toString() + result[0][6];
    });
    this.services.POST_showDM(event.target.value).subscribe((result) => {
      this.DanhSach_DM = result;
    });
  }

  onChangeSelectDM(event: any) {
    this.madm = event.target.value;
  }
  onChangeSelectTT(event: any) {
    this.trangthai = event.target.value;
  }
  onChangeSelectLPT(event: any) {
    this.malpt = event.target.value;
  }
  addSP() {
    if (
      this.tensp == '' ||
      this.giasp == '' ||
      this.km == '' ||
      this.file === undefined
    ) {
      alert('Hãy nhập đủ dữ liệu');
    } else {
      if (
        this.isNumeric(this.giasp) === true &&
        this.isNumeric(this.km) === true &&
        parseFloat(this.km) >= 0 &&
        parseFloat(this.giasp) > 0
      ) {
        if (parseFloat(this.km) > 1 || parseFloat(this.km) < 0) {
          alert('Khuyến mãi phải lớn hơn 0 và bé hơn 1');
        } else {
          if (this.table === 'Giay') {
            this.services
              .POST_addGiay(
                this.madm,
                this.masp,
                this.tensp,
                this.giasp,
                this.km,
                this.trangthai,
                `assets/products/${this.masp}/${this.filename}.${
                  this.file.name.split('.')[1]
                }`
              )
              .subscribe((ketquathem) => {
                alert(ketquathem);
                window.location.reload();
              });
          } else if (this.table === 'PhuTrang') {
            this.services
              .POST_addPT(
                this.madm,
                this.masp,
                this.malpt,
                this.tensp,
                this.giasp,
                this.km,
                this.trangthai,
                `assets/products/${this.masp}/${this.filename}.${
                  this.file.name.split('.')[1]
                }`
              )
              .subscribe((ketquathem) => {
                alert(ketquathem);
                window.location.reload();
              });
          }
        }
      } else {
        alert('Giá và khuyến mãi phải là số và giá phải lớn hơn 0');
      }
    }
  }

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.images = new FormData();
      this.images.append(
        'file',
        new File(
          [this.file],
          `${this.masp}-${this.filename}.${this.file.name.split('.')[1]}`,
          {
            type: this.file.type,
            lastModified: this.file.lastModified,
          }
        )
      );
    }
  }
  addAnh() {
    this.services.POST_addImage(this.images).subscribe((ketquathem) => {
      if (ketquathem.Success === true) {
        alert('Thêm thành công');
      } else {
        alert('Thêm thất bại');
      }
    });
  }

  getCTGiay(sp: SP) {
    this.masp = sp.MaSP;
    this.tensp = sp.Ten;
    this.trangthai = sp.TrangThai;
    this.giasp = sp.Gia;
    this.km = sp.Km;
    this.madm = sp.MaDM;
    this.manh = sp.MaNH;
    this.c1_h1 = sp.c1_h1;
    this.c1_h2 = sp.c1_h2;
    this.c1_h3 = sp.c1_h3;
    this.c1_h4 = sp.c1_h4;
    this.c1_h5 = sp.c1_h5;
    this.c2_h1 = sp.c2_h1;
    this.c2_h2 = sp.c2_h2;
    this.c2_h3 = sp.c2_h3;
    this.c2_h4 = sp.c2_h4;
    this.c2_h5 = sp.c2_h5;
    this.gioithieu = sp.GioiThieu;
    this.dongsanpham = sp.DongSanPham;
    this.bosuutap = sp.BoSuuTap;
    this.noisanxuat = sp.NoiSanXuat;
    this.chedobaohanh = sp.CheDoBaoHanh;
    this.cuahangphanphoi = sp.CuaHangPhanPhoi;
    this.phukientheokem = sp.PhuKienTheoKem;
    this.chedovanchuyen = sp.CheDoVanChuyen;
    this.chitietvanchuyen = sp.ChiTietVanChuyen;
    this.gioitinh = sp.GioiTinh;
    this.chatlieu = sp.ChatLieu;
    this.mausac = sp.MauSac;
    this.phanthan = sp.PhanThan;
    this.loplot = sp.LopLot;
    this.degiay = sp.DeGiay;
    this.tinhnangsanpham = sp.TinhNangSanPham;
  }

  getGiay(sp: SP) {
    console.log('get gay');
    this.masp = sp.MaSP;
    this.tensp = sp.Ten;
    this.giasp = sp.Gia;
    this.km = sp.Km;
    this.manh = sp.MaNH;
    this.trangthai = sp.TrangThai;
    this.masptam = sp.MaSP;
    this.services.POST_showDM(parseInt(sp.MaNH)).subscribe((result) => {
      this.DanhSach_DM = result;
      setTimeout(() => {
        this.loaidm1.nativeElement.value = sp.MaDM;
      }, 100);
    });
  }

  getPT(sp: SP) {
    this.masp = sp.MaSP;
    this.tensp = sp.Ten;
    this.giasp = sp.Gia;
    this.loailpt1.nativeElement.value = sp.MaLPT;
    this.km = sp.Km;
    this.manh = sp.MaNH;
    this.trangthai = sp.TrangThai;
    this.masptam = sp.MaSP;
    this.services.POST_showDM(parseInt(sp.MaNH)).subscribe((result) => {
      this.DanhSach_DM = result;
      setTimeout(() => {
        this.loaidm1.nativeElement.value = sp.MaDM;
      }, 100);
    });
  }

  getCTPT(sp: SP) {
    this.masp = sp.MaSP;
    this.malpt = sp.MaLPT;
    this.tensp = sp.Ten;
    this.trangthai = sp.TrangThai;
    this.giasp = sp.Gia;
    this.km = sp.Km;
    this.madm = sp.MaDM;
    this.manh = sp.MaNH;
    this.c1_h1 = sp.c1_h1;
    this.c1_h2 = sp.c1_h2;
    this.c1_h3 = sp.c1_h3;
    this.c1_h4 = sp.c1_h4;
    this.c1_h5 = sp.c1_h5;
    this.c2_h1 = sp.c2_h1;
    this.c2_h2 = sp.c2_h2;
    this.c2_h3 = sp.c2_h3;
    this.c2_h4 = sp.c2_h4;
    this.c2_h5 = sp.c2_h5;
    this.gioithieu = sp.GioiThieu;
    this.dongsanpham = sp.DongSanPham;
    this.bosuutap = sp.BoSuuTap;
    this.noisanxuat = sp.NoiSanXuat;
    this.chedobaohanh = sp.CheDoBaoHanh;
    this.cuahangphanphoi = sp.CuaHangPhanPhoi;
    this.phukientheokem = sp.PhuKienTheoKem;
    this.chedovanchuyen = sp.CheDoVanChuyen;
    this.chitietvanchuyen = sp.ChiTietVanChuyen;
    this.gioitinh = sp.GioiTinh;
    this.chatlieu = sp.ChatLieu;
    this.mausac = sp.MauSac;
    this.tinhnangsanpham = sp.TinhNangSanPham;
    this.kichthuocsanpham = sp.KichThuocSanPham;
  }

  loadValue() {
    this.madm = '1';
    this.malpt = '1';
    this.trangthai = 'a-new';
    this.table = 'Giay';
    this.is_hide = true;
    this.tensp = '';
    this.giasp = '';
    this.km = '';
    this.filename = 'c1_h1';
    this.services.POST_getMaSP(1).subscribe((result) => {
      var str = parseInt(result[0].substring(2, 6)) + 1;
      this.masp = result[0].substring(0, 2) + str.toString() + result[0][6];
    });
  }
  getFilename(fn: string) {
    this.filename = fn;
  }
  suaAnh() {
    this.services
      .POST_suaAnh(
        this.showtheo,
        this.filename,
        `assets/products/${this.masp}/${this.filename}.${
          this.file.name.split('.')[1]
        }`,
        this.masp
      )
      .subscribe((result) => {
        alert(result);
        window.location.reload();
      });
  }
  suaCTSP() {
    if (this.showtheo === 'Giay') {
      this.services
        .POST_suaCTGiay(
          this.masp,
          this.gioithieu,
          this.dongsanpham,
          this.bosuutap,
          this.noisanxuat,
          this.chedobaohanh,
          this.cuahangphanphoi,
          this.phukientheokem,
          this.chedovanchuyen,
          this.chitietvanchuyen,
          this.gioitinh,
          this.chatlieu,
          this.mausac,
          this.tinhnangsanpham,
          this.phanthan,
          this.loplot,
          this.degiay
        )
        .subscribe((result) => {
          alert(result);
          this.ngOnInit();
        });
    } else if (this.showtheo === 'PhuTrang') {
      this.services
        .POST_suaCTPT(
          this.masp,
          this.gioithieu,
          this.dongsanpham,
          this.bosuutap,
          this.noisanxuat,
          this.chedobaohanh,
          this.cuahangphanphoi,
          this.phukientheokem,
          this.chedovanchuyen,
          this.chitietvanchuyen,
          this.gioitinh,
          this.chatlieu,
          this.mausac,
          this.tinhnangsanpham,
          this.kichthuocsanpham
        )
        .subscribe((result) => {
          alert(result);
          this.ngOnInit();
        });
    }
  }

  suaSP() {
    if (
      this.isNumeric(this.giasp) === true &&
      this.isNumeric(this.km) === true &&
      parseFloat(this.km) >= 0 &&
      parseFloat(this.giasp) > 0
    ) {
      if (parseFloat(this.km) > 1 || parseFloat(this.km) < 0) {
        alert('Khuyến mãi phải lớn hơn 0 và bé hơn 1');
      } else {
        if (this.showtheo === 'Giay') {
          this.services
            .POST_suaGiay(
              this.masp,
              this.masptam,
              this.madm,
              this.tensp,
              this.giasp,
              this.km,
              this.trangthai
            )
            .subscribe((result) => {
              alert(result);
              window.location.reload();
            });
        } else if (this.showtheo === 'PhuTrang') {
          this.services
            .POST_suaPT(
              this.masp,
              this.masptam,
              this.malpt,
              this.madm,
              this.tensp,
              this.giasp,
              this.km,
              this.trangthai
            )
            .subscribe((result) => {
              alert(result);
              window.location.reload();
            });
        }
      }
    } else {
      alert('Giá và khuyến mãi phải là số và giá phải lớn hơn 0');
    }
  }
  getMaSP(ma: string) {
    this.masp = ma;
  }
  xoaSP() {
    this.services.POST_deleteSP(this.masp).subscribe((result) => {
      alert(result);
      this.ngOnInit();
    });
  }
  refresh() {
    this.ngOnInit();
    this.timkiem = '';
    if (Object.keys(this.ot_timkiem).length == 10) {
      this.ot_timkiem = this.ot_timkiem.splice(0, 8);
    }
  }
  onChangeSelect(event: any) {
    this.timkiemtheo = event.target.value;
  }

  isNumeric(value: any) {
    return /^\d+\.\d+$|^\d+$/.test(value);
  }
  onEnter(value: string) {
    if (this.timkiemtheo != '') {
      if (
        (this.timkiemtheo === 'KmTrenTu' ||
          this.timkiemtheo === 'KmDuoiTu' ||
          this.timkiemtheo === 'GiaTrenTu' ||
          this.timkiemtheo === 'GiaDuoiTu') &&
        this.isNumeric(this.timkiem) === false
      ) {
        alert('Giá trị tìm cần nhập số');
      } else {
        if (
          (this.timkiemtheo == 'KmTrenTu' || this.timkiemtheo == 'KmDuoiTu') &&
          (parseFloat(this.timkiem) > 1 || parseFloat(this.timkiem) < 0)
        ) {
          alert('Khuyến mãi phải lớn hơn 0 và bé hơn 1');
        } else {
          this.timkiem = value;
          if (this.showtheo === 'Giay') {
            this.services
              .POST_findGiay(this.timkiem, this.timkiemtheo)
              .subscribe((ketquatim) => {
                this.DanhSach_SP = ketquatim;
                console.log(this.DanhSach_SP);
              });
          } else if (this.showtheo === 'PhuTrang') {
            this.services
              .POST_findPT(this.timkiem, this.timkiemtheo)
              .subscribe((ketquatim) => {
                this.DanhSach_SP = ketquatim;
                console.log(this.DanhSach_SP);
              });
          }
        }
      }
    } else {
      alert('Hãy chọn cách tìm kiếm');
    }
  }
}

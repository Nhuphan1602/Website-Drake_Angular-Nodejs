import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.module';
import { CTHD, CTHD_MaSize, CTHD_MaSP, CTHD_MaHD } from 'src/app/Interfaces/interfaces';
import { ModalService } from 'src/app/services/modal-service.module';

@Component({
  selector: 'app-quanlychitiethoadon',
  templateUrl: './Quanlychitiethoadon.component.html',
  styleUrls: ['./Quanlychitiethoadon.component.scss']
})
export class QuanLyChiTietHoaDonComponent implements OnInit {
  public DanhSach_CTHD: CTHD[] = [];
  public Option_MaSize: CTHD_MaSize[] = [];
  public Option_MaSP: CTHD_MaSP[] = [];
  public Option_MaHD: CTHD_MaHD[] = [];
  public ot_timkiem = [
    { name: 'Mã hóa đơn', val: 'MaHD' },
    { name: 'Mã sản phẩm', val: 'MaSP' },
    { name: 'Mã size', val: 'MaSize' },
    { name: 'Giá bán trên từ', val: 'GiaBanTren' },
    { name: 'Giá bán dưới từ', val: 'GiaBanDuoi' },
    { name: 'Số lượng trên từ', val: 'SoLuongTren' },
    { name: 'Số lượng dưới từ', val: 'SoLuongDuoi' }
  ];
  constructor(private services: DatabaseService, private modal_service: ModalService) { }
  tensp = "";
  giatrisize = "";
  timkiem = "";
  timkiemtheo = "";
  mahd = "";
  masp = "";
  masize = "";
  soluong = "";
  giaban = 0;
  mahd_up = "";
  masp_up = "";
  masize_up = "";

  ngOnInit(): void {
    this.services.POST_showCTHD().subscribe((result) => {
      this.DanhSach_CTHD = result;
    })
    this.services.POST_showCTHD_MaSize().subscribe((result) => {
      this.Option_MaSize = result;
    })
    this.services.POST_showCTHD_MaSP().subscribe((result) => {
      this.Option_MaSP = result;
    })
    this.services.POST_showCTHD_MaHD().subscribe((result) => {
      this.Option_MaHD = result;
    })
  }

  getCTSP(a: string, b: string) {
    this.tensp = a;
    this.giatrisize = b;
  }

  getCTHD(cthd: CTHD) {
    this.mahd = cthd.MaHD;
    this.masp = cthd.MaSP;
    this.masize = cthd.MaSize;
  }

  getSaveCTHD(cthd: any) {
    this.mahd = cthd.MaHD;
    this.masp = cthd.MaSP;
    this.masize = cthd.MaSize;
    this.soluong = cthd.SoLuong;
    this.giaban = cthd.GiaBan;
    this.mahd_up = cthd.MaHD;
    this.masp_up = cthd.MaSP;
    this.masize_up = cthd.MaSize;
  }

  deleteCTHD() {
    this.services.POST_deleteCTHD(this.mahd,this.masp,this.masize)
      .subscribe((ketquadelete) => {
          alert(ketquadelete)
          this.ngOnInit()
      })
  }

  saveCTHD() {
    if(this.soluong == null || this.giaban == null)
    {
      alert("Xin mời nhập đủ dữ liệu")
    }else{
      this.services.POST_saveCTHD(this.mahd, this.masp, this.masize, this.soluong, this.giaban, this.mahd_up, this.masp_up, this.masize_up)
      .subscribe((ketquasave) => {
        alert(ketquasave)
        this.ngOnInit()
      })
    }
  }

  onChangeSelect(event: any) {
    this.timkiemtheo = event.target.value;
  }
  isNumeric(value : any) {
    return /^\d+\.\d+$|^\d+$/.test(value);
  }
  onEnter(value: string) {
    if (this.timkiemtheo != '') {
      this.timkiem = value;
      if((this.timkiemtheo == "GiaBanTren" || this.timkiemtheo == "GiaBanDuoi" || this.timkiemtheo == "SoLuongTren" || this.timkiemtheo == "SoLuongDuoi") && this.isNumeric(this.timkiem) ===false)
      { 
          alert("Giá trị tìm kiếm phải là số")
      }else {
        this.services.POST_findCTHD(this.timkiem, this.timkiemtheo)
        .subscribe((ketquatim) => {
          this.DanhSach_CTHD = ketquatim
        })
      }
    } else {
      alert('Hãy chọn cách tìm kiếm')
    }
  }

  refresh() {
    this.ngOnInit()
    this.timkiem = ""
  }
}

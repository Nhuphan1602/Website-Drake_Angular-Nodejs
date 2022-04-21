import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.module';
import { SPSize } from 'src/app/Interfaces/interfaces';
@Component({
  selector: 'app-quanlyspzie',
  templateUrl: './Quanlyspsize.component.html',
  styleUrls: ['./Quanlyspsize.component.scss']
})
export class QuanLySPSizeComponent implements OnInit {
  public DanhSach_SPSize: SPSize[] = [];
  public ot_timkiem = [
    { name: 'Tên mã giảm giá', val: 'Ten' },
    { name: 'Mã giảm giá', val: 'MaGiamGia' },
    { name: 'Giá trị', val: 'GiaTri' }
  ];
  constructor(private services: DatabaseService) { }
  timkiem = '';
  timkiemtheo = '';
  masp = "";
  masize = "";
  soluong = 0;
  giatri = "";
  ngOnInit(): void {

  }
  isNumeric(value : any) {
    return /^\d+\.\d+$|^\d+$/.test(value);
  }
  onEnter(value: string) {
    this.services.POST_showSPSize(value).subscribe((result) => {
      this.DanhSach_SPSize = result;
    })
  }

  getSPSize(sps: SPSize) {
    this.masize = sps.MaSize;
    this.soluong = parseInt(sps.SoLuong);
    this.masp = sps.MaSP;
    this.giatri = sps.Giatri;
  }

  saveSPSize() {
    if(this.soluong.toString() == "")
    { 
      alert("Mời nhập số lượng")
    }else{
      this.services.POST_suaSPSize(this.masp,this.masize,this.soluong).subscribe((result) => {
        alert(result);
        this.services.POST_showSPSize(this.masp).subscribe((result) => {
          this.DanhSach_SPSize = result;
        })
      })
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.module';
import { MGG } from 'src/app/Interfaces/interfaces';
@Component({
  selector: 'app-quanlymagiamgia',
  templateUrl: './Quanlymagiamgia.component.html',
  styleUrls: ['./Quanlymagiamgia.component.scss']
})
export class QuanLyMaGiamGiaComponent implements OnInit {
  public DanhSach_MGG: MGG[] = [];
  public ot_timkiem = [
    { name: 'Tên mã giảm giá', val: 'Ten' },
    { name: 'Mã giảm giá', val: 'MaGiamGia' },
    { name: 'Giá trị', val: 'GiaTri' }
  ];
  constructor(private services: DatabaseService) { }
  timkiem = '';
  timkiemtheo = '';
  magg = '';
  tenmgg = '';
  giatri = '';
  dieukien = '';
  hsd = new Date();

  ngOnInit(): void {
    this.services.POST_showMGG().subscribe((result) => {
      this.DanhSach_MGG = result;
    })
  }
  isNumeric(value : any) {
    return /^\d+\.\d+$|^\d+$/.test(value);
  }
  addMGG() {
    if(this.tenmgg == "" || this.giatri == "" || this.dieukien =="")
    {
      alert("Xin mời nhập đầy đủ dữ liệu")
    }else
    { 
      if(parseFloat(this.giatri) >=0 && parseFloat(this.giatri) <= 1 && this.isNumeric(this.giatri) === true && this.isNumeric(this.dieukien))
      { 
        console.log(this.dieukien)
        this.services.POST_addMGG(this.tenmgg, this.giatri, this.dieukien,this.hsd.toLocaleDateString('fr-CA'))
        .subscribe((ketquathem) => {
          alert(ketquathem)
          this.ngOnInit()
        })
      }else{
        alert("Khuyến mãi phải là số và lớn hơn 0 bé hơn 1 và điều kiện phải là số")
      }
    }
  }
  loadValue() {
    this.giatri = ""
    this.hsd = new Date();
    this.tenmgg = ""
    this.dieukien = ""
  }
  getMGG(mgg: MGG) {
    this.magg = mgg.MaGiamGia;
    this.tenmgg = mgg.Ten;
    this.giatri = mgg.GiaTri;
    this.dieukien = mgg.DieuKien;
    this.hsd = new Date(mgg.HanSuDung.replace('Z', ''));
  }

  getIDMGG(idmgg: any) {
    this.magg = idmgg;
  }

  deleteMGG() {
    this.services.POST_deleteMGG(this.magg)
      .subscribe((ketquadelete) => {
        alert(ketquadelete)
        this.ngOnInit()
      })
  }

  saveMGG() {
    if(this.tenmgg == "" || this.giatri == "")
    {
      alert("Xin mời nhập đầy đủ dữ liệu")
    }else
    { 
      if(parseFloat(this.giatri) >=0 && parseFloat(this.giatri) <= 1 && this.isNumeric(this.giatri) === true)
      { 
        this.services.POST_saveMGG(this.magg, this.tenmgg, this.giatri, this.dieukien ,this.hsd.toLocaleDateString('fr-CA'))
        .subscribe((ketquasave) => {
          alert(ketquasave)
          this.ngOnInit()
        })
      }else{
        alert("Khuyến mãi phải là số và lớn hơn 0 bé hơn 1")
      }
    }
  }

  onChangeSelect(event: any) {
    this.timkiemtheo = event.target.value;
  }
  
  onEnter(value: string) {
    if (this.timkiemtheo != '') {
      this.timkiem = value;
      this.services.POST_findMGG(this.timkiem, this.timkiemtheo)
        .subscribe((ketquatim) => {
          this.DanhSach_MGG = ketquatim
        })
    } else {
      alert('Hãy chọn cách tìm kiếm')
    }
  }
  refresh() {
    this.ngOnInit()
    this.timkiem = ""
  }
}

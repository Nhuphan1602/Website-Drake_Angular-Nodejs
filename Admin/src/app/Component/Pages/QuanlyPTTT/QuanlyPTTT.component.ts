import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.module';
import { PTTT } from 'src/app/Interfaces/interfaces';
@Component({
  selector: 'app-QuanlyPTTT',
  templateUrl: './QuanlyPTTT.component.html',
  styleUrls: ['./QuanlyPTTT.component.scss']
})
export class QuanlyPTTTComponent implements OnInit {
  mapttt = '';
  tenpttt = '';
  phi = 0;
  timkiem = '';
  timkiemtheo = '';

  public DanhSach_PTTT: PTTT[] = [];
  public ot_timkiem = [
    { name: 'Mã phương thức thanh toán', val: 'MaPTTT' },
    { name: 'Tên phương thức thanh toán', val: 'Ten' },
    { name: 'Phí', val: 'Phi' }
  ];
  constructor(private services: DatabaseService) { }

  ngOnInit(): void {
    this.services.POST_showPTTT().subscribe((result) => {
      this.DanhSach_PTTT = result;
    })
  }
  isNumeric(value : any) {
    return /^\d+\.\d+$|^\d+$/.test(value);
  }
  addPTTT(){
    if(this.tenpttt == "" || this.phi.toString() == "")
    {
      alert("Xin mời nhập đầy đủ dữ liệu")
    }else
    { 
      if(this.phi >= 0 && this.isNumeric(this.phi) === true)
      { 
        this.services.POST_addPTTT(this.tenpttt, this.phi)
        .subscribe((ketquathem) => {
          alert(ketquathem)
          this.ngOnInit()
        })
      }else{
        alert("Phí phải là số và lớn hơn hoặc bằng 0")
      }
    }
  }

  getPTTT(pttt: any){
    this.mapttt = pttt.MaPTTT,
    this.tenpttt = pttt.Ten,
    this.phi = pttt.Phi
  }
  loadValue() {
    this.tenpttt = ""
    this.phi = 0;
  }
  savePTTT(){
    if(this.tenpttt == "" || this.phi.toString() == "")
    {
      alert("Xin mời nhập đầy đủ dữ liệu")
    }else
    { 
      if(this.phi >= 0 && this.isNumeric(this.phi) === true)
      { 
        this.services.POST_savePTTT(this.tenpttt, this.phi, this.mapttt)
        .subscribe((ketquasave) => {
          alert(ketquasave)
          this.ngOnInit()
        })
      }else{
        alert("Phí phải là số và lớn hơn hoặc bằng 0")
      }
    }
  }

  deletePTTT(){
    this.services.POST_deletePTTT(this.mapttt)
      .subscribe((ketquadelete) => {
        alert(ketquadelete)
        this.ngOnInit()
      })
  }

  onChangeSelect(event: any) {
    this.timkiemtheo = event.target.value;
  }

  onEnter(value: string) {
    if (this.timkiemtheo != '') {
      this.timkiem = value;
      this.services.POST_findPTTT(this.timkiem, this.timkiemtheo)
        .subscribe((ketquatim) => {
          this.DanhSach_PTTT = ketquatim
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

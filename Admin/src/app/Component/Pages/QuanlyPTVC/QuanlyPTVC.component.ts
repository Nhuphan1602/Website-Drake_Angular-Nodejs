import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.module';
import { PTVC } from 'src/app/Interfaces/interfaces';

@Component({
  selector: 'app-QuanlyPTVC',
  templateUrl: './QuanlyPTVC.component.html',
  styleUrls: ['./QuanlyPTVC.component.scss']
})
export class QuanlyPTVCComponent implements OnInit {
  maptvc = '';
  tenptvc = '';
  phi = 0;
  timkiem = '';
  timkiemtheo = '';

  public DanhSach_PTVC: PTVC[] = [];
  public ot_timkiem = [
    { name: 'Mã phương thức vận chuyển', val: 'MaPTVC' },
    { name: 'Tên phương thức vận chuyển', val: 'Ten' },
    { name: 'Phí', val: 'Phi' }
  ];
  
  constructor(private services: DatabaseService) { }

  ngOnInit(): void {
    this.services.POST_showPTVC().subscribe((result) => {
      this.DanhSach_PTVC = result;
    })
  }
  
  addPTVC(){
    if(this.tenptvc == "" || this.phi.toString() == "")
    {
      alert("Xin mời nhập đầy đủ dữ liệu")
    }else
    { 
      if(this.phi >= 0 && this.isNumeric(this.phi) === true)
      { 
        this.services.POST_addPTVC(this.tenptvc, this.phi)
        .subscribe((ketquathem) => {
          alert(ketquathem)
          this.ngOnInit()
        })
      }else{
        alert("Phí phải là số và lớn hơn hoặc bằng 0")
      }
    }
  }
  loadValue() {
    this.tenptvc = ""
    this.phi = 0;
  }
  getPTVC(pttt: any){
    this.maptvc = pttt.MaPTVC,
    this.tenptvc = pttt.Ten,
    this.phi = pttt.Phi
  }
  isNumeric(value : any) {
    return /^\d+\.\d+$|^\d+$/.test(value);
  }
  savePTVC(){
    if(this.tenptvc == "" || this.phi.toString() == "")
    {
      alert("Xin mời nhập đầy đủ dữ liệu")
    }else
    { 
      if(this.phi >= 0 && this.isNumeric(this.phi) === true)
      { 
        this.services.POST_savePTVC(this.tenptvc, this.phi, this.maptvc)
        .subscribe((ketquasave) => {
          alert(ketquasave)
          this.ngOnInit()
        })
      }else{
        alert("Phí phải là số và lớn hơn hoặc bằng 0")
      }
    }
  }

  deletePTVC(){
    this.services.POST_deletePTVC(this.maptvc)
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
      this.services.POST_findPTVC(this.timkiem, this.timkiemtheo)
        .subscribe((ketquatim) => {
          this.DanhSach_PTVC = ketquatim
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

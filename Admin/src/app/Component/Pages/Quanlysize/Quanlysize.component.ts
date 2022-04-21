import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.module';
import { Size } from 'src/app/Interfaces/interfaces';

@Component({
  selector: 'app-quanlysize',
  templateUrl: './Quanlysize.component.html',
  styleUrls: ['./Quanlysize.component.scss']
})
export class QuanLySizeComponent implements OnInit {

  public DanhSach_Size: Size[] = [];
  public ot_timkiem = [
    { name: 'Mã size', val: 'MaSize' },
    { name: 'Giá trị size', val: 'GiaTri' },
  ];

  constructor(private services: DatabaseService) { }
  timkiem = '';
  timkiemtheo = '';
  masize = '';
  giatri = '';

  ngOnInit(): void {
    this.services.POST_showSize().subscribe((result) => {
      this.DanhSach_Size = result;
    })
  }
  addSize() {
    if(this.giatri == "") 
    {
      alert("Hãy nhập đủ thông tin")
    }else
    {
      this.services.POST_addSize(this.giatri)
      .subscribe((ketquathem) => {
        alert(ketquathem)
        this.ngOnInit()
      })
    }
  }

  getSize(size: any) {
    this.masize = size.MaSize;
    this.giatri = size.GiaTri;
  }

  getIDSize(idsize: any) {
    this.masize = idsize;
  }

  deleteSize() {
    this.services.POST_deleteSize(this.masize)
    .subscribe((ketquadelete) => {
      alert(ketquadelete)
      this.ngOnInit()
    })
  }
  
  saveSize() {
    if(this.giatri == "") 
    {
      alert("Hãy nhập đủ thông tin")
    }else
    {
      this.services.POST_saveSize(this.masize,this.giatri)
      .subscribe((ketquasave) => {
        alert(ketquasave)
        this.ngOnInit()
      })
    }
  }

  loadValue() {
    this.giatri = ""
  }
  onChangeSelect(event : any) {
    this.timkiemtheo = event.target.value;
  }
  
  onEnter(value : string){
    if(this.timkiemtheo != '')
    {
      this.timkiem = value;
      this.services.POST_findSize(this.timkiem, this.timkiemtheo)
      .subscribe((ketquatim) => {
        this.DanhSach_Size = ketquatim
      })
    }else
    {
      alert('Hãy chọn cách tìm kiếm')
    }
  }
  refresh() {
    this.ngOnInit()
    this.timkiem = ""
  }
}

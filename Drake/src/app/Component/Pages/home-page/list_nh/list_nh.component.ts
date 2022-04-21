import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/Services/utility.module';

@Component({
  selector: 'home-page-list_nh',
  templateUrl: 'list_nh.component.html',
  styleUrls: ['list_nh.component.scss'],
})
export class List_nhComponent implements OnInit {
  constructor(private utility_service: UtilityService) {}
  ngOnInit() {}
  ToProductPage(TenNH: string, TenDM: string) {
    this.utility_service.ToProductPage(TenNH, TenDM);
  }
}

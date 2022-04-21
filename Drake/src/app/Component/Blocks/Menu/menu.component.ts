import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/Services/database.module';
import {
  iCategoryRaw,
  iCategoryProcessed,
  iAccessory,
} from 'src/app/Interfaces/menu-interface/menu-interface';
import { UtilityService } from 'src/app/Services/utility.module';
@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public DanhSachNH: iCategoryProcessed[] = [];
  public DanhSachAccessories: iAccessory[] = [];
  constructor(
    private database_service: DatabaseService,
    private utility_service: UtilityService
  ) {}
  ngOnInit() {
    this.database_service
      .POST_MenuCategories()
      .subscribe((DanhSachCategories) => {
        this.DanhSachNH = this.ProcessNhRaw(DanhSachCategories);
      });

    this.database_service
      .POST_MenuAccessories()
      .subscribe((DanhSachAccessories) => {
        this.DanhSachAccessories = DanhSachAccessories;
      });
  }

  ProcessNhRaw(data: iCategoryRaw[]) {
    let result = data.reduce(
      (accumulator: iCategoryProcessed[], ele, index, array) => {
        if (index === 0) {
          accumulator.push({
            TenNH: ele.TenNH,

            DM: [
              {
                TenDM: ele.TenDM,
              },
            ],
          });
        } else if (accumulator[accumulator.length - 1].TenNH !== ele.TenNH) {
          accumulator.push({
            TenNH: ele.TenNH,

            DM: [
              {
                TenDM: ele.TenDM,
              },
            ],
          });
        } else {
          accumulator[accumulator.length - 1].DM.push({
            TenDM: ele.TenDM,
          });
        }
        return accumulator;
      },
      []
    );
    return result;
  }
  onKeyDownEvent(event: any) {
    this.utility_service.ToSearchPage(event.value);
    event.value = ""
  }
}

import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import { DataBridgeService } from 'src/app/Component/Pages/product-page/services/data-bridge.module';
import { iSortSelect1 } from 'src/app/Interfaces/product-interface/product-interface';

@Component({
  selector: 'product-page-selection',
  templateUrl: 'selection.component.html',
  styleUrls: ['selection.component.scss'],
})
export class SelectionComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  //Two way data binding
  SortOptionValue2 = 'A,MaSP';

  //Lấy thông tin do list_products gửi vô service để tạo thành SortSelect1
  @Input() SortSelect1: iSortSelect1 = { TenDM: '', GiaTri: [] };

  constructor(private data_bridge_service: DataBridgeService) {}
  ngOnInit() {
    //Để có thể set lại giá trị mặc định cho SortSelect2
    this.data_bridge_service.SortOptionValue2$.pipe(
      skip(1),
      takeUntil(this.ngUnsubscribe)
    ).subscribe((SortOptionValue2) => {
      this.SortOptionValue2 = SortOptionValue2;
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onClick(BtnEvent: any) {
    this.data_bridge_service.Set_SortOptionValue1({
      TenDM: this.SortSelect1.TenDM,
      /* TenDM : 'Accessories & Apparel' || 'Km'*/

      GiaTri: BtnEvent.textContent,
    });
  }
  onChange() {
    this.data_bridge_service.Set_SortOptionValue2(this.SortOptionValue2);
  }
}

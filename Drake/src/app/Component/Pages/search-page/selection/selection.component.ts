import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import { DataBridgeService } from '../services/data_bridge_service.module';

@Component({
  selector: 'selection',
  templateUrl: 'selection.component.html',
  styleUrls: ['selection.component.scss'],
})
export class SelectionComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  //Two way data binding
  SortOptionValue = 'A,MaSP';

  constructor(private data_bridge_service: DataBridgeService) {}
  ngOnInit() {
    //Để có thể set lại giá trị mặc định cho SortSelect
    this.data_bridge_service.SortOptionValue$.pipe(
      skip(1),
      takeUntil(this.ngUnsubscribe)
    ).subscribe((SortOptionValue) => {
      this.SortOptionValue = SortOptionValue;
    });
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  onChange() {
    this.data_bridge_service.Set_SortOptionValue(this.SortOptionValue);
  }
}

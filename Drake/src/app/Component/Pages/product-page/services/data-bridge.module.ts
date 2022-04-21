import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { iSortOptionValue1 } from 'src/app/Interfaces/product-interface/product-interface';
@Injectable()
export class DataBridgeService {
  constructor() {}
  private SortOptionValue1 = new BehaviorSubject<iSortOptionValue1>({
    TenDM: '',
    GiaTri: '',
  });
  SortOptionValue1$ = this.SortOptionValue1.asObservable();
  Set_SortOptionValue1(SortOptionValue1: iSortOptionValue1) {
    this.SortOptionValue1.next(SortOptionValue1);
  }

  private SortOptionValue2 = new BehaviorSubject<string>('');
  SortOptionValue2$ = this.SortOptionValue2.asObservable();
  Set_SortOptionValue2(SortOptionValue2: string) {
    this.SortOptionValue2.next(SortOptionValue2);
  }
}

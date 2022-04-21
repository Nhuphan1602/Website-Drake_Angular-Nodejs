import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataBridgeService {
  constructor() {}

  private SortOptionValue = new BehaviorSubject<string>('');
  SortOptionValue$ = this.SortOptionValue.asObservable();
  Set_SortOptionValue(SortOptionValue: string) {
    this.SortOptionValue.next(SortOptionValue);
  }
}

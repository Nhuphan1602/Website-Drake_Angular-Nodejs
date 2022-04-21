import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
  private tk = new BehaviorSubject<{ matk: string }>({ matk: '' });
  tk$ = this.tk.asObservable();
  Set_tk(user: { matk: string }) {
    this.tk.next(user);
  }
}

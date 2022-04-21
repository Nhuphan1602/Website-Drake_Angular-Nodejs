import { Injectable } from '@angular/core';
import { LocalStorageRefService } from './local-storage-ref.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private local_storage: Storage;
  constructor(private local_storage_ref_service: LocalStorageRefService) {
    this.local_storage = this.local_storage_ref_service.localStorage;
  }

  /*
Nếu trình duyệt không hỗ trợ LocalStorage trả về empty object,
Nếu trình duyệt có hỗ trợ mà key kh có dữ liệu trả về null
  */
  get<T>(key: string) {
    if (this.isLocalStorageSupported) {
      return <T>JSON.parse(`${this.local_storage.getItem(key)}`);
    }
    return <T>{};
  }
  set(key: string, value: any): boolean {
    if (this.isLocalStorageSupported) {
      this.local_storage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }
  remove(key: string): boolean {
    if (this.isLocalStorageSupported) {
      this.local_storage.removeItem(key);
      return true;
    }
    return false;
  }
  clear(): boolean {
    if (this.isLocalStorageSupported) {
      this.local_storage.clear();
      return true;
    }
    return false;
  }
  get isLocalStorageSupported(): boolean {
    return !!this.local_storage;
  }
}

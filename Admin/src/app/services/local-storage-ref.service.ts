import { Injectable } from '@angular/core';

function getLocalStorage(): Storage {
  return window.localStorage;
}

@Injectable({ providedIn: 'root' })
export class LocalStorageRefService {
  get localStorage() {
    return getLocalStorage();
  }
}

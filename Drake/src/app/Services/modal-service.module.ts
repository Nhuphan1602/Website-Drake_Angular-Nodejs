import { Injectable } from '@angular/core';
import { ModalComponent } from '../Component/Modal/modal.component';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private modals: ModalComponent[] = [];
  add(modal: ModalComponent) {
    this.modals.push(modal);
  }
  remove(id: string) {
    this.modals = this.modals.filter((ele) => {
      return ele.id !== id;
    });
  }

  open(id: string) {
    const modal = this.modals.find((ele) => {
      return ele.id === id;
    });
    if (modal) {
      modal.Open();
    } else {
      console.log(`Modal id - ${id} not found.`);
    }
  }
}

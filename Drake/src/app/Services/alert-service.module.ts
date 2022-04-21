import { Injectable } from '@angular/core';
import { AlertComponent } from '../Component/Alert/alert.component';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private alerts: AlertComponent[] = [];
  add(alert: AlertComponent) {
    this.alerts.push(alert);
  }
  remove(id: string) {
    this.alerts = this.alerts.filter((ele) => {
      return ele.id !== id;
    });
  }
  open(id: string) {
    const alert = this.alerts.find((ele) => {
      return ele.id === id;
    });
    if (alert) {
      alert.Open();
    } else {
      console.log(`Alert id - ${id} not found.`);
    }
  }
  close(id: string) {
    const alert = this.alerts.find((ele) => {
      return ele.id === id;
    });
    if (alert) {
      alert.Close();
    } else {
      console.log(`Alert id - ${id} not found.`);
    }
  }
}

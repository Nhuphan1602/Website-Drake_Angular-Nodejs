import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { AlertService } from 'src/app/Services/alert-service.module';

@Component({
  selector: 'alert',
  templateUrl: 'alert.component.html',
  styleUrls: ['alert.component.scss'],
})
export class AlertComponent implements OnChanges, OnDestroy {
  @Input() id = '';
  @Input() Content = '';
  @Input() Type = '';
  IsAlerted = false;
  constructor(private alert_service: AlertService) {}
  ngOnChanges() {
    if (!this.id) {
      console.log('Alert must have an id');
      return;
    }
    this.alert_service.add(this);
  }
  ngOnDestroy() {
    this.alert_service.remove(this.id);
  }
  Open() {
    this.IsAlerted = true;
  }
  Close() {
    this.IsAlerted = false;
  }
}

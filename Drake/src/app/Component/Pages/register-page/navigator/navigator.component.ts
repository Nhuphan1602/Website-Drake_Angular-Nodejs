import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/Services/utility.module';

@Component({
  selector: 'navigator',
  templateUrl: 'navigator.component.html',
  styleUrls: ['navigator.component.scss', '../../../../Scss/navigator.scss'],
})
export class NavigatorComponent implements OnInit {
  constructor(private utility_service: UtilityService) {}
  ngOnInit() {}
  ToHome() {
    this.utility_service.ToHome();
  }
  ToRegisterPage() {
    this.utility_service.ToRegisterPage();
  }
}

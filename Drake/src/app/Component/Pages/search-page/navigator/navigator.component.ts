import { Component, Input, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/Services/utility.module';

@Component({
  selector: 'navigator',
  templateUrl: 'navigator.component.html',
  styleUrls: ['navigator.component.scss', '../../../../Scss/navigator.scss'],
})
export class NavigatorComponent implements OnInit {
  @Input() TimKiem = '';
  constructor(private utility_serive: UtilityService) {}
  ngOnInit() {}
  ToHome() {
    this.utility_serive.ToHome();
  }
  ToSearchPage() {
    this.utility_serive.ToSearchPage(this.TimKiem);
  }
}

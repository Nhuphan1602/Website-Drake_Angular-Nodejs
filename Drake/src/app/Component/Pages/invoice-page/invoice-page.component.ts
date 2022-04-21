import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { iHoaDon } from 'src/app/Interfaces/user-interface/user-interface';
import { DatabaseService } from 'src/app/Services/database.module';
import { UserService } from 'src/app/Services/user.module';
import { UtilityService } from 'src/app/Services/utility.module';

@Component({
  selector: 'invoice-page',
  templateUrl: 'invoice-page.component.html',
  styleUrls: [
    'invoice-page.component.scss',
    '../../../Scss/mytable.scss',
    '../../../Scss/button-container.scss',
  ],
})
export class InvoicePageComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  ListInvoices: iHoaDon[] = [];
  constructor(
    private user_service: UserService,
    private utility_service: UtilityService,
    private database_service: DatabaseService
  ) {}
  ngOnInit() {
    this.user_service.MaKH$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (makh) => {
        if (makh) {
          this.database_service
            .POST_Select_Hoadon(makh)
            .subscribe((listinvoices) => {
              this.ListInvoices = listinvoices;
            });
        } else {
          this.utility_service.ToHome();
        }
      }
    );
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ToProfilePage() {
    this.utility_service.ToProfilePage();
  }
  ToShopcartPage() {
    this.utility_service.ToShopcartPage();
  }
}

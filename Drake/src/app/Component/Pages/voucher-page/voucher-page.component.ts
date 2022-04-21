import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { iMaGiamGia } from 'src/app/Interfaces/user-interface/user-interface';
import { DatabaseService } from 'src/app/Services/database.module';
import { UserService } from 'src/app/Services/user.module';
import { UtilityService } from 'src/app/Services/utility.module';

@Component({
  selector: 'voucher-page',
  templateUrl: 'voucher-page.component.html',
  styleUrls: [
    'voucher-page.component.scss',
    '../../../Scss/mytable.scss',
    '../../../Scss/button-container.scss',
  ],
})
export class VoucherPageComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  ListVouchers: iMaGiamGia[] = [];
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
            .POST_Select_Khmgg(makh)
            .subscribe((listvouchers) => {
              this.ListVouchers = listvouchers;
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
  ToInvoicePage() {
    this.utility_service.ToInvoicePage();
  }
}

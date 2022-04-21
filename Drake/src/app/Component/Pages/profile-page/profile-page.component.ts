import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { iUser } from 'src/app/Interfaces/user-interface/user-interface';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { UserService } from 'src/app/Services/user.module';
import { UtilityService } from 'src/app/Services/utility.module';

@Component({
  selector: 'profile-page',
  templateUrl: 'profile-page.component.html',
  styleUrls: ['profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  User = <iUser>{};
  constructor(
    private user_service: UserService,
    private utility_service: UtilityService,
    private local_storage_service: LocalStorageService
  ) {}
  ngOnInit() {
    this.user_service.UserExistence$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((bool) => {
      if (bool) {
        this.User = this.local_storage_service.get<iUser>('user');
      } else {
        this.utility_service.ToHome();
      }
    });
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ToAccountPage() {
    this.utility_service.ToAccountPage();
  }
  ToPasswordPage() {
    this.utility_service.ToPasswordPage();
  }
  ToWishlistPage() {
    this.utility_service.ToWishlistPage();
  }

  ToShopcartPage() {
    this.utility_service.ToShopcartPage();
  }
  ToVoucherPage() {
    this.utility_service.ToVoucherPage();
  }
  ToInvoicePage() {
    this.utility_service.ToInvoicePage();
  }
}

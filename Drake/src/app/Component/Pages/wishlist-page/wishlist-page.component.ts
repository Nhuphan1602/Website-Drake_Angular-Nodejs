import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { iWishListItem } from 'src/app/Interfaces/user-interface/user-interface';
import { DatabaseService } from 'src/app/Services/database.module';
import { ModalService } from 'src/app/Services/modal-service.module';
import { UserService } from 'src/app/Services/user.module';
import { UtilityService } from 'src/app/Services/utility.module';

@Component({
  selector: 'wishlist-page',
  templateUrl: 'wishlist-page.component.html',
  styleUrls: [
    'wishlist-page.component.scss',
    '../../../Scss/mytable.scss',
    '../../../Scss/button-container.scss',
  ],
})
export class WishlistPageComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  MaKH = '';
  WishListItems: iWishListItem[] = [];
  constructor(
    private user_service: UserService,
    private modal_service: ModalService,
    private utility_service: UtilityService,
    private database_service: DatabaseService
  ) {}
  ngOnInit() {
    this.user_service.MaKH$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (makh) => {
        if (makh) {
          this.MaKH = makh;
          //
          this.user_service.Wishlist$.pipe(
            takeUntil(this.ngUnsubscribe)
          ).subscribe((wishlist) => {
            this.WishListItems = JSON.parse(JSON.stringify(wishlist));
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
  ToHome() {
    this.utility_service.ToHome();
  }
  ToProfilePage() {
    this.utility_service.ToProfilePage();
  }
  FromHomeToProductDetailPage(masp: string) {
    this.utility_service.FromHomeToProductDetailPage(masp);
  }

  //Chức năng xóa
  AskForDeleteFromWishlist(masp: string) {
    this.modal_service.open(`wishlist-page-modal${masp}`);
  }
  DeleteFromWishlist(index: number, masp: string) {
    this.database_service
      .POST_Delete_Wishlist(this.MaKH, masp)
      .subscribe((ketqua) => {
        if (ketqua.Success) {
          this.WishListItems.splice(index, 1);
          this.user_service.Set_Wishlist(this.WishListItems);
        } else {
          this.modal_service.open('wishlist-page-modal1');
        }
      });
  }
  DeleteFromWishlistkModalClosed(event: boolean, index: number, masp: string) {
    if (event) {
      this.DeleteFromWishlist(index, masp);
    }
  }
  //
}

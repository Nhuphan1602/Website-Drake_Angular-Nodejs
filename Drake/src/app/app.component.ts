import { Component, OnInit } from '@angular/core';
import { iUser } from './Interfaces/user-interface/user-interface';
import { DatabaseService } from './Services/database.module';
import { LocalStorageService } from './Services/local-storage.service';
import { UserService } from './Services/user.module';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular';
  constructor(
    private http: HttpClient,
    private user_service: UserService,
    private database_service: DatabaseService,
    private local_storage_service: LocalStorageService
  ) {}
  ngOnInit() {
    const User = this.local_storage_service.get<iUser>('user');
    if (JSON.stringify(User) !== '{}' && JSON.stringify(User) !== 'null') {
      this.user_service.Set_UserExistence(true);
      this.user_service.Set_MaKH(User.MaKH);
      this.database_service
        .POST_Select_Wishlist(User.MaKH)
        .subscribe((wishlist) => {
          this.user_service.Set_Wishlist(wishlist);
        });

      this.database_service
        .POST_Select_Shopcart(User.MaKH)
        .subscribe((shopcart) => {
          this.user_service.Set_Shopcart(shopcart);
        });
    } else {
      this.user_service.Set_UserExistence(false);
      this.user_service.Set_MaKH('');
      this.user_service.Set_Wishlist([]);
      this.user_service.Set_Shopcart([]);
    }
  }
  BackToTop() {
    window.scrollTo(0, 0);
  }
}

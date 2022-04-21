import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatabaseService } from 'src/app/Services/database.module';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { ModalService } from 'src/app/Services/modal-service.module';
import { UserService } from 'src/app/Services/user.module';
import { UtilityService } from 'src/app/Services/utility.module';

@Component({
  selector: 'login-page',
  templateUrl: 'login-page.component.html',
  styleUrls: ['login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private user_service: UserService,
    private modal_service: ModalService,
    private utility_service: UtilityService,
    private database_service: DatabaseService,
    private local_storage_service: LocalStorageService
  ) {}
  ngOnInit() {}
  ToRegisterPage() {
    this.utility_service.ToRegisterPage();
  }
  DangNhap(email: string, password: string) {
    /*User từ node trả về chỉ có thể là object, nếu thất bại thì object đó rỗng */
    this.database_service.POST_Login_User(email, password).subscribe((User) => {
      if (JSON.stringify(User) !== '{}') {
        this.local_storage_service.set('user', User);
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

        this.utility_service.ToHome();
      } else {
        this.modal_service.open('login-page-modal1');
      }
    });
  }
}

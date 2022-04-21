import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatabaseService } from 'src/app/Services/database.module';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { ModalService } from 'src/app/Services/modal-service.module';
import { UserService } from 'src/app/Services/user.module';
import { UtilityService } from 'src/app/Services/utility.module';
import { UserAddress } from 'src/assets/user-address';

@Component({
  selector: 'register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss', '../../../Scss/myform.scss'],
})
export class RegisterComponent implements OnInit {
  minDate = new Date(new Date().getFullYear() - 150, 0, 1);
  maxDate = new Date();
  districts = ['Quận / Huyện'];
  cities = UserAddress.cities;
  Password = '';
  ConfirmPassword = '';

  constructor(
    private user_service: UserService,
    private modal_service: ModalService,
    private utility_service: UtilityService,
    private database_service: DatabaseService,
    private local_storage_service: LocalStorageService
  ) {}
  ngOnInit() {}

  changeCity(cityname: string) {
    if (cityname) {
      this.districts =
        this.cities.find((data) => data.name === cityname)?.districts || [];
    }
  }
  ToLoginPage() {
    this.utility_service.ToLoginPage();
  }
  registerUser(form: NgForm) {
    delete form.value.confirmpassword;
    this.database_service
      .POST_Register_User({
        ...form.value,
        NgaySinh: this.utility_service.Date_Sql(new Date(form.value.NgaySinh)),
      })
      .subscribe((ketqua) => {
        if (ketqua.Success) {
          this.modal_service.open('register-page-modal1');
        } else {
          this.modal_service.open('register-page-modal2');
        }
      });
  }
  Modal1Closed(email: string, password: string) {
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

        this.utility_service.ToProfilePage();
      }
    });
  }
}

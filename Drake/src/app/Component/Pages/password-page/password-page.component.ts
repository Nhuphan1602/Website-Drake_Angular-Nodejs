import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatabaseService } from 'src/app/Services/database.module';
import { ModalService } from 'src/app/Services/modal-service.module';
import { UserService } from 'src/app/Services/user.module';
import { UtilityService } from 'src/app/Services/utility.module';

@Component({
  selector: 'password-page',
  templateUrl: 'password-page.component.html',
  styleUrls: [
    'password-page.component.scss',
    '../../../Scss/myform.scss',
    '../../../Scss/button-container.scss',
  ],
})
export class PasswordPageComponent implements OnInit {
  constructor(
    private user_service: UserService,
    private modal_service: ModalService,
    private utility_service: UtilityService,
    private database_service: DatabaseService
  ) {}
  MaKH = '';
  NewPassword = '';
  ConfirmPassword = '';
  ngOnInit() {
    this.user_service.MaKH$.subscribe((makh) => {
      if (makh) {
        this.MaKH = makh;
      } else {
        this.utility_service.ToHome();
      }
    });
  }
  ToProfilePage() {
    this.utility_service.ToProfilePage();
  }
  ChangePassword(form: NgForm) {
    this.database_service
      .POST_Update_Password_User(
        this.MaKH,
        form.value.newpassword,
        form.value.oldpassword
      )
      .subscribe((ketqua) => {
        if (ketqua.Success) {
          this.modal_service.open('password-page-modal1');
        } else {
          this.modal_service.open('password-page-modal2');
        }
      });
  }
  Modal1Closed() {
    this.utility_service.ToProfilePage();
  }
}

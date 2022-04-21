import { AfterContentInit, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { iUser } from 'src/app/Interfaces/user-interface/user-interface';
import { DatabaseService } from 'src/app/Services/database.module';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { ModalService } from 'src/app/Services/modal-service.module';
import { UserService } from 'src/app/Services/user.module';
import { UtilityService } from 'src/app/Services/utility.module';
import { UserAddress } from 'src/assets/user-address';

@Component({
  selector: 'account-page',
  templateUrl: 'account-page.component.html',
  styleUrls: [
    'account-page.component.scss',
    '../../../Scss/myform.scss',
    '../../../Scss/button-container.scss',
  ],
})
export class AccountPageComponent implements OnInit, AfterContentInit {
  minDate = new Date(new Date().getFullYear() - 150, 0, 1);
  maxDate = new Date();
  districts: string[] = [];
  cities = UserAddress.cities;
  User = <iUser>{};
  constructor(
    private route: ActivatedRoute,
    private user_service: UserService,
    private modal_service: ModalService,
    private utility_service: UtilityService,
    private database_service: DatabaseService,
    private local_storage_service: LocalStorageService
  ) {}

  ngOnInit() {
    this.user_service.UserExistence$.subscribe((bool) => {
      if (bool) {
        this.route.url.subscribe(() => {
          this.User = this.local_storage_service.get<iUser>('user');
        });
      } else {
        this.utility_service.ToHome();
      }
    });
  }
  ngAfterContentInit() {
    this.changeCity(this.User.TinhThanh);
  }

  changeCity(cityname: string) {
    if (cityname) {
      this.districts =
        this.cities.find((data) => data.name === cityname)?.districts || [];
    }
  }

  ToProfilePage() {
    this.utility_service.ToProfilePage();
  }
  updateUser(form: NgForm) {
    this.database_service
      .POST_Update_User({
        MaKH: this.User.MaKH,
        ...form.value,
        NgaySinh: this.utility_service.Date_Sql(new Date(form.value.NgaySinh)),
      })
      .subscribe((ketqua) => {
        if (ketqua.Success) {
          //
          this.local_storage_service.set('user', {
            MaKH: this.User.MaKH,
            ...form.value,
            NgaySinh: new Date(form.value.NgaySinh).toISOString(),
          });
          //
          this.modal_service.open('account-page-modal1');
        } else {
          this.modal_service.open('account-page-modal2');
        }
      });
  }
  Modal1Closed() {
    this.utility_service.ToProfilePage();
  }
}

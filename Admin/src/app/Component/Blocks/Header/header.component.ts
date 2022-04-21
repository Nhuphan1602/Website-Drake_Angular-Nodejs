import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.module';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.module';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
})
export class HeaderComponent implements OnInit {
  matk = '';
  @ViewChild('closeButton') closeButton = <ElementRef<HTMLButtonElement>>{};

  constructor(
    private service: DatabaseService,
    private localStorage: LocalStorageService,
    private UserService: UserService
  ) {}
  ngOnInit() {
    this.UserService.tk$.subscribe((user) => {
      this.matk = user.matk;
    });
  }

  DangXuat() {
    this.UserService.Set_tk({ matk: '' });
    this.localStorage.remove('user-admin');
  }

  DangNhap(form: any) {
    this.service
      .POST_login(form.value.taikhoan, form.value.matkhau)
      .subscribe((user) => {
        if (user.matk) {
          this.localStorage.set('user-admin', user);
          this.UserService.Set_tk(user);
          this.closeButton.nativeElement.click();
        } else {
          alert('Đăng nhập thất bại!');
          this.UserService.Set_tk({ matk: '' });
          this.localStorage.remove('user-admin');
        }
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';
import { UserService } from './services/user.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Admin';

  constructor(
    private UserService: UserService,
    private local_storage_service: LocalStorageService
  ) {}
  ngOnInit() {
    const User = this.local_storage_service.get<{ matk: string }>('user-admin');
    if (JSON.stringify(User) !== '{}' && JSON.stringify(User) !== 'null') {
      this.UserService.Set_tk(User);
    } else {
      this.UserService.Set_tk({ matk: '' });
    }
  }
}

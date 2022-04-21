import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.module';

@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss'],
})
export class MainComponent implements OnInit {
  UserIsExists = false;
  constructor(private UserService: UserService) {}
  ngOnInit() {
    this.UserService.tk$.subscribe((user) => {
      if (user.matk) {
        this.UserIsExists = true;
      } else {
        this.UserIsExists = false;
      }
    });
  }
}

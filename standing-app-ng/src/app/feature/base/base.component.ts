import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemService } from '../../service/system.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-base',
  template: ''
})
export class BaseComponent implements OnInit {
  title: string = '';
  message?: string = undefined;
  loggedInUser: User = new User();
  userIsAdmin: boolean = false;
  userIsLoggedIn: boolean = false;


  constructor(
    protected sysSvc: SystemService,
    protected router: Router
  ) {}

  ngOnInit(): void {
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.userIsLoggedIn = this.loggedInUser.id != 0;
    this.userIsAdmin = this.loggedInUser.admin;
    if(!this.userIsLoggedIn) {
      this.router.navigateByUrl('user/login');
    }
  }
}

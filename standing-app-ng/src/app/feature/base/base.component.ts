import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemService } from '../../service/system.service';

@Component({
  selector: 'app-base',
  template: ''
})
export class BaseComponent implements OnInit {
  title: string = '';
  message?: string = undefined;

  constructor(
    private sysSvc: SystemService,
    protected router: Router
  ) {}

  ngOnInit(): void {
    /*this.loggedInUser = this.sysSvc.loggedInUser;
    this.userIsLoggedIn = this.loggedInUser.id != 0;
    this.userIsAdmin = this.loggedInUser.admin;
    this.userIsReviewer = this.loggedInUser.reviewer;
    if(!this.userIsLoggedIn) {
      this.router.navigateByUrl('user/login');
    }*/
  }
}

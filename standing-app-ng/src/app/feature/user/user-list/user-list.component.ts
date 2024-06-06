import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user.service';
import { BaseComponent } from '../../base/base.component';
import { SystemService } from '../../../service/system.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent extends BaseComponent {
  users: User[] = [];

  constructor(
    router: Router,
    sysSvc: SystemService,
    private userSvc: UserService
  ){
    super(sysSvc, router);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    if(!this.userIsLoggedIn && this.loggedInUser.admin) {
      this.router.navigateByUrl('user/login');
    }
    this.title = 'User List';
    this.userSvc.getAllUsers().subscribe({
      next: (resp) => {
        this.users = resp;
      },
      error: (err) => {
        this.message = err
      },
      complete: () => {}
    })
  }
}

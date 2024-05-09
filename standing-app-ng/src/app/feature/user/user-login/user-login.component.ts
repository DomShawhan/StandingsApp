import { Component } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { UserService } from '../../../service/user.service';
import { SystemService } from '../../../service/system.service';
import { Router } from '@angular/router';
import { UserLogin } from '../../../model/userlogin';
import { User } from '../../../model/user';
import { MenuComponent } from '../../../core/menu/menu.component';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent extends BaseComponent {
  userLogin: UserLogin = new UserLogin();

  constructor(
    private userSvc: UserService,
    sysSvc: SystemService,
    router: Router
  ) {
    super(sysSvc, router);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.userLogin.username = 'DShawhan';
    this.userLogin.password = 'D0m1n1c';
    this.sysSvc.loggedInUser = new User();
  }

  login(): void {
    this.userSvc.loginUser(this.userLogin).subscribe({
      next: (resp) => {
        this.sysSvc.loggedInUser = resp;
        this.router.navigate([MenuComponent]);
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        this.message = "Invalid email/password combination. Try again";
      },
      complete: () => {}
    });
  }
}

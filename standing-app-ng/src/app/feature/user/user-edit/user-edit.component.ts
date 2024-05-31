import { Component } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';
import { RegisterUser } from '../../../model/registerUser';

@Component({
  selector: 'app-user-edit',
  templateUrl: '../field-template/field.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent extends BaseComponent {
  user: RegisterUser = new RegisterUser();
  userId: number = 0;
  showPassword: boolean = false;
  buttonText: string = 'Edit';

  constructor(
    private userSvc: UserService,
    router: Router,
    sysSvc: SystemService,
    private route: ActivatedRoute
  ) {
    super(sysSvc, router);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.route.params.subscribe({
      next: (parms) => {
        this.userId = parms['id'];
        this.userSvc.getUserById(this.userId).subscribe({
          next: (resp) => {
            this.user = new RegisterUser(resp.id, resp.username, resp.firstname, resp.lastname, resp.phone, resp.email, '', resp.admin);
          },
          error: (err) => {
            this.message = err;
          },
          complete: () => {}
        });
      },
      error: (err) => {
        this.message = err;
      },
      complete: () => {}
    });
  }

  save(): void {
    this.userSvc.editUser(this.user).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/user/detail/' + resp.id);
      },
      error: (err) => {
        this.message = err;
      },
      complete: () => {}
    });
  }
}

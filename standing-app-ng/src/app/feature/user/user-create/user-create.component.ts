import { Component, OnInit } from '@angular/core';
import { RegisterUser } from '../../../model/registerUser';
import { BaseComponent } from '../../base/base.component';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-user-create',
  templateUrl: '../field-template/field.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent extends BaseComponent {
  user: RegisterUser = new RegisterUser();
  showPassword: boolean = true;
  buttonText: string = 'Save';

  constructor(
    private userSvc: UserService,
    router: Router,
    sysSvc: SystemService
  ) {
    super(sysSvc, router);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  save(): void {
    this.userSvc.createUser(this.user).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/user/detail/' +resp.id);
      },
      error: (err) => {
        console.log(err);
        this.message = err;
      },
      complete: () => {}
    });
  }
}

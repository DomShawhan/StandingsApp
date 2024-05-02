import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/user';
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
  user: User = new User();
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
        this.user = resp;
        this.router.navigateByUrl('/user/detail/' + this.user.id);
      },
      error: (err) => {
        console.log(err);
        this.message = err;
      },
      complete: () => {}
    });
  }
}

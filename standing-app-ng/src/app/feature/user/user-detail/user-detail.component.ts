import { Component } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user.service';
import { SystemService } from '../../../service/system.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent extends BaseComponent {
  user: User = new User();
  userId: number = 0;

  constructor(
    private userSvc: UserService,
    private route: ActivatedRoute,
    sysSvc: SystemService,
    router: Router
  ) {
    super(sysSvc, router)
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.title = 'User-Detail';
    this.route.params.subscribe({
      next: (parms) => {
        this.userId = parms['id'];
        this.userSvc.getUserById(this.userId).subscribe({
          next: (resp) => {
            this.user = resp;
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

  delete(id: number): void {
    this.userSvc.deleteUser(id).subscribe({
      next: (resp) => {
        if(resp) {
          this.router.navigateByUrl('/user/list');
        } else {
          this.message = 'Delete Error: Something went wrong.';
        }
      }, 
      error: (err) => {
        this.message = err;
      },
      complete: () => {}
    });
  } 
}

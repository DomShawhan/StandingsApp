import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  loggedInUser: User = new User();

  constructor(
    private router: Router
  ) { }

  userLoggedIn(): boolean {
    return (this.loggedInUser.id != 0);
  }
}

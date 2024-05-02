import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  loggedInUser: User = new User();

  constructor() { }
}

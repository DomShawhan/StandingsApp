import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { RegisterUser } from '../model/registerUser';
import { Observable } from 'rxjs';
import { UserLogin } from '../model/userlogin';

const URL: string = 'https://localhost:7252/api/users';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get(URL + '/') as Observable<User[]>;
  }

  getUserById(id: number): Observable<User> {
    return this.http.get(URL + `/${id}`) as Observable<User>;
  }

  createUser(user: RegisterUser): Observable<User> {
    return this.http.post(URL + '/', user) as Observable<User>;
  }

  editUser(user: User): Observable<User> {
    return this.http.put(URL + '/' + user.id, user) as Observable<User>;
  }

  deleteUser(id: number): Observable<boolean> {
    return this.http.delete(URL + `/${id}`) as Observable<boolean>;
  }

  loginUser(userLogin: UserLogin): Observable<User> {
    return this.http.post(URL + '/login', userLogin) as Observable<User>;
  }
}

import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../model/menuitems';
import { SystemService } from '../../service/system.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  menuItems: MenuItem[] = [];
  loggedInUser?: User = undefined;
  loggedIn: boolean = false;

  constructor(
    private sysSvc: SystemService
  ){}

  ngOnInit(): void {
    this.loggedIn = this.sysSvc.userLoggedIn();
    if(this.loggedIn) {
      this.loggedInUser = this.sysSvc.loggedInUser;
    }
    if(this.loggedInUser?.admin == true) {
      this.menuItems.push(new MenuItem("Users", "user/list", "Users"));
    }
    this.menuItems.push(new MenuItem("Leagues", "league/list", "Leagues"));
  }
}

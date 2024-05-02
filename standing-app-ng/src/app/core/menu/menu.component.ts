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

  constructor(
    private sysSvc: SystemService
  ){}

  ngOnInit(): void {
    if(this.sysSvc.userLoggedIn()) {
      this.loggedInUser = this.sysSvc.loggedInUser;
    }
    this.menuItems.push(new MenuItem("Users", "user/list", "Users"));
    this.menuItems.push(new MenuItem("Leagues", "league/list", "Leagues"));
  }
}

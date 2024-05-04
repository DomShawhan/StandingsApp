import { Component } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { LeagueService } from '../../../service/league.service';
import { SystemService } from '../../../service/system.service';
import { Router } from '@angular/router';
import { League } from '../../../model/league';

@Component({
  selector: 'app-league-create',
  templateUrl: '../field-template/field.component.html',
  styleUrl: './league-create.component.css'
})
export class LeagueCreateComponent extends BaseComponent {
  league: League = new League();
  buttonText: string = 'Save';

  constructor(
    private leagueSvc: LeagueService,
    sysSvc: SystemService,
    router: Router
  ){
    super(sysSvc, router);
  }

  save(): void {
    this.leagueSvc.createLeague(this.league).subscribe({
      next: (resp) => {
        this.league = resp;
        this.router.navigateByUrl('/league/list');
      }
    });
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.league.managerId = this.loggedInUser.id;
  }
}

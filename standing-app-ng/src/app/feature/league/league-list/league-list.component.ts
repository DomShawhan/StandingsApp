import { Component } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { League } from '../../../model/league';
import { LeagueService } from '../../../service/league.service';
import { SystemService } from '../../../service/system.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-league-list',
  templateUrl: './league-list.component.html',
  styleUrl: './league-list.component.css'
})
export class LeagueListComponent extends BaseComponent {
  leagues: League[] = [];

  constructor(
    private leagueSvc: LeagueService,
    sysSvc: SystemService,
    router: Router
  ){
    super(sysSvc, router);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.leagueSvc.getAllLeagues().subscribe({
      next: (resp) => {
        this.leagues = resp;
      },
      error: (err) => {
        this.message = err;
      },
      complete: () => {}
    });
  }
}

import { Component } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { League } from '../../../model/league';
import { LeagueService } from '../../../service/league.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-league-edit',
  templateUrl: '../field-template/field.component.html',
  styleUrl: './league-edit.component.css'
})
export class LeagueEditComponent extends BaseComponent {
  league: League = new League();
  leagueId: number = 0;
  buttonText: string = 'Edit';

  constructor(
    private leagueSvc: LeagueService,
    router: Router,
    sysSvc: SystemService,
    private route: ActivatedRoute
  ) {
    super(sysSvc, router);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    if(!this.userIsLoggedIn) {
      this.router.navigateByUrl('user/login');
    }
    this.route.params.subscribe({
      next: (parms) => {
        this.leagueId = parms['id'];
        this.leagueSvc.getLeagueById(this.leagueId).subscribe({
          next: (resp) => {
            this.league = resp;
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

  save(): void {
    this.leagueSvc.editLeague(this.league).subscribe({
      next: (resp) => {
        this.league = resp;
        this.router.navigateByUrl('/league/detail/' + this.league.id);
      },
      error: (err) => {
        this.message = err;
      },
      complete: () => {}
    });
  }
}

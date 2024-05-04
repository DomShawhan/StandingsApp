import { Component } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { League } from '../../../model/league';
import { LeagueService } from '../../../service/league.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';
import { TeamService } from '../../../service/team.service';
import { Team } from '../../../model/team';
import { Game } from '../../../model/game';
import { GameService } from '../../../service/game.service';

@Component({
  selector: 'app-league-detail',
  templateUrl: './league-detail.component.html',
  styleUrl: './league-detail.component.css'
})
export class LeagueDetailComponent extends BaseComponent {
  league: League = new League();
  leagueId: number = 0;
  teams: Team[] = [];
  games: Game[] = [];

  constructor(
    private leagueSvc: LeagueService,
    private teamSvc: TeamService,
    private route: ActivatedRoute,
    private gameSvc: GameService,
    sysSvc: SystemService,
    router: Router
  ) {
    super(sysSvc, router)
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.title = 'League-Detail';
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
        this.teamSvc.getTeamsByLeagueId(this.leagueId).subscribe({
          next: (resp) => {
            this.teams = resp;
          },
          error: (err) => {
            this.message = err;
          },
          complete: () => {}
        });
        this.gameSvc.getGamesByLeagueId(this.leagueId).subscribe({
          next: (resp) => {
            this.games = resp;
            console.log(this.games)
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
    this.leagueSvc.deleteLeague(id).subscribe({
      next: (resp) => {
        if(resp) {
          this.router.navigateByUrl('/league/list');
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

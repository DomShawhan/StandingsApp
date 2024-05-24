import { Component } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { Team } from '../../../model/team';
import { TeamService } from '../../../service/team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';
import { GameService } from '../../../service/game.service';
import { Game } from '../../../model/game';
import { PlayerService } from '../../../service/player.service';
import { Player } from '../../../model/player';
import { stat } from 'fs';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrl: './team-detail.component.css'
})
export class TeamDetailComponent extends BaseComponent {
  team: Team = new Team();
  teamId: number = 0;
  games: Game[] = [];
  players: Player[] = [];

  constructor(
    private teamSvc: TeamService,
    private gameSvc: GameService,
    private playerSvc: PlayerService,
    private route: ActivatedRoute,
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
        this.teamId = parms['id'];
        this.teamSvc.getTeamById(this.teamId).subscribe({
          next: (resp) => {
            this.team = resp;
          },
          error: (err) => {
            this.message = err;
          },
          complete: () => {}
        });
        this.gameSvc.getGamesByTeamId(this.teamId).subscribe({
          next: (resp) => {
            this.games = resp;
          },
          error: (err) => {
            this.message = err;
          },
          complete: () => {}
        });
        this.playerSvc.getPlayersByTeam(this.teamId).subscribe({
          next: (resp) => {
            console.log(resp)
            this.players = resp;
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
    this.teamSvc.deleteTeam(id).subscribe({
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

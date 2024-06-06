import { Component } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { Game } from '../../../model/game';
import { Team } from '../../../model/team';
import { TeamService } from '../../../service/team.service';
import { GameService } from '../../../service/game.service';
import { SystemService } from '../../../service/system.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-create',
  templateUrl: '../field-template/field.component.html',
  styleUrl: './game-create.component.css'
})
export class GameCreateComponent extends BaseComponent {
  game: Game = new Game();
  buttonText: string = 'Save';
  teams: Team[] = [];
  leagueId: number = 0;

  constructor(
    private teamSvc: TeamService,
    private gameSvc: GameService,
    sysSvc: SystemService,
    router: Router,
    private route: ActivatedRoute
  ){
    super(sysSvc, router);
  }

  save(): void {
    this.game.awayTeamId = this.game.awayTeam.id;
    this.game.homeTeamId = this.game.homeTeam.id;
    this.game.status = 'NEW';
    this.gameSvc.createGame(this.game).subscribe({
      next: (resp) => {
        this.game = resp;
        this.router.navigateByUrl('/game/detail/'+this.game.id);
      },
      error: (err) => {
        console.log(err)
        this.message = err;
      },
      complete: () => {}
    });
  }

  override ngOnInit(): void {
    super.ngOnInit();
    if(!this.userIsLoggedIn) {
      this.router.navigateByUrl('user/login');
    }
    this.route.params.subscribe({
      next: (parms) => {
        this.leagueId = parms['leagueid'];
        this.teamSvc.getTeamsByLeagueId(this.leagueId).subscribe({
          next: (resp) => {
            this.teams = resp;
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

  compTeam(a: Team, b: Team): boolean {
    return a && b && a.id === b.id;
  }
}

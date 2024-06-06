import { Component } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { Game } from '../../../model/game';
import { Team } from '../../../model/team';
import { GameService } from '../../../service/game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-game-score',
  templateUrl: './game-score.component.html',
  styleUrl: './game-score.component.css'
})
export class GameScoreComponent extends BaseComponent {
  game:  Game = new Game();
  gameId: number = 0;
  buttonText: string = 'Edit';

  constructor(
    private gameSvc: GameService,
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
        this.gameId = parms['id'];
        this.gameSvc.getGameById(this.gameId).subscribe({
          next: (resp) => {
            this.game = resp;
            if(this.game.status == 'COMPLETED') {
              this.router.navigateByUrl('/game/detail/' + this.game.id);
            }
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
    this.gameSvc.setGameScore(this.game).subscribe({
      next: (resp) => {
        this.game = resp;
        this.router.navigateByUrl('/game/detail/' + this.game.id);
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

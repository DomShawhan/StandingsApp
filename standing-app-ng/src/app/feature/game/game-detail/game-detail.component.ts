import { Component } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { Game } from '../../../model/game';
import { GameService } from '../../../service/game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.css'
})
export class GameDetailComponent extends BaseComponent {
  game: Game = new Game();
  gameId: number = 0;

  constructor(
    private gameSvc: GameService,
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
        this.gameId = parms['id'];
        this.gameSvc.getGameById(this.gameId).subscribe({
          next: (resp) => {
            this.game = resp;
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
    this.gameSvc.deleteGame(id).subscribe({
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

import { Component } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { Player } from '../../../model/player';
import { PlayerService } from '../../../service/player.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrl: './player-detail.component.css'
})
export class PlayerDetailComponent extends BaseComponent  {
  player: Player = new Player();
  playerId: number = 0;
  playerAge: number = 0;

  constructor(
    private playerSvc: PlayerService,
    private route: ActivatedRoute,
    sysSvc: SystemService,
    router: Router
  ) {
    super(sysSvc, router);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.route.params.subscribe({
      next: (parms) => {
        this.playerId = parms['id'];
        this.playerSvc.getPlayerById(this.playerId).subscribe({
          next: (resp) => {
            this.player = resp;
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
    this.playerSvc.deletePlayer(id).subscribe({
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

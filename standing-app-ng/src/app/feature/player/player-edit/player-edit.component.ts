import { Component } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { Player } from '../../../model/player';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '../../../service/player.service';
import { SystemService } from '../../../service/system.service';
import { Team } from '../../../model/team';

@Component({
  selector: 'app-player-edit',
  templateUrl: '../field-template/field.component.html',
  styleUrl: './player-edit.component.css'
})
export class PlayerEditComponent extends BaseComponent {
  player: Player = new Player();
  playerId: number = 0;
  buttonText: string = 'Edit';

  constructor(
    private playerSvc: PlayerService,
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

  save(): void {
    this.playerSvc.editPlayer(this.player).subscribe({
      next: (resp) => {
        this.player = resp;
        this.router.navigateByUrl('/team/detail/' + this.player.teamId);
      },
      error: (err) => {
        this.message = err;
      },
      complete: () => {}
    });
  }

  compBatsOrThrows(a: string, b: string): boolean {
    return a === b;
  }
}

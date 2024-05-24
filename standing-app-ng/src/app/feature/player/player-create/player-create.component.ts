import { Component } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { Player } from '../../../model/player';
import { Team } from '../../../model/team';
import { PlayerService } from '../../../service/player.service';
import { SystemService } from '../../../service/system.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-player-create',
  templateUrl: '../field-template/field.component.html',
  styleUrl: './player-create.component.css'
})
export class PlayerCreateComponent extends BaseComponent  {
  player: Player = new Player();
  buttonText: string = 'Save';
  teamId: number = 0;

  constructor(
    private playerSvc: PlayerService,
    sysSvc: SystemService,
    router: Router,
    private route: ActivatedRoute
  ){
    super(sysSvc, router);
  }

  save(): void {
    this.playerSvc.createPlayer(this.player).subscribe({
      next: (resp) => {
        this.player = resp;
        this.router.navigateByUrl('/team/detail/'+this.teamId);
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
    this.route.params.subscribe({
      next: (parms) => {
        this.player.teamId = parms['teamid'];
        this.teamId = this.player.teamId;
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

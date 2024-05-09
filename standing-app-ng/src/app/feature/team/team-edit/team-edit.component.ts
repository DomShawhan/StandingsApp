import { Component } from '@angular/core';
import { Team } from '../../../model/team';
import { TeamService } from '../../../service/team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';
import { BaseComponent } from '../../base/base.component';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-team-edit',
  templateUrl: '../field-template/field.component.html',
  styleUrl: './team-edit.component.css'
})
export class TeamEditComponent extends BaseComponent {
  team: Team = new Team();
  teamId: number = 0;
  buttonText: string = 'Edit';
  users: User[] = [];

  constructor(
    private teamSvc: TeamService,
    private userSvc: UserService,
    router: Router,
    sysSvc: SystemService,
    private route: ActivatedRoute
  ) {
    super(sysSvc, router);
  }

  override ngOnInit(): void {
    super.ngOnInit();
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
        this.userSvc.getAllUsers().subscribe({
          next: (resp) => {
            this.users = resp;
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
    this.team.coachId = this.team.coach.id;
    this.team.coach.password = '123';
    this.team.leagueId = this.team.league.id;
    this.teamSvc.editTeam(this.team).subscribe({
      next: (resp) => {
        this.team = resp;
        this.router.navigateByUrl('/team/detail/' + this.team.id);
      },
      error: (err) => {
        this.message = err;
      },
      complete: () => {}
    });
  }

  compUser(a: User, b: User): boolean {
    return a && b && a.id === b.id;
  }
}

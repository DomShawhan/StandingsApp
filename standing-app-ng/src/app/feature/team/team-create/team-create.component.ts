import { Component } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { Team } from '../../../model/team';
import { TeamService } from '../../../service/team.service';
import { SystemService } from '../../../service/system.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { User } from '../../../model/user';
import { LeagueService } from '../../../service/league.service';

@Component({
  selector: 'app-team-create',
  templateUrl: '../field-template/field.component.html',
  styleUrl: './team-create.component.css'
})
export class TeamCreateComponent extends BaseComponent {
  team: Team = new Team();
  buttonText: string = 'Save';
  users: User[] = [];

  constructor(
    private teamSvc: TeamService,
    private userSvc: UserService,
    private leagueSvc: LeagueService,
    sysSvc: SystemService,
    router: Router,
    private route: ActivatedRoute
  ){
    super(sysSvc, router);
  }

  save(): void {
    this.team.coachId = this.team.coach.id;
    this.team.leagueId = this.team.league.id;
    console.log(this.team)
    this.teamSvc.createTeam(this.team).subscribe({
      next: (resp) => {
        this.team = resp;
        this.router.navigateByUrl('/league/detail/'+this.team.leagueId);
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
        this.team.leagueId = parms['leagueid'];
        this.leagueSvc.getLeagueById(this.team.leagueId).subscribe({
          next: (resp) => {
            this.team.league = resp;
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
    this.userSvc.getAllUsers().subscribe({
      next: (resp) => {
        this.users = resp;
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

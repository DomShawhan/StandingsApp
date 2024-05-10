import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './feature/user/user-list/user-list.component';
import { UserDetailComponent } from './feature/user/user-detail/user-detail.component';
import { UserCreateComponent } from './feature/user/user-create/user-create.component';
import { UserEditComponent } from './feature/user/user-edit/user-edit.component';
import { UserLoginComponent } from './feature/user/user-login/user-login.component';
import { LeagueListComponent } from './feature/league/league-list/league-list.component';
import { LeagueCreateComponent } from './feature/league/league-create/league-create.component';
import { LeagueDetailComponent } from './feature/league/league-detail/league-detail.component';
import { LeagueEditComponent } from './feature/league/league-edit/league-edit.component';
import { TeamCreateComponent } from './feature/team/team-create/team-create.component';
import { TeamDetailComponent } from './feature/team/team-detail/team-detail.component';
import { TeamEditComponent } from './feature/team/team-edit/team-edit.component';
import { GameCreateComponent } from './feature/game/game-create/game-create.component';
import { GameDetailComponent } from './feature/game/game-detail/game-detail.component';
import { GameEditComponent } from './feature/game/game-edit/game-edit.component';
import { GameScoreComponent } from './feature/game/game-score/game-score.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch:'full'},
  {path: 'home', component: UserListComponent},
  {path: 'user/list', component: UserListComponent},
  {path: 'user/create', component: UserCreateComponent},
  {path: 'user/detail/:id', component: UserDetailComponent},
  {path: 'user/edit/:id', component: UserEditComponent},
  {path: 'user/login', component: UserLoginComponent},
  {path: 'league/list', component: LeagueListComponent},
  {path: 'league/create', component: LeagueCreateComponent},
  {path: 'league/detail/:id', component: LeagueDetailComponent},
  {path: 'league/edit/:id', component: LeagueEditComponent},
  {path: 'team/create/:leagueid', component: TeamCreateComponent},
  {path: 'team/detail/:id', component: TeamDetailComponent},
  {path: 'team/edit/:id', component: TeamEditComponent},
  {path: 'game/create/:leagueid', component: GameCreateComponent},
  {path: 'game/detail/:id', component: GameDetailComponent},
  {path: 'game/edit/:id', component: GameEditComponent},
  {path: 'game/score/:id', component: GameScoreComponent},
  {path: '**', component: UserListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

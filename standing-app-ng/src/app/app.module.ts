import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserListComponent } from './feature/user/user-list/user-list.component';
import { BaseComponent } from './feature/base/base.component';
import { MenuComponent } from './core/menu/menu.component';
import { UserDetailComponent } from './feature/user/user-detail/user-detail.component';
import { UserEditComponent } from './feature/user/user-edit/user-edit.component';
import { UserCreateComponent } from './feature/user/user-create/user-create.component';
import { UserLoginComponent } from './feature/user/user-login/user-login.component';
import { LeagueListComponent } from './feature/league/league-list/league-list.component';
import { LeagueDetailComponent } from './feature/league/league-detail/league-detail.component';
import { LeagueCreateComponent } from './feature/league/league-create/league-create.component';
import { LeagueEditComponent } from './feature/league/league-edit/league-edit.component';
import { TeamCreateComponent } from './feature/team/team-create/team-create.component';
import { TeamDetailComponent } from './feature/team/team-detail/team-detail.component';
import { TeamEditComponent } from './feature/team/team-edit/team-edit.component';
import { GameDetailComponent } from './feature/game/game-detail/game-detail.component';
import { GameCreateComponent } from './feature/game/game-create/game-create.component';
import { GameEditComponent } from './feature/game/game-edit/game-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    BaseComponent,
    MenuComponent,
    UserDetailComponent,
    UserEditComponent,
    UserCreateComponent,
    UserLoginComponent,
    LeagueListComponent,
    LeagueDetailComponent,
    LeagueCreateComponent,
    LeagueEditComponent,
    TeamCreateComponent,
    TeamDetailComponent,
    TeamEditComponent,
    GameDetailComponent,
    GameCreateComponent,
    GameEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

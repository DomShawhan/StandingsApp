import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../model/team';

const URL: string = 'https://localhost:7252/api/teams';
@Injectable({
  providedIn: 'root'
})
export class TeamService {
  constructor(private http: HttpClient) { }

  getAllTeams(): Observable<Team[]> {
    return this.http.get(URL + '/') as Observable<Team[]>;
  }

  getTeamById(id: number): Observable<Team> {
    return this.http.get(URL + `/${id}`) as Observable<Team>;
  }

  getTeamsByLeagueId(leagueid: number): Observable<Team[]> {
    return this.http.get(URL + `/league/${leagueid}`) as Observable<Team[]>;
  }

  createTeam(team: Team): Observable<Team> {
    return this.http.post(URL + '/', team) as Observable<Team>;
  }

  editTeam(team: Team): Observable<Team> {
    return this.http.put(URL + '/' + team.id, team) as Observable<Team>;
  }

  deleteTeam(id: number): Observable<boolean> {
    return this.http.delete(URL + `/${id}`) as Observable<boolean>;
  }
}

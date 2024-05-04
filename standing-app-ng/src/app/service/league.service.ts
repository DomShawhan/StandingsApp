import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { League } from '../model/league';

const URL: string = 'https://localhost:7252/api/leagues';
@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  constructor(private http: HttpClient) { }

  getAllLeagues(): Observable<League[]> {
    return this.http.get(URL + '/') as Observable<League[]>;
  }

  getLeagueById(id: number): Observable<League> {
    return this.http.get(URL + `/${id}`) as Observable<League>;
  }

  createLeague(league: League): Observable<League> {
    return this.http.post(URL + '/', league) as Observable<League>;
  }

  editLeague(league: League): Observable<League> {
    return this.http.put(URL + '/' + league.id, league) as Observable<League>;
  }

  deleteLeague(id: number): Observable<boolean> {
    return this.http.delete(URL + `/${id}`) as Observable<boolean>;
  }
}

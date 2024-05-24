import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../model/player';

const URL: string = 'https://localhost:7252/api/players';
@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(private http: HttpClient) { }

  getPlayersByTeam(teamId: number): Observable<Player[]> {
    return this.http.get(URL + `/team/${teamId}`) as Observable<Player[]>;
  }

  getPlayerById(id: number): Observable<Player> {
    return this.http.get(URL + `/${id}`) as Observable<Player>;
  }

  createPlayer(player: Player): Observable<Player> {
    return this.http.post(URL + '/', player) as Observable<Player>;
  }

  editPlayer(player: Player): Observable<Player> {
    return this.http.put(URL + '/' + player.id, player) as Observable<Player>;
  }

  deletePlayer(id: number): Observable<boolean> {
    return this.http.delete(URL + `/${id}`) as Observable<boolean>;
  }
}

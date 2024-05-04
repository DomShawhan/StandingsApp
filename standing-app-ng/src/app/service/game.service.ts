import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../model/game';

const URL: string = 'https://localhost:7252/api/games';
@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private http: HttpClient) { }

  getAllGames(): Observable<Game[]> {
    return this.http.get(URL + '/') as Observable<Game[]>;
  }

  getGameById(id: number): Observable<Game> {
    return this.http.get(URL + `/${id}`) as Observable<Game>;
  }

  getGamesByLeagueId(leagueid: number): Observable<Game[]> {
    return this.http.get(URL + `/league/${leagueid}`) as Observable<Game[]>;
  }

  createGame(game: Game): Observable<Game> {
    return this.http.post(URL + '/', game) as Observable<Game>;
  }

  editGame(game: Game): Observable<Game> {
    return this.http.put(URL + '/' + game.id, game) as Observable<Game>;
  }

  deleteGame(id: number): Observable<boolean> {
    return this.http.delete(URL + `/${id}`) as Observable<boolean>;
  }
}

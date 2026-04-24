import { Injectable } from '@angular/core';
import { MatchUserDTO } from '../model/match-user-dto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MatchUserService {

  private urlBase = 'http://localhost:8080/match-user';

  constructor(private http: HttpClient) { }

  getAllUsersFromMatch(matchId: number){
    return this.http.get<MatchUserDTO>(`${this.urlBase}/get-all-users-from-match/${matchId}`);
  }

}
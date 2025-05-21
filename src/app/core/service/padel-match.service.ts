import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PadelMatchDTO } from '../model/padel-match-dto';
import { CreateMatchRequest } from '../model/create-match-request';

@Injectable({
  providedIn: 'root'
})
export class PadelMatchService {

  private urlBase = 'http://localhost:8080/padel-match';

  constructor(private http: HttpClient) { }

  getAllMatchesAndPlayersWithSpecifications(userPadelLevel?: number, dates?: string[]){
    let params = new HttpParams();

    if (dates && dates.length > 0) {
      dates.forEach(dateIso => {
        params = params.append('dates', dateIso);
      });
    }

    if (userPadelLevel !== null && userPadelLevel !== undefined) {
      params = params.set('userPadelLevel', userPadelLevel.toString());
    }
    console.log(params)
    return this.http.get<PadelMatchDTO[]>(`${this.urlBase}/get-all-matches-and-players-with-specifications`, { params });
  }

  createMatch(match: CreateMatchRequest){
    return this.http.post<{matchId: number}>(`${this.urlBase}/create-match`, match);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PadelMatchDTO } from '../model/padel-match-dto';

@Injectable({
  providedIn: 'root'
})
export class PadelMatchService {

  private urlBase = 'http://localhost:8080/padel-match';
  
    constructor(private http: HttpClient) {}
  
    getAllMatchesAndPlayers() {
      return this.http.get<PadelMatchDTO[]>(`${this.urlBase}/get-all-matches-and-players`);
    }
}

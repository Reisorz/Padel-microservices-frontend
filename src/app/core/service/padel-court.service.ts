import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PadelCourtDTO } from '../model/padel-court-dto';

@Injectable({
  providedIn: 'root'
})
export class PadelCourtService {

  private urlBase = 'http://localhost:8080/padel-court';

  constructor(private http: HttpClient) { }

  getAllCourts() {
    return this.http.get<PadelCourtDTO[]>(`${this.urlBase}/get-all-padel-courts`);
  }
}

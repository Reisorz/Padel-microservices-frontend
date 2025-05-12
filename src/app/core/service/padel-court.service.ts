import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PadelCourtDTO } from '../model/padel-court-dto';
import { PadelCourtSaveRequest } from '../model/padel-court-save-request';

@Injectable({
  providedIn: 'root'
})
export class PadelCourtService {

  private urlBase = 'http://localhost:8080/padel-court';

  constructor(private http: HttpClient) { }

  getAllCourts() {
    return this.http.get<PadelCourtDTO[]>(`${this.urlBase}/get-all-padel-courts`);
  }

    createPadelCourt(court: PadelCourtSaveRequest) {
    return this.http.post<PadelCourtDTO>(`${this.urlBase}/save-padel-court`, court);
  }

}

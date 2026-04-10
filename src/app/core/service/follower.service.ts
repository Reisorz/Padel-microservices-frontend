import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from '../model/user-dto';
import { PageResponse } from '../model/page-response';

@Injectable({
  providedIn: 'root'
})
export class FollowerService{

  private urlBase = 'http://localhost:8080/follower';

  constructor(private http: HttpClient) {}

  getFollowers(userId: number, page: number = 0, size: number = 20): Observable<PageResponse<UserDto>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PageResponse<UserDto>>(`${this.urlBase}/followers/${userId}`, { params });
  }
}
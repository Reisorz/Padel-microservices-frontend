import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegisterRequest } from '../model/user-register-request';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  private urlBase = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}

  registerUser(request: UserRegisterRequest) {
    return this.http.post<{message: string}>(`${this.urlBase}/register-user` , request);
  }
}

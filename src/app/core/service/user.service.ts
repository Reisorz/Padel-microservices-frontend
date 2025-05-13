import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegisterRequest } from '../model/user-register-request';
import { UserDto } from '../model/user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  private urlBase = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}

  registerUser(request: UserRegisterRequest) {
    return this.http.post<{message: string}>(`${this.urlBase}/register-user` , request);
  }

  getUserById(id: number){
    return this.http.get<UserDto>(`${this.urlBase}/get-user-by-id/${id}`)
  }

  getAllUsers(){
    return this.http.get<UserDto[]>(`${this.urlBase}/get-all-users`)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUserDTO } from '../model/auth-user-dto';
import { TokenDTO } from '../model/token-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private urlBase = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  login(authUserDTO: AuthUserDTO) {
    return this.http.post<TokenDTO>(`${this.urlBase}/login` , authUserDTO);
  }
}

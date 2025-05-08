import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private TOKEN_KEY = "accessToken";
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  public setAccessToken(token: string): void {
    if (this.isBrowser) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  public getAccessToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  public removeAccessToken(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }

  public setUserDetailsFromToken(): void {
    const token = this.getAccessToken();
    if (token && this.isBrowser) {
      const decoded: any = jwtDecode(token);
      const email = decoded.sub ?? '';
      const id = decoded.id ?? '';
      localStorage.setItem("email", email);
      localStorage.setItem("id", id);
    }
  }

  public getUserId(){
    return Number(localStorage.getItem("id"))
  }

  public removeUserDetails() {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    const token = this.getAccessToken();
    if (!token){
      return false;
    } 
  
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp;
    const currentTime = Math.floor(Date.now() / 1000);

    return currentTime < expirationTime;
  }

}

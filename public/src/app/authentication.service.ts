import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  #isLoggedIn: boolean = false;
  #username: string = "";

  public saveToken(token: string): void {
    localStorage.setItem(environment.AUTH_TOKEN, token);
    this.#isLoggedIn = true;
    this.setUsername();
  }
  public getToken(): string {
    return localStorage.getItem(environment.AUTH_TOKEN) as string;
  }
  public removeToken() {
    this.isLoggedIn = false;
    localStorage.clear();
  }
  setUsername() {
    const token: string = localStorage.getItem(environment.AUTH_TOKEN) as string;
    this.#username = this._jwtHelper.decodeToken(token).username;
    console.log("Username is ", this.#username);
  }
  get username(): string {
    return this.#username;
  }

  get isLoggedIn() {
    return this.#isLoggedIn;
  }
  set isLoggedIn(isLoggedIn) {
    this.#isLoggedIn = isLoggedIn;
  }
  constructor(private _jwtHelper: JwtHelperService) { }
}

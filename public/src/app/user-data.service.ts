import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from './user-login/user-login.component';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private baseUrl: string = environment.BASE_URL;

  constructor(private http: HttpClient) { }

  public userLogin(credential: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.baseUrl + "/user/login", credential);
  }
  public userRegister(credential: any): Observable<any> {
    return this.http.post(this.baseUrl + "/user/create", credential);
  }
}

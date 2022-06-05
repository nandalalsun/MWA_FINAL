import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Music } from './music-data/music-data.component';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {

  constructor(private http: HttpClient, private authenticateService: AuthenticationService) { }

  public getMusic(): Observable<Music[]> {
    return this.http.get<Music[]>(environment.BASE_URL + '/music');
  }
  public getArtistList(musicId: string): Observable<any> {
    return this.http.get<any>(environment.BASE_URL + "/artist/" + musicId);
  }

  public getOneMusic(musicId: string): Observable<Music> {
    return this.http.get<Music>(environment.BASE_URL + '/music/' + musicId);
  }

  public addMusic(body: FormGroup): Observable<Music> {
    return this.http.post<any>(environment.BASE_URL + "/music", body.value, { headers: this.getHeader() });
  }

  getHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authenticateService.getToken()
    });
  }

  public deleteMusic(musicId: string): Observable<Music> {
    return this.http.delete<any>(environment.BASE_URL + "/music/" + musicId, { headers: this.getHeader() });
  }

  public searchMusic(searchQuery: any): Observable<Music[]> {
    return this.http.get<Music[]>(environment.BASE_URL + "/music?searchString=" + searchQuery.searchString);
  }

}

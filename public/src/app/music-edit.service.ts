import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { Music } from './music-data/music-data.component';

@Injectable({
  providedIn: 'root'
})
export class MusicEditService {

  public musicToEdit!: Music;
  private searchMusicString: any;

  constructor(private http: HttpClient, private authenticateService: AuthenticationService) { }

  public updateMusic(musicId: string, body: any): Observable<Music> {
    return this.http.patch<Music>(environment.BASE_URL + "/music/" + musicId, body, { headers: this.getHeader() });
  }

  public addArtist(musicId: string, body: any): Observable<any> {
    return this.http.post<any>(environment.BASE_URL + "/artist/" + musicId, body, { headers: this.getHeader() });
  }
  public deleteArtist(musicId: string, artistId: string): Observable<any> {
    return this.http.delete<any>(environment.BASE_URL + "/artist/" + musicId + "/artist/" + artistId, { headers: this.getHeader() });
  }

  public musicToEditSetter(music: Music) {
    this.musicToEdit = music;
  }
  public getMusicToEdit(): Music {
    return this.musicToEdit;
  }
  public setSearchMusicString(searchString: any) {
    this.searchMusicString = searchString;
  }
  public getMusicToSearch(): any {
    return this.searchMusicString;
  }
  getHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authenticateService.getToken()
    });
  }
}


import { Component, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { MusicDataService } from '../music-data.service';
import { Music } from '../music-data/music-data.component';
import { MusicEditService } from '../music-edit.service';

@Component({
  selector: 'app-one-music',
  templateUrl: './one-music.component.html',
  styleUrls: ['./one-music.component.css']
})
export class OneMusicComponent implements OnInit {

  musics!: Music;
  response!: any;
  isLoggedIn!: boolean;


  constructor(
    private musicEditService: MusicEditService,
    private musicDataService: MusicDataService,
    private authService: AuthenticationService,
    private routerLink: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
    const musicId = this.routerLink.snapshot.params['musicId'];
    this.musicDataService.getOneMusic(musicId).subscribe({
      next: (music) => {
        this.musics = music;
      },
      error: (error) => {
        console.log("Error: " + error);

      },
      complete: () => {
        console.log("Completed..");
      }
    });
  }

  deleteMusic(musicId: string) {
    if (!(this.isLoggedIn)) {
      this.router.navigate(['login']);
    }
    else {
      this.musicDataService.deleteMusic(musicId).subscribe({
        next: (res) => {
          alert("Music Deleted");
        },
        error: (err) => {
          this.response.error = err;
        },
        complete: () => {
          this.router.navigate(['/music']);
        }
      });
    }

  }

  deleteArtist(artistId: string) {
    if (!(this.isLoggedIn)) {
      this.router.navigate(['login']);
    } else {
      this.musicEditService.deleteArtist(this.musics._id, artistId).subscribe({
        next: (_) => {
          alert("Artist deleted successfully. ");
        },
        error: (err) => {
          alert("Error: " + err);
        },
        complete: () => {
          this.ngOnInit();
        }
      });
    }
  }

  editMusicForm() {
    if (!(this.isLoggedIn)) {
      this.router.navigate(['login']);
    }
    else {
      this.router.navigate(['/editMusic']);
      this.musicEditService.musicToEditSetter(this.musics);
    }
  }
}

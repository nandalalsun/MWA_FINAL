import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { MusicDataService } from '../music-data.service';
import { MusicEditService } from '../music-edit.service';

@Component({
  selector: 'app-edit-music',
  templateUrl: './edit-music.component.html',
  styleUrls: ['./edit-music.component.css']
})
export class EditMusicComponent implements OnInit {


  addArtist: boolean = false;
  artistList: any[] = [];

  editSuccess: boolean = false;

  isLoggedIn!: boolean;

  musics!: any;

  constructor(
    private musicEditService: MusicEditService,
    private musicDataService: MusicDataService,
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;

    if (!(this.isLoggedIn)) {
      this.router.navigate(['login']);
    }
    else {
      this.musics = this.musicEditService.getMusicToEdit();
      this.musicDataService.getArtistList(this.musics._id).subscribe({
        next: (artist) => {
          this.artistList.push(artist);
        },
        error: (_) => {
          alert("Error fetching artist");
        }
      });
    }
  }


  addArtistForm() {
    this.addArtist = !this.addArtist;
  }

  addArtistSubmit(formData: NgForm) {
    console.log(formData.value);
    let newArtist = {
      artist_name: formData.value.artist_name,
      bio: formData.value.bio,
      age: formData.value.age
    }
    this.artistList.push(newArtist);
    if (this.artistList.length > 0) {
      this.musicEditService.addArtist(this.musics._id, newArtist).subscribe({
        next: (artist) => {
          alert("artist added to database");
        },
        error: (err) => {
          alert(err)
        }
      });
    }
  }

  musicEdit(formData: NgForm) {

    let newMusic = {
      music_name: formData.value.music_name,
      music_rating: formData.value.music_rating,
      description: formData.value.description,
      music_type: formData.value.music_type
    }
    this.musicEditService.updateMusic(this.musics._id, newMusic).subscribe({
      next: (res) => {
        this.editSuccess = true;
      },
      error: (err) => {
        alert("err:" + err);
      },
      complete: () => {
        console.log("Completed..");
        this.router.navigate(['/music']);
      }
    });
  }
}

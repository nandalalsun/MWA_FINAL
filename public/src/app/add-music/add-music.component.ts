import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-add-music',
  templateUrl: './add-music.component.html',
  styleUrls: ['./add-music.component.css']
})
export class AddMusicComponent implements OnInit {


  registrationForm!: FormGroup;
  registrationResponse: any = { success: false };

  isLoggedIn!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private musicDataService: MusicDataService,
    private authService: AuthenticationService,
    private authenticateService: AuthenticationService,
    private router: Router) {
    this.formClear();
  }

  formClear() {
    this.registrationForm = this.formBuilder.group({
      music_name: "",
      music_type: "",
      music_rating: "",
      description: "",
      artist_name: "",
      age: ""
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
    if (!(this.isLoggedIn)) {
      alert("Login required");
      this.router.navigate(['login']);
    }
  }

  registration(registrationForm: FormGroup) {
    this.musicDataService.addMusic(registrationForm).subscribe({
      next: (response) => {
        this.registrationResponse = response;
        this.registrationResponse.success = true;
        alert("Successfulley added.");
        this.formClear();
      },
      error: (err) => {
        console.log(err);
        alert("Music Validation Failed!!");
      },
      complete: () => {
        console.log("Done");
      }
    });


    console.log("Login Required.");

  }

}

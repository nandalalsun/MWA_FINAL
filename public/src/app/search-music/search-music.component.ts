import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicDataService } from '../music-data.service';
import { Music } from '../music-data/music-data.component';
import { MusicEditService } from '../music-edit.service';

@Component({
  selector: 'app-search-music',
  templateUrl: './search-music.component.html',
  styleUrls: ['./search-music.component.css']
})
export class SearchMusicComponent implements OnInit {

  public searchQuery: any;
  result: Music[] = [];
  noMusicFound: boolean = false;

  constructor(private musicDataService: MusicDataService) { }

  ngOnInit(): void {
  }


  selectedSearchBy: string = '';


  selectChangeHandler(event: any) {
    this.selectedSearchBy = event.target.value;
  }

  search(value: any) {
    let musicEditString = {
      // searchBy: this.selectedSearchBy || "music_name",
      searchString: value || ""
    }
    this.musicDataService.searchMusic(musicEditString).subscribe({
      next: (data) => {
        if (data.length <= 0) {
          this.noMusicFound = true;
        }
        else {
          this.result = data;
          this.noMusicFound = false;
        }
      },
      error: (err) => {
        alert("Error")
      },
      complete: () => {
        console.log("Complete search");
      }
    });;
  }

}

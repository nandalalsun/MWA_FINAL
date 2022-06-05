import { Component, Injectable, Input, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

export class Music{
  #_id!: string;
  #artist!: any;
  #music_type!: any;
  #music_name!: string;
  #music_rating!: number;
  #description!: string;

  constructor(_id: string, music_name: string, description: string, music_rating: number, music_type: any, artist: any){
    this.#_id = _id;
    this.#artist = artist;
    this.#music_name = music_name;
    this.#music_type = music_type;
    this.#music_rating = music_rating;
    this.#description = description;
  }

  get music_type():any {
    return this.#music_type;
  }

  get music_name(): string {
    return this.#music_name;
  }

  get music_rating(): number {
    return this.#music_rating;
  }

  get _id(): string{
    return this.#_id;
  }

  get artist(): any{
    return this.#artist;
  }
  get description(): string{
    return this.#description;
  }
        
}

@Component({
  selector: 'app-music-data',
  templateUrl: './music-data.component.html',
  styleUrls: ['./music-data.component.css']
})


@Injectable()
export class MusicDataComponent implements OnInit {

  musics: Music[] = [];


  constructor(private musicService: MusicDataService) { }

  
  ngOnInit(): void {
    this.musicService.getMusic().subscribe({
      next: music => {
        this.musics = music;
      },
      error: (err) => {
        console.log(err);
      },
      complete: ()=>{
        console.log("Completed fetching music");
      }
    });
  }  
}



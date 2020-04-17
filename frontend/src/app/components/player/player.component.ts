import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SongService } from 'src/app/_services/song.service';
import { Song } from 'src/app/_models/song';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  public song;



  constructor(
    songService:SongService
  ) { }

  ngOnInit(): void {
      var song = JSON.parse(localStorage.getItem('soundSong'));      
      if (song) {
        this.song = song;
      }else{
        this.song = null;
      }
  }

}

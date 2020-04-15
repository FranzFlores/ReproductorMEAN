import { Component, OnInit } from '@angular/core';
import { SongService } from 'src/app/_services/song.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  constructor(
    songService:SongService
  ) { }

  ngOnInit(): void {
    console.log('Player Cargado');
  }

}

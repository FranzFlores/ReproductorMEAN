import { Component, OnInit } from '@angular/core';
import {faMusic,faAddressCard,faUserFriends,faPlayCircle,faDrum,faCog} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  toggleArtist:boolean = false;
  //Iconos
  artistIcon = faUserFriends;
  albumIcon = faMusic;
  songIcon = faDrum;
  playlistIcon = faPlayCircle;
  configurationIcon = faCog;
  accountIcon = faAddressCard;

  constructor() { }

  showArtistMenu(){
    this.toggleArtist = !this.toggleArtist;
  }

  ngOnInit(): void {
  }

}

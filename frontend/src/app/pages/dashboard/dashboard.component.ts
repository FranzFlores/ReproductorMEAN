import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { faSignOutAlt, faMusic,faAddressCard,faUserFriends,faPlayCircle,faDrum,faCog} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from "src/app/_services/auth.service";

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
  exitIcon = faSignOutAlt;

  constructor(
    public auth: AuthService,
    private router:Router
  ) { }

  showArtistMenu(){
    this.toggleArtist = !this.toggleArtist;
  }

  ngOnInit(): void {   
  }

  logout(event){
    this.auth.logout();
    this.router.navigate(['/'])
    event.preventDefault();
  }

}

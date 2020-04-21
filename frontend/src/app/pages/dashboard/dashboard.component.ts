import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from "@angular/router";

import { faSignOutAlt, faMusic,faAddressCard,faUserFriends,faPlayCircle,faDrum,faCog} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from "src/app/_services/auth.service";
import { UserService } from 'src/app/_services/user.service';


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
    public userService:UserService,
    private router:Router
  ) { }


  ngOnInit(): void {
    this.userService.selectUser.image = this.auth.userData.image;
    this.userService.selectUser.name = this.auth.userData.name;   

  }

  logout(event){
    this.auth.logout();
    this.router.navigate(['/'])
    event.preventDefault();
  }

  toggleSidebar(){
    document.getElementById('left-bar').classList.toggle('active');
    document.getElementById('content').classList.toggle('all');
  }

}

import { Component, OnInit } from '@angular/core';
import { ArtistService } from 'src/app/_services/artist.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Artist } from 'src/app/_models/artist';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.css']
})
export class ArtistDetailsComponent implements OnInit {

  pages: number = 1;

  constructor(
    public artistService:ArtistService,
    private activedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getArtistInfo();
  }

  getArtistInfo(){
    this.artistService.getArtist(this.activedRoute.snapshot.params.id).subscribe(data=>{
       this.artistService.selectArtist = data as Artist;
    });
  }

  



}

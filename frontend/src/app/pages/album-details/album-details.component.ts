import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AlbumService } from 'src/app/_services/album.service';
import { Album } from 'src/app/_models/album';


@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit {

  constructor(
    public albumService:AlbumService,
    private activedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAlbumInfo();
  }


  getAlbumInfo(){
    this.albumService.getAlbum(this.activedRoute.snapshot.params.id).subscribe(data=>{
      this.albumService.selectAlbum = data as Album;
      console.log(this.albumService.selectAlbum);
    });
  }

}

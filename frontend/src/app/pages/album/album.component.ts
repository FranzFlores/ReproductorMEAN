import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { NgForm } from '@angular/forms';
import { faTrashAlt, faEdit, faUndo, faPlus } from '@fortawesome/free-solid-svg-icons';
import { AlbumService } from 'src/app/_services/album.service';
import { ArtistService } from 'src/app/_services/artist.service';
import { AlertService } from 'src/app/_services/alert.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Artist } from 'src/app/_models/artist';
import { Album } from 'src/app/_models/album';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  @ViewChild('btn_create_close', { static: false }) btn_create_close: ElementRef<HTMLElement>;
  @ViewChild('btn_edit_close', { static: false }) btn_edit_close: ElementRef<HTMLElement>;
  @ViewChild('btn_delete_close', { static: false }) btn_delete_close: ElementRef<HTMLElement>;
  @ViewChild('btn_restore_close', { static: false }) btn_restore_close: ElementRef<HTMLElement>;


  addIcon = faPlus;
  editIcon = faEdit;
  deleteIcon = faTrashAlt;
  restoreIcon = faUndo;
  file: File;

  constructor(
    public albumService: AlbumService,
    public artistService: ArtistService,
    public alertService: AlertService,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.artistList();
  }

  //Listado de artistas
  artistList() {
    this.artistService.getArtists().subscribe(data => {
      this.artistService.artists = data as Artist[];
    });
  }

  createAlbum(form: NgForm) {
    if (form.valid) {
      this.albumService.createAlbum(form.value).subscribe(data => {
        this.alertService.success("Se ha creado el álbum satisfactoriamente");
        this.btn_create_close.nativeElement.click();
        this.albumService.selectAlbum = new Album();
      }, error => {
        console.log(error);
        this.alertService.error("No se pudo crear el álbum");
      })
    }
  }

}

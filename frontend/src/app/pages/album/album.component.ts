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

  //Paginacion 
  pages: number = 1;

  constructor(
    public albumService: AlbumService,
    public artistService: ArtistService,
    public alertService: AlertService,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.albumService.selectAlbum = new Album();
    this.albumService.selectAlbum.status = true;
    this.artistList();
    this.albumsList();
  }

  //Listado de artistas
  artistList() {
    this.artistService.getArtists().subscribe(data => {
      this.artistService.artists = data as Artist[];
    });
  }

  //Creacion de Album
  createAlbum(form: NgForm) {
    if (form.valid) {
      this.albumService.createAlbum(form.value).subscribe(data => {
        this.alertService.success("Se ha creado el álbum satisfactoriamente");
        this.btn_create_close.nativeElement.click();
        this.albumService.selectAlbum = new Album();
        this.albumsList();
      }, error => {
        console.log(error);
        this.alertService.error("No se pudo crear el álbum");
      })
    }
  }

  //listado de Albums
  albumsList() {
    var status = {status: true}
    this.albumService.getAlbumsByStatus(status).subscribe(data => {
      this.albumService.albums = data as Album[];
    });
  }

  //Actualizar informacion del Album
  updateAlbum(form: NgForm) {
    if (form.valid) {
      this.albumService.updateAlbum(this.albumService.selectAlbum._id, form.value).subscribe(data => {
        this.alertService.success("Se ha actualizado el álbum satisfactoriamente");
        this.btn_edit_close.nativeElement.click();
        this.albumService.selectAlbum = new Album();
        this.albumsList();
      }, error => {
        console.log(error);
        this.alertService.error("No se pudo actualizar el álbum");
      })
    }
  }



  //Seleccionar Album
  selectAlbum(album: Album) {
    this.albumService.selectAlbum = album;
  }

  //Resetar la informacion del Album
  resetAlbum() {
    this.albumService.selectAlbum = new Album();
  }

  //Actualizar la imagen del Album
  uploadAlbum(input: any) {
    const file = input.files[0];
    if (file) {
      this.file = file;
      this.albumService.uploadImageAlbum(this.albumService.selectAlbum._id, file).subscribe(data => {
        this.alertService.success("Se ha actualizado la imagen el álbum satisfactoriamente");
        this.btn_edit_close.nativeElement.click();
        this.albumService.selectAlbum = new Album();
        this.albumsList();
      }, error => {
        console.log(error);
        this.alertService.error("No se pudo actualizar la imagen del álbum");
      })
    }
  }

  deleteAlbum() {
    this.albumService.deleteAlbum(this.albumService.selectAlbum._id).subscribe(data => {
      this.alertService.success("Se ha eliminado el álbum de manera correcta");
      this.btn_delete_close.nativeElement.click();
      this.albumsList();
    }, error => {
      console.log(error);
      this.alertService.error("No se pudo eliminar el álbum");
    });
  }

  getAlbumsByStatus(form: NgForm) {
    if (form.valid) {
      this.albumService.getAlbumsByStatus(form.value).subscribe(data => {
        this.albumService.albums = data as Album[];
      })
    }
  }

  restoreAlbum() {
    this.albumService.restoreAlbum(this.albumService.selectAlbum._id).subscribe(data => {
      this.alertService.success("Se ha restaurado el álbum de manera correcta");
      this.btn_restore_close.nativeElement.click();
      this.albumsList();
    }, error => {
      console.log(error);
      this.alertService.error("No se pudo restaurar el álbum");
    });
  }


}

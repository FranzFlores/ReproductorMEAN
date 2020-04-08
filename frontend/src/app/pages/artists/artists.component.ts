import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

import { faTrashAlt, faEdit, faUndo, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { ArtistService } from 'src/app/_services/artist.service';
import { Artist } from 'src/app/_models/artist';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {

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
    public artistService: ArtistService,
    public alertService: AlertService,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.artistService.selectArtist = new Artist();
    this.artistsList();
  }

  createArtist(form: NgForm) {
    if (form.valid) {
      this.artistService.createArtist(form.value).subscribe(data => {
        this.alertService.success("Se ha creado el artista de manera correcta");
        this.btn_create_close.nativeElement.click();
        this.artistsList();
        this.artistService.selectArtist = new Artist();
      }, error => {
        console.log(error);
        this.alertService.error("No se pudo crear el artista");
      });
    }
  }

  artistsList() {
    this.artistService.getArtists().subscribe(res => {
      this.artistService.artists = res as Artist[];
    })
  }

  //Seleccionar el artista
  selectArtist(artist: Artist) {
    this.artistService.selectArtist = artist;
  }

  fileAdd(input: any) {
    const file = input.files[0];
    if (file) {
      this.file = file;
      console.log(this.file);
    }
  }

  updateArtist(form: NgForm) {
    if (form.valid) {
      this.artistService.updateArtist(form.value, this.artistService.selectArtist._id).subscribe(data => {
        this.alertService.success("Se ha actualizado el artista correctamente");
        this.btn_edit_close.nativeElement.click();
        this.artistsList();
      }, error => {
        console.log(error);
        this.alertService.error("No se pudo actualizar el artista");
      })
    }
  }

  uploadArtist(input: any) {
    const file = input.files[0];
    if (file) {
      this.file = file;
      this.artistService.uploadArtistImage(this.artistService.selectArtist._id, this.file).subscribe(data => {
        this.alertService.success("Se ha subido la imagen del artista con éxito");
        this.btn_edit_close.nativeElement.click();
        this.artistsList();
      }, error => {
        console.log(error);
        this.alertService.error("No se pudo subir la imagen del artista");
      })
    }
  }

  deleteArtist() {
    this.artistService.deleteArtist(this.artistService.selectArtist._id).subscribe(data => {
      this.alertService.success("Se ha eliminado el artista de manera correcta");
      this.btn_delete_close.nativeElement.click();
      this.artistsList();
    }, error => {
      console.log(error);
      this.alertService.error("No se pudo eliminar el artista");
    });
  }

  getArtistsByStatus(form:NgForm){
    if (form.valid) {
        this.artistService.getArtistsByStatus(form.value).subscribe(data=>{
          this.artistService.artists = data as Artist[];
        });
    }
  }

  restoreArtist() {
    this.artistService.restoreArtist(this.artistService.selectArtist._id).subscribe(data => {
      this.alertService.success("Se ha restaurado el artista de manera correcta");
      this.btn_restore_close.nativeElement.click();
      this.artistsList();
    }, error => {
      console.log(error);
      this.alertService.error("No se pudo restaurar el artista");
    });
  }


}

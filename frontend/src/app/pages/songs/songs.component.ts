import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { SongService } from 'src/app/_services/song.service';


import { faTrashAlt, faEdit, faUndo, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { AlbumService } from 'src/app/_services/album.service';
import { Album } from 'src/app/_models/album';
import { AlertService } from 'src/app/_services/alert.service';
import { Song } from 'src/app/_models/song';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {


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
    public auth: AuthService,
    public alertService: AlertService,
    public songService: SongService,
    public albumService: AlbumService
  ) { }

  ngOnInit(): void {
    this.getAlbums();
    this.songList();
  }

  //Obtener listado de albums
  getAlbums() {
    this.albumService.getAlbums().subscribe(data => {
      this.albumService.albums = data as Album[];
    });
  }

  createSong(form: NgForm) {
    if (form.valid) {
      this.songService.createSong(form.value).subscribe(data => {
        this.alertService.success("Se ha creado correctamente la canción");
        this.btn_create_close.nativeElement.click();
        this.songList();
        this.resetSong();
      }, error => {
        console.log(error);
        this.alertService.error("No se pudo crear la canción");
      });
    }
  }

  songList() {
    this.songService.getSongs().subscribe(data => {
      this.songService.songs = data as Song[];
    });
  }

  selectSong(song: Song) {
    this.songService.selectSong = song;
  }

  editSong(form: NgForm) {
    if (form.valid) {
      this.songService.updateSong(this.songService.selectSong._id, form.value).subscribe(data => {
        this.alertService.success("Se ha actualizado correctamente la canción");
        this.btn_edit_close.nativeElement.click();
        this.songList();
      }, error => {
        console.log(error);
        this.alertService.error("No se pudo actualizar la canción");
      });
    }
  }

  uploadFile(input: any) {
    const file = input.files[0];

    if (file) {
      this.file = file;
      this.songService.uploadFile(this.songService.selectSong._id, this.file).subscribe(data => {
        this.alertService.success("Se ha subido el archivo de la canción correctamente");
        this.btn_edit_close.nativeElement.click();
        this.songList();
      }, error => {
        console.log(error);
        this.alertService.error("No se pudo subir el archivo de la canción");
      });
    }
  }

  resetSong() {
    this.songService.selectSong = new Song();
  }

  deleteSong() {
    this.songService.deleteSong(this.songService.selectSong._id).subscribe(data => {
      this.alertService.success("Se ha eliminado la canción correctamente");
      this.btn_delete_close.nativeElement.click();
      this.songList();
    }, error => {
      console.log(error);
      this.alertService.error("No se pudo eliminar la canción");
    });
  }

  getSongsByStatus(form: NgForm) {
    this.songService.getSongsByStatus(form.value).subscribe(data => {
      this.songService.songs = data as Song[];
    });
  }

  restoreSong() {
    this.songService.restoreSong(this.songService.selectSong._id).subscribe(data => {
      this.alertService.success("Se ha restaurado la canción correctamente");
      this.btn_restore_close.nativeElement.click();
      this.songList();
    }, error => {
      console.log(error);
      this.alertService.error("No se pudo restaurar la canción");
    });
  }

}

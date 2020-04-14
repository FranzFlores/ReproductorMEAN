import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Song } from '../_models/song';


@Injectable({
  providedIn: 'root'
})
export class SongService {

  selectSong: Song;
  songs: Song[];
  
  file:File;

  private readonly URL_API = 'http://localhost:3000/api/song';

  constructor(private htpp: HttpClient) {
    this.selectSong = new Song();
  }

  //Crear Cancion
  createSong(song: Song){
    return this.htpp.post(`${this.URL_API}/createSong`,song);
  }

  //Listado de canciones
  getSongs(){
    return this.htpp.get(`${this.URL_API}/songs`);
  }

  //Editar informacion de la cancion
  updateSong(id,song:Song){
    return this.htpp.put(`${this.URL_API}/updateSong/${id}`,song);
  }

  //Subir archivo de audio de la cancion
  uploadFile(id,file:File){
    var formData = new FormData();
    formData.append('id',id);
    formData.append('file',file,file.name);
    return this.htpp.put(`${this.URL_API}/uploadSongFile/${id}`,formData);
  }

  deleteSong(id){
    return this.htpp.put(`${this.URL_API}/deletesong/${id}`,id);
  }


}

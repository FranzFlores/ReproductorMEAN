import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Song } from '../_models/song';


@Injectable({
  providedIn: 'root'
})
export class SongService {

  selectSong: Song;
  songs: Song[];

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

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artist } from '../_models/artist';


@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  selectArtist: Artist;
  artists: Artist[];

  readonly URL_API = 'http://localhost:3000/api/artist';

  constructor(private http: HttpClient) {
    this.selectArtist = new Artist();
  }

  //Crear artista
  createArtist(artist: Artist) {
    return this.http.post(`${this.URL_API}/createArtist`, artist);
  }

  //Listado de Artista
  getArtists(){
    return this.http.get(`${this.URL_API}/artists`);
  }

  //edicion de artista
  updateArtist(artist:Artist,id){
    return this.http.put(`${this.URL_API}/updateArtist/${id}`,artist);
  }

  //Actualizar imagen de artista
  uploadArtistImage(id,file:File){
    var formData: FormData = new FormData();
    formData.append('id', id);
    formData.append('image', file, file.name);
    return this.http.put(`${this.URL_API}/uploadImageArtist/${id}`, formData, { withCredentials: true });
  }

  //ELiminar Artista
  deleteArtist(id){
    return this.http.put(`${this.URL_API}/deleteArtist/${id}`,id);
  }

}

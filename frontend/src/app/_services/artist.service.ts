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

}

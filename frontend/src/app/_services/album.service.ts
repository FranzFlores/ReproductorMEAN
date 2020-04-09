import { Injectable } from '@angular/core';
import { Album } from '../_models/album';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  selectAlbum: Album;
  albums: Album[];

  readonly URL_API = 'http://localhost:3000/api/album';

  constructor(private http:HttpClient) {
    this.selectAlbum = new Album();
   }

   //Crear Album 
   createAlbum(album:Album){
     return this.http.post(`${this.URL_API}/createAlbum`,album);
   }

   //Listar Albums
   getAlbums(){
     return this.http.get(`${this.URL_API}/albums`);
   }

   //Actualizar datos de Album
  updateAlbum(id,album:Album){    
    return this.http.put(`${this.URL_API}/updateAlbum/${id}`,album);
  }
   

}
 
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectUser: User;
  users: User[];
  
 readonly URL_API = 'http://localhost:3000/api/user';
  
  constructor(private http:HttpClient) { 
    this.selectUser = new User();
  }

  //Registrar usuario normal  
  signup(user:User){
    return this.http.post(`${this.URL_API}/signup`,user);
  }

  //Crear usuario administrador
  createAdministrador(user:User){
    return this.http.post(`${this.URL_API}/createAdministrador`,user);
  }

  //Obtiene el listado de todos los usuarios
  getUsers(){
    return this.http.get(`${this.URL_API}/users`);
  }

  //Actualizar la informacion del usuario
  updateUser(user:User,id){
    return this.http.put(`${this.URL_API}/updateUser/${id}`,user);
  }

  //Dar de baja un usuario
  deleteUser(id:string){
    return this.http.put(`${this.URL_API}/deleteUser/${id}`,id);
  }

  //Restaurar un usuario
  restoreUser(id:string){
    return this.http.put(`${this.URL_API}/restoreUser/${id}`,id);
  }

  //Actualizar Contrasena del ususario
  updatePassword(user:User,id){
    return this.http.put(`${this.URL_API}/updatePassword/${id}`,user);
  }

  //Subir imagen de usuario
  uploadUserImage(id,file:File){
    var formData:FormData = new FormData();
    formData.append('image',file,file.name);    
    console.log(formData);
    return this.http.put(`${this.URL_API}/uploadImageUser/${id}`,formData);
  }

  //Obtener el nombre de la imagen actualizada
  getUserImage(name:string){
    return this.http.get(`${this.URL_API}/getImageUser/${name}`);
  }

}

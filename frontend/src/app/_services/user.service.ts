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

  signup(user:User){
    return this.http.post(this.URL_API+'signup',user);
  }

  //Obtiene el listado de todos los usuarios
  getUsers(){
    return this.http.get(`${this.URL_API}/users`);
  }

  //Actualizar la informacion del usuario
  updateUser(user:User){
    return this.http.put(`${this.URL_API}/updateUser/${user._id}`,user);
  }

  //Dar de baja un usuario
  deleteUser(id:string){
    return this.http.put(`${this.URL_API}/deleteUser/${id}`,id);
  }

  //Restaurar un usuario
  restoreUser(id:string){
    return this.http.put(`${this.URL_API}/restoreUser/${id}`,id);
  }


}

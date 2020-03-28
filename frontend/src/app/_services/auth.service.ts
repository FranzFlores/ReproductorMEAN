import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { catchError, map, first } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectURL: string; //Para redirigir al usuario
  userData: any;       //Informacion del usuario 

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      //Inicializa la informacion del usuario al obtener la informacion del localStorage
      this.userData = user.data;
    }
  }

  //Obtiene la informacion del usuario. La almacena en el localStorage y retorna la informacion 
  login(user: User) {
    return this.http.post('http://localhost:3000/api/user/login', user, { withCredentials: true }).pipe(map(user => {
      let data = user as any;
      localStorage.setItem('currentUser', JSON.stringify(data));
      this.userData = data.data;
      return data;
    }));
  }

  //Remueve la informacion almacenada en el localStorage
  logout() {
    localStorage.removeItem('currentUser');
  }

  //Obtiene la informacion almacenada en el localStorage
  isAuth() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }


}

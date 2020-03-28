import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from "../_services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService:AuthService,private router:Router){}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
      let url: string = state.url;//Almacena el estado de la url en la que se hace la peticion
      this.authService.redirectURL = url; //La Url donde se redirige al usuario en caso de fallar el login

     //Almacena los datos del usuario almacenados en el localStorage
      const currentUser = this.authService.isAuth();
      
    //Verifica si el usuario esta ingresado en el sistema
      if(currentUser && currentUser.token){
        return true
      }

      //Sino esta ingresado se redirige al usuario a la pagina de login
      this.router.navigate(['/login']);
      return false;
  }
  
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectUser: User;
  users: User[];
  
 // readonly URL_API = 'http://localhost:3000/api/user';
  
  constructor(private http:HttpClient) { 
    this.selectUser = new User();
  }

  signup(user:User){
    return this.http.post('http://localhost:3000/api/user/signup',user);
  }

}

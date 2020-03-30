import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from 'src/app/_services/user.service';
import { AlertService } from "../../_services/alert.service";

import { first } from 'rxjs/operators';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    public userService: UserService,
    private alertService: AlertService,
    private router:Router
    ) { }

  ngOnInit(): void {
  }

  createAccount(form?: NgForm) {    
    if (form.valid) {
      this.userService.signup(form.value).pipe(first())
        .subscribe(
          data => {
            this.router.navigate(['/login'])
          }, error => {
            console.log(error);
            this.alertService.error("Ocurrió un error al registrar usuario");
          })
    }else{
      this.alertService.error("Complete todos los campos");
    }
  }
}

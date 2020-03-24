import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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
    private alertService: AlertService
    ) { }

  ngOnInit(): void {
  }

  createAccount(form?: NgForm) {    
    if (form.valid) {
      this.userService.signup(form.value).pipe(first())
        .subscribe(
          data => {
            this.alertService.success("Se ha creado el usuario de manera correcta");
          }, error => {
            console.log(error);
            this.alertService.error("Ocurrió un error al registrar usuario");
          })
    }else{
      this.alertService.error("Complete todos los campos");
    }
  }
}

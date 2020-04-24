import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from 'src/app/_services/user.service';
import { AlertService } from "../../_services/alert.service";

import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    public userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  //Creacion de la cuenta
  createAccount(form?: NgForm) {
    if (form.valid) {
      if (this.emailValid(form.value.email) && this.passwordValid(form.value.password)) {
        this.userService.signup(form.value).pipe(first())
          .subscribe(
            data => {
              var message = data as any;
              if (message.msg == "Exist") {
                this.alertService.error("El usuario ya se encuentra registrado");
              } else {
                this.router.navigate(['/login']);
              }
            }, error => {
              console.log(error);
              this.alertService.error("Ocurrió un error al registrar usuario");
            })
      } else {
        this.alertService.error("Datos incorrectos en correo o contraseña");
      }
    } else {
      this.alertService.error("Complete todos los campos");
    }
  }

  // Comprobar si es correcto el correo electronico
  emailValid(email: string) {
    let correctEmail = false;
    var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(EMAIL_REGEX)) {
      correctEmail = true;
    }

    return correctEmail;
  }

  //Comprobar si ingreso una contrasena segura
  passwordValid(password: string) {
    let correctPassword = false;

    if (password.length > 6) {
      correctPassword = true;
    }

    return correctPassword;
  }


}

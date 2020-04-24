import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from "../../_services/alert.service";
import { AuthService } from "../../_services/auth.service";

import { User } from "../../_models/user";
import { first } from 'rxjs/operators';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  constructor(
    private auth: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.user = new User();
  }

  ngOnInit(): void {
  }


  login() {
    this.auth.login(this.user).pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/dashboard']);
        }, error => {
          console.log(error);
          this.alertService.error("Usuario o contraseña incorrectos.");
        }
      )
  }

}

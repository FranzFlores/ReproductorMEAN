import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from "../../_services/user.service";
import { AlertService } from '../../_services/alert.service';
import {AuthService} from "../../_services/auth.service";




@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(
    public userService: UserService,
    public alertService: AlertService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }


  updatePassword(form: NgForm) {
    this.userService.updatePassword(form.value,this.authService.userData._id).subscribe(data=>{
      console.log(data);
      this.alertService.success("Se ha actualizado la contraseña con éxito");
      form.reset();
    },error=>{
      console.log(error);
      this.alertService.error("No se pudo actualizar la contraseña");
    })
  }


}

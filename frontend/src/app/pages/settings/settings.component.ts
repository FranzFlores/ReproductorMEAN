import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from "../../_services/user.service";
import { AlertService } from '../../_services/alert.service';
import { AuthService } from "../../_services/auth.service";




@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  file: File;
  showImage: boolean = false;

  constructor(
    public userService: UserService,
    public alertService: AlertService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userService.selectUser.name = this.authService.userData.name;
    this.userService.selectUser.userName = this.authService.userData.userName;
    this.userService.selectUser.email = this.authService.userData.email;
    if(this.authService.userData.image != 'null'){
      this.showImage = true;
      this.userService.selectUser.image = this.authService.userData.image;
    }
  }


  updateUser(form: NgForm) {
    this.userService.updateUser(form.value, this.authService.userData._id).subscribe(data => {
      this.alertService.success("Se han actualizado los datos del usuario con éxito");
      form.reset();
    }, error => {
      console.log(error);
      this.alertService.error("No se pudo actualizar los datos del usuario");
    })
  }


  updatePassword(form: NgForm) {
    this.userService.updatePassword(form.value, this.authService.userData._id).subscribe(data => {
      this.alertService.success("Se ha actualizado la contraseña con éxito");
      form.reset();
    }, error => {
      console.log(error);
      this.alertService.error("No se pudo actualizar la contraseña");
    })
  }

  uploadUserImage(input: any) {
    const file = input.files[0];
    
    if (file) {
      this.file = file;
      this.userService.uploadUserImage(this.authService.userData._id, this.file).subscribe(data => {
        this.alertService.success("Se ha subido la imagen de usuario con éxito");
      }, error => {
        console.log(error);
        this.alertService.error("No se pudo subir la imagen de usuario");
      })
    }

  }


}

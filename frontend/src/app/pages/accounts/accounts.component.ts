import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AlertService } from '../../_services/alert.service';
import { UserService } from '../../_services/user.service';
import { User } from 'src/app/_models/user';

import { faTrashAlt, faEdit, faUndo, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  //Referencias a los modals del html
  @ViewChild('btn_delete_close', { static: false }) btn_delete_close: ElementRef<HTMLElement>;
  @ViewChild('btn_restore_close', { static: false }) btn_restore_close: ElementRef<HTMLElement>;
  @ViewChild('btn_administrador', { static: false }) btn_administrador: ElementRef<HTMLElement>;

  //Iconos 
  deleteIcon = faTrashAlt;
  restoreIcon = faUndo;
  addIcon = faPlus;

  //Paginacion 
  pages: number = 1;

  constructor(
    public userService: UserService,
    public alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(res => {
      this.userService.users = res as User[];
    });
  }

  selectUser(user: User) {
    this.userService.selectUser = user;
  }

  createAdministrador(form:NgForm){
    this.userService.createAdministrador(form.value).subscribe(data=>{
      this.alertService.success("Se ha creado el administrador de manera correcta");
      this.getUsers();
      this.btn_administrador.nativeElement.click();
    });
  }

  deleteUser(form: NgForm) {
    this.userService.deleteUser(form.value.id).subscribe(data => {
      this.alertService.success("Se ha eliminado el usuario de manera correcta");
      form.reset();
      this.getUsers();
      this.btn_delete_close.nativeElement.click();
    }, error => {
      console.log(error);
      this.alertService.error("No se pudo eliminar el usuario");
    });
  }

  restoreUser(form: NgForm) {
    this.userService.restoreUser(form.value.id).subscribe(data => {
      this.alertService.success("Se ha restaurado el usuario de manera correcta");
      form.reset();
      this.getUsers();
      this.btn_restore_close.nativeElement.click();
    }, error => {
      console.log(error);
      this.alertService.error("No se pudo restaurar el usuario");
    });
  }

  resetObject(){
    this.userService.selectUser = new User();
  }

}

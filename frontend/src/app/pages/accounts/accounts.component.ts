import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import {AlertService} from '../../_services/alert.service';
import {UserService} from '../../_services/user.service';
import { User } from 'src/app/_models/user';

import {faTrashAlt,faEdit,faUndo} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  deleteIcon = faTrashAlt;
  restoreIcon = faUndo;


  constructor(
    public userService: UserService,
    public alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe(res=>{
      this.userService.users = res as User[];
    });
  }


}

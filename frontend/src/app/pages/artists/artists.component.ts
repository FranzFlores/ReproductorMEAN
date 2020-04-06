import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

import { faTrashAlt, faEdit, faUndo, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { ArtistService } from 'src/app/_services/artist.service';
import { Artist } from 'src/app/_models/artist';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {

  @ViewChild('btn_create_close', { static: false }) btn_create_close: ElementRef<HTMLElement>;

  addIcon = faPlus;
  

  constructor(
    public artistService: ArtistService,
    public alertService: AlertService,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.artistService.selectArtist = new Artist();
  }

  createArtist(form: NgForm) {
    if (form.valid) {
      this.artistService.createArtist(form.value).subscribe(data => {
        this.alertService.success("Se ha creado el artista de manera correcta");
        this.btn_create_close.nativeElement.click();
      }, error => {
        console.log(error);
        this.alertService.error("No se pudo crear el artista");
      });
    }
  }

}

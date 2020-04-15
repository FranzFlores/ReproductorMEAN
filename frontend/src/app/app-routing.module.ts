import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from "./pages/signup/signup.component";
import { LoginComponent } from "./pages/login/login.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { AccountsComponent } from "./pages/accounts/accounts.component";
import { SettingsComponent } from "./pages/settings/settings.component";

import { AuthGuard } from "./_guards/auth.guard";
import { ArtistsComponent } from './pages/artists/artists.component';
import { AlbumComponent } from './pages/album/album.component';
import { ArtistDetailsComponent } from './pages/artist-details/artist-details.component';
import { SongsComponent } from './pages/songs/songs.component';
import { AlbumDetailsComponent } from './pages/album-details/album-details.component';

const routes: Routes = [
  { path: '', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'account', component: AccountsComponent, canActivate: [AuthGuard] },
      { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
      { path: 'artist', component: ArtistsComponent, canActivate: [AuthGuard] },
      { path: 'artist-details/:id', component: ArtistDetailsComponent, canActivate: [AuthGuard] },
      { path: 'album', component: AlbumComponent, canActivate: [AuthGuard] },
      { path: 'album-details/:id', component: AlbumDetailsComponent, canActivate: [AuthGuard] },
      { path: 'song', component: SongsComponent, canActivate: [AuthGuard] }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

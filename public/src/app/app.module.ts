import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MusicDataComponent } from './music-data/music-data.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { OneMusicComponent } from './one-music/one-music.component';
import { AddMusicComponent } from './add-music/add-music.component';
import { HomeComponent } from './home/home.component';
import { EditMusicComponent } from './edit-music/edit-music.component';
import { SearchMusicComponent } from './search-music/search-music.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';



const routes: Routes = [

  {
    path: "addMusic",
    component: AddMusicComponent
  },
  {
    path: "editMusic",
    component: EditMusicComponent
  },
  {
    path: "music/:musicId",
    component: OneMusicComponent
  },
  {
    path: "music",
    component: MusicDataComponent
  },
  {
    path: "search",
    component: SearchMusicComponent
  },
  {
    path: "login",
    component: UserLoginComponent
  },
  {
    path: "register",
    component: UserRegisterComponent
  },
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "**",
    component: ErrorPageComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MusicDataComponent,
    NavBarComponent,
    FooterComponent,
    OneMusicComponent,
    ErrorPageComponent,
    AddMusicComponent,
    HomeComponent,
    EditMusicComponent,
    SearchMusicComponent,
    UserLoginComponent,
    UserRegisterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService],
  bootstrap: [AppComponent],
})
export class AppModule { }

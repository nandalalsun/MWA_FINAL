import { Component, OnInit, Output } from '@angular/core';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {


  isLoggedIn!: boolean;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authenticationService.isLoggedIn;
    console.log(this.isLoggedIn);
  }

  logout() {
    this.authenticationService.removeToken();
    this.isLoggedIn = this.authenticationService.isLoggedIn;
  }

}


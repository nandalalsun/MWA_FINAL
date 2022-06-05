import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { UserDataService } from '../user-data.service';

export class LoginResponse {
  Success!: string;
  accessToken!: string;
  constructor(Success: string, token: string) {
    this.Success = Success;
    this.accessToken = token;
  }
}

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  providers: [NavBarComponent]
})
export class UserLoginComponent implements OnInit {

  isLoggedIn!: boolean;
  username!: string;

  constructor(private userDataService: UserDataService, private router: Router, private authenticationService: AuthenticationService, private navbar: NavBarComponent) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authenticationService.isLoggedIn;
    this.username = this.authenticationService.username;
  }

  userLogin(formData: NgForm) {
    let userCredential = {
      username: formData.value.username,
      password: formData.value.password
    }
    this.userDataService.userLogin(userCredential).subscribe({
      next: (login) => {
        alert("Login Success");
        this.authenticationService.saveToken(login.accessToken);
        this.username = this.authenticationService.username;
      },
      error: (error) => {
        if (error.status && (error.status == 401)) {
          alert("Unauthorized access");
        }
      },
      complete: () => {
        if (localStorage.getItem("accessToken")) {
          this.router.navigate(["music"]);
        }
      }
    });

  }

  logout() {
    this.authenticationService.removeToken();
    this.isLoggedIn = this.authenticationService.isLoggedIn;
  }

}

export class Credential {
  #username!: string;
  #password!: string;

  constructor(username: string, password: string) {
    this.#username = username;
    this.#password = password;
  }

  get username(): string {
    return this.#username;
  }
  get password(): string {
    return this.#password;
  }

}

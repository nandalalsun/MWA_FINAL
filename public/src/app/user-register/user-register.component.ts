import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  public repeatPassword: string = "";
  isRepeatPasswordMatch: boolean = true;

  constructor(private _userDataService: UserDataService) { }

  ngOnInit(): void {
  }

  userRegister(formData: NgForm) {

    if (formData.value.password !== formData.value.repeat_password) {
      this.isRepeatPasswordMatch == false;

      return;
    }
    alert("Password did not match");
    this.isRepeatPasswordMatch = true;

    let newUser = {
      username: formData.value.username,
      password: formData.value.password
    }
    this._userDataService.userRegister(newUser).subscribe({
      next: (newUser) => {
        alert("User Created");

      },
      error: (error) => {
        alert("Error");
      },
      complete: () => {

      }
    });
  }


  // selectChangeHandler(event: any) {
  //   if (this.repeatPassword == event.target.value) {
  //     this.isRepeatPasswordMatch = true;
  //   }
  // }
}

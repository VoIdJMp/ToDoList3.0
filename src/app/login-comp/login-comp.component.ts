import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-comp',
  templateUrl: './login-comp.component.html',
  styleUrls: ['./login-comp.component.css'],
  providers: [HttpService]
})
export class LoginCompComponent implements OnInit {

  userData: any;

  constructor(private httpService: HttpService, private route: Router) { }

  ngOnInit(): void {
    this.httpService.getDataOfUsers().subscribe( (data: any) => {
      this.userData = data;
    });
    if (window.localStorage.getItem('login_info') !== null) {
      this.route.navigate(['/mytasks']);
    }
  }

  show_reg(regForm: any, loginForm: any) {
    regForm.style.display = 'block';
    loginForm.style.display = 'none';
  }

  checkLoginData(userData, passwordData) {
    for (let i of this.userData) {
      if (i.name === userData.value && i.password === passwordData.value) {
        window.localStorage.setItem('login_info', JSON.stringify(i));
        this.route.navigate(['/mytasks']);
      }
    }
  }

  regUser(getUserName: any, getPassword1: any, getPassword2: any, loginForm, regForm) {
    const userName: string  = getUserName.value;
    const password: string  = getPassword1.value;
    this.httpService.postDataUsers(this.userData.length + 1, userName, password).subscribe( data => {
      loginForm.style.display = 'block';
      regForm.style.display = 'none';
      getUserName.value = ''; getPassword1.value = ''; getPassword2.value = '';
    });
  }

}

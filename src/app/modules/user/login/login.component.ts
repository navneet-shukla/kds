import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ValidatorList} from '../../../shared/validator.service';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  userId: any
  userRole: any
  userData: any
  token: any
  myerrorNotify: any
  constructor( private formBuilder: FormBuilder,
               private UserService: UserService,
               private route: Router
  ) { }
  public account_validation_messages = ValidatorList.account_validation_messages

  ngOnInit() {

    /*let newRoute = new Array();
    let RouteUrl =  this.route.url;
    newRoute = RouteUrl.split('/');
    this.getRoute =  newRoute[1];
    console.log(this.getRoute,"getRoute");
    if (this.getRoute == "logout") {
      console.log("1");
      this.doLogOut();
    }*/



    this.loginFUnctionInit();
  }
  loginFUnctionInit(){

    this.userData = JSON.parse(localStorage.getItem('userData'))
    this.token = JSON.parse(localStorage.getItem('token'))
    if (this.userData != 'undefined' && this.token != 'undefined' && this.userData != null && this.token != null) {
      this.route.navigate(['/orders'])
    }
    else {
      localStorage.clear();
      this.route.navigate(['/login'])
    }

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, ValidatorList.emailValidator]],
      password: ['', [Validators.required]]
    });
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(this.loginForm.controls).forEach(field => {
      const control = this.loginForm.get(field);
      control.markAsTouched({onlySelf: true});
      control.markAsDirty({onlySelf: true});
    });
  }


  onSubmit(){
    if (this.loginForm.invalid) {
      this.validateAllFormFields(this.loginForm)
      return
    }
    else{

      // console.log(this.loginForm.value,'this.loginForm.value')
      this.UserService.authenticateUser(this.loginForm.value)
          .subscribe(result => {
            // console.log(result,'result')
            if (result['status'] == 'Success') {
              let authData = result['result']['user']
              // authData.last_access_time = new Date().getTime();
              let token = result['result']['token']
              if (authData != null && (authData.roleId == 2 || authData.roleId == 6)) {
                localStorage.setItem('userData', JSON.stringify(authData))
                localStorage.setItem('token', JSON.stringify(token))
                // localStorage.setItem('socketNotification', JSON.stringify(result['notification_counter']))
                // localStorage.setItem('socketMessage', JSON.stringify(result['message_counter']))
                this.userData = JSON.parse(localStorage.getItem('userData'))
                this.token = JSON.parse(localStorage.getItem('token'))
                this.userId = this.userData.userId
                // this.toastr.success('Login Successful')
                this.route.navigate(['/orders'])
                // this.route.navigate(['/timeline/' + this.userData.user_name])
              } else {
                this.route.navigate(['/login'])
                // this.toastr.error('Invalid Username or Password')
                this.loginForm.reset()
                Object.keys(this.loginForm.controls).forEach(field => {
                  const control = this.loginForm.get(field);
                  control.markAsTouched({onlySelf: true});
                  control.markAsDirty({onlySelf: true});
                });
              }
              // this.isProcessing = false
            }
            else {

              // this.submitted = false
              // this.toastr.error(result['message'])
              // this.isProcessing = false
            }
          }, (error) => {
            // console.log(error)
            this.loginForm.reset()
            this.myerrorNotify = error['error']['messages']['error']
            // this.appService.unAuthorizedUserAccess(error, 'admin');
          });

    }
    // console.log('done');

  }



}

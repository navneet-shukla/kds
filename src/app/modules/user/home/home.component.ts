import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private UserService: UserService,
              private route: Router) { }
  userId: any
  userRole: any
  userData: any
  token: any
  ngOnInit() {

    this.userData = JSON.parse(localStorage.getItem('userData'))
    this.token = JSON.parse(localStorage.getItem('token'))
    if (this.userData != 'undefined' && this.token != 'undefined' && this.userData != null && this.token != null) {
      this.userId = this.userData.userId
      this.route.navigate(['/login'])
    }
    else {
      localStorage.clear();
      this.route.navigate(['/login'])
    }



    this.UserService.getOrderList(this.userId).subscribe(result => {
// console.log(result,'result orders')

    }, (error) => {
      // this.appService.unAuthorizedUserAccess(error, 'admin');
    });
  }

}

import { Component, OnInit, OnChanges } from '@angular/core';
import { Injectable, ViewChild, ElementRef } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserService} from '../../user.service';

declare var $: any

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
@Injectable()

export class HeaderComponent implements OnInit, OnChanges {

  printerSettingForm: FormGroup;
  submitted = false;
  userData: any
  token: any
  mybtnchk = true;
  @ViewChild('closeBtn') closeBtn: ElementRef;
  constructor(
      private route: Router,
      private UserService: UserService,
      private formBuilder: FormBuilder
  ) {

  }
  getRoute:any


  ngOnChanges() {
    this.ngOnInit();
  }

  ngOnInit() {

    let newRoute = new Array();
    let RouteUrl =  this.route.url;
    newRoute = RouteUrl.split('/');
    this.getRoute =  newRoute[1];
console.log(this.getRoute);
    if (this.getRoute == "logout") {

      this.doLogOut();
    }
	if(this.getRoute == "serve"){
		this.mybtnchk = true;
	}
	else if(this.getRoute == "orders"){
		this.mybtnchk = false;
	}

    this.userData = JSON.parse(localStorage.getItem('userData'))
    this.token = JSON.parse(localStorage.getItem('token'))

    this.printerSettingForm = this.formBuilder.group({
      ip_address: ['', Validators.required],
      device_id: ['', Validators.required]
    });

    if(this.userData.printer) {
      this.printerSettingForm.patchValue({
        restaurant_id: this.userData.printer.restaurant_id,
        ip_address: this.userData.printer.ip,
        device_id: this.userData.printer.device_id
      });
    }
	
	
	
  }
//$('input.cb-value').prop("checked", true);
switchBtn(evt) {
	console.log("dasdasdasd",evt);
	if(evt)
	{
		// this.mybtnchk = false;
		this.route.navigate(['/serve']);
	}
	else{
		// this.mybtnchk = true;
		this.route.navigate(['/orders']);
		
	}
	/*  var mainParent = $(this).parent('.toggle-btn');
  if($(mainParent).find('input.cb-value').is(':checked')) {
    $(mainParent).addClass('active');
  } else {
    $(mainParent).removeClass('active');
  } */

}

  // convenience getter for easy access to form fields
  get f() { return this.printerSettingForm.controls; }

  doLogOut() {


    localStorage.removeItem('userData')

    localStorage.removeItem('token')

    this.route.navigate(['/login']);

  }

  settings(){

    this.submitted = true;
    // stop here if form is invalid
    if (this.printerSettingForm.valid) {
      let updateDataObject = {
        restaurant_id: parseInt(this.userData['restaurantId']),
        ip_address: this.printerSettingForm.value.ip_address,
        device_id: this.printerSettingForm.value.device_id,
      }
      this.UserService.savePrinterSettings(updateDataObject)
          .subscribe(result => {
            if (result['status'] == 'Success') {
              this.closeModal();
              this.userData.printer =  result['result']['printer']
              localStorage.setItem('userData', JSON.stringify(this.userData))
              this.userData = JSON.parse(localStorage.getItem('userData'))
              console.log('this.userData',this.userData)
            }
            else{

            }
          });
    }
    else{
      return;
    }
  }

  //call this wherever you want to close modal
  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

}

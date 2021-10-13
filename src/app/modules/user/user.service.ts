import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.url;
  constructor(private router: Router,private http: HttpClient) { }

  authenticateUser(value) {
    return this.http.post(this.url + 'login', value)
  }

  getOrderList(value) {
    return this.http.post(this.url + 'get-orders-list', value)
  }

  getCategoriesList(value){
    return this.http.post(this.url + 'get-categories',value)
  } 
  getFilterOrders(value){
    return this.http.post(this.url + 'get-filter-orders', value)
  }
  updateItemStatus(value){
    return this.http.post(this.url + 'update-item-status', value)
  }
  getOrderComments(value){
    return this.http.post(this.url + 'get-order-comments', value)
  }
  updateItemServeStatus(value){
    return this.http.post(this.url + 'item-serve', value)
  }
  deleteOrder(value){
    return this.http.post(this.url + 'delete-order', value)
  }
  getOrderForPrint(orderId){
    return this.http.get(this.url + 'order-print/'+orderId)
  }
  savePrinterSettings(value){
    return this.http.post(this.url + 'printer-setting', value)
  }
}

import { Observable } from 'rxjs';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

export class MyInterceptor implements HttpInterceptor{
    authHeader:any

    intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>{
        this.setUser();

        if(this.authHeader==null){
            return next.handle(req.clone())
        }

        /* Code for checking weather user is logged in from last 30 min and did not performed any operation */
            let userData = JSON.parse(localStorage.getItem('userData'));

            if (userData) {
                let diff = new Date().getTime() - userData.last_access_time;
                
                if (diff > 1000 * 60 * 30) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('userData');

                    this.authHeader = '';
                }
                
                userData.last_access_time = new Date().getTime();
                localStorage.setItem('userData',JSON.stringify(userData));   
            }else{
                localStorage.removeItem('token');
            }
        /* end */

        const clonedReq=req.clone({headers:req.headers.set('Authorization',this.authHeader)});
        return next.handle(clonedReq);
    }

    setUser(){
        this.authHeader=JSON.parse(localStorage.getItem('token'))
    }
}
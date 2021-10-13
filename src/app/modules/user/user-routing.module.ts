import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { ServeComponent } from './serve/serve.component';
import { HeaderComponent } from './layout/header/header.component';

const routes: Routes = [

  {
    path:'login',
    component:LoginComponent,
  },
  {
    path:'logout',
    component:HeaderComponent,
  },
  {
    path:'home',
    component:HomeComponent,
  },
  {
    path:'orders',
    component:OrdersComponent,
  },
  {
    path:'serve',
    component:ServeComponent,
  },
  {
    path:'**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

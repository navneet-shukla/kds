import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    // pathMatch: 'full'
    loadChildren: './modules/user/user.module#UserModule',
    data: {
      title: 'Home',
      customLayout: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { //for reload the same url onclick the same link
    useHash: true,
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

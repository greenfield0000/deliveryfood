import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderOutletComponent } from './outlets/header-outlet/header-outlet.component';
import { MainOutletComponent } from './outlets/main-outlet/main-outlet.component';
import { FooterOutletComponent } from './outlets/footer-outlet/footer-outlet.component';


const routes: Routes = [
  /**
   * { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'auth', component: AuthComponent,
    children: [
      { path: 'registry', component: RegistryComponent }
    ]
  }
   */

  {
    path: '', redirectTo: 'login', pathMatch: 'full',
  },
  {
    path: 'login',
    children: [
      { path: '', loadChildren: './modules/auth/auth.module#AuthModule' },
      { path: '', component: HeaderOutletComponent, outlet: 'headerOutlet' },
      { path: '', component: MainOutletComponent, outlet: 'mainOutlet'},
      { path: '', component: FooterOutletComponent, outlet: 'footerOutlet' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

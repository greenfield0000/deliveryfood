import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainOutletComponent } from './outlets/main-outlet/main-outlet.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'auth', pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: './modules/auth/auth.module#AuthModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

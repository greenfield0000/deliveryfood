import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OutletChildrenConstant } from './constants/outlet-children-constant';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule' },
  { path: 'planner', loadChildren: './modules/pages/pages.module#PagesModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

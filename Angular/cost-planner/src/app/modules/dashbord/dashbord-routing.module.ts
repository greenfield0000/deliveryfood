import { DashbordComponent } from './dashbord.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HeaderOutletComponent } from '../../outlets/header-outlet/header-outlet.component';
import { MainOutletComponent } from '../../outlets/main-outlet/main-outlet.component';
import { FooterOutletComponent } from '../../outlets/footer-outlet/footer-outlet.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  {
    path: 'main',
    children: [
      { path: '', component: DashbordComponent, outlet: 'content' },
      { path: '', component: HeaderOutletComponent, outlet: 'headerOutlet' },
      { path: '', component: MainOutletComponent, outlet: 'mainOutlet' },
      { path: '', component: FooterOutletComponent, outlet: 'footerOutlet' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashbordRoutingModule { }

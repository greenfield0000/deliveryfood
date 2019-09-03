import { MainOutletComponent } from 'src/app/outlets/main-outlet/main-outlet.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HeaderOutletComponent } from '../../outlets/header-outlet/header-outlet.component';
import { FooterOutletComponent } from '../../outlets/footer-outlet/footer-outlet.component';
import { MenuModule } from './menu/menu.module';
import { PermissionGuard } from 'src/app/guards/permission.guard';

const routes: Routes = [
  { path: '', component: HeaderOutletComponent, outlet: 'headerOutlet' },
  { path: '', component: MainOutletComponent, outlet: 'mainOutlet' },
  { path: '', component: FooterOutletComponent, outlet: 'footerOutlet' },
  // Оставлено для начальной загрузки DashComponent`а
  { path: '', loadChildren: () => MenuModule, canActivate: [PermissionGuard] },
  { path: 'pages', loadChildren: () => MenuModule, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashbordRoutingModule {}

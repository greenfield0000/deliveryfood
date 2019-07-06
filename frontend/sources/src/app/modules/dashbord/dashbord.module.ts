import { MainOutletComponent } from 'src/app/outlets/main-outlet/main-outlet.component';
import { RouterModule } from '@angular/router';
import { DashbordRoutingModule } from './dashbord-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderOutletComponent } from 'src/app/outlets/header-outlet/header-outlet.component';
import { FooterOutletComponent } from 'src/app/outlets/footer-outlet/footer-outlet.component';
import { MatToolbarModule, MatSidenavModule, MatButtonModule, MatIconModule, MatStepperModule, MatPaginatorModule } from '@angular/material';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [MainOutletComponent, HeaderOutletComponent, FooterOutletComponent],
  imports: [
    CommonModule,
    DashbordRoutingModule,
    RouterModule,
    // Material
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule

  ],
  exports: [
    MainOutletComponent, HeaderOutletComponent, FooterOutletComponent
  ],
  bootstrap: [MainOutletComponent, HeaderOutletComponent, FooterOutletComponent]
})
export class DashbordModule { }

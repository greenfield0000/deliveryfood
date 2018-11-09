import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { HeaderOutletComponent } from 'src/app/outlets/header-outlet/header-outlet.component';
import { MainOutletComponent } from 'src/app/outlets/main-outlet/main-outlet.component';
import { FooterOutletComponent } from 'src/app/outlets/footer-outlet/footer-outlet.component';
import { MatToolbarModule, MatSidenavModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [MainPageComponent, HeaderOutletComponent, MainOutletComponent, FooterOutletComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
     MatToolbarModule,
     MatSidenavModule,
     MatButtonModule
  ],
  exports: [
    HeaderOutletComponent, MainOutletComponent, FooterOutletComponent
  ]
})
export class PagesModule { }

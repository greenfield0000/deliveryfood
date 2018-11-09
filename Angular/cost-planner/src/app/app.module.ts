import { HttpClientModule } from '@angular/common/http';
import { AuthServiceImpl } from './services/auth-service/auth-service-impl.service';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatToolbarModule, MatSidenavModule } from '@angular/material';
import { FormsModule, } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { HeaderOutletComponent } from './outlets/header-outlet/header-outlet.component';
import { MainOutletComponent } from './outlets/main-outlet/main-outlet.component';
import { FooterOutletComponent } from './outlets/footer-outlet/footer-outlet.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderOutletComponent,
    MainOutletComponent,
    FooterOutletComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    HttpClientModule
  ],
  exports: [
    MatToolbarModule,
    MatSidenavModule,
    HeaderOutletComponent,
    MainOutletComponent,
    FooterOutletComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

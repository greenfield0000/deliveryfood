import { HttpClientModule } from '@angular/common/http';
import { AuthServiceImpl } from './services/auth-service/auth-service-impl.service';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatToolbarModule, MatSidenavModule, MatSidenavContent } from '@angular/material';
import { FormsModule, } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { HeaderOutletComponent } from './outlets/header-outlet/header-outlet.component';
import { MainOutletComponent } from './outlets/main-outlet/main-outlet.component';
import { FooterOutletComponent } from './outlets/footer-outlet/footer-outlet.component';
import { PagesModule } from './modules/pages/pages.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule
    // PagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

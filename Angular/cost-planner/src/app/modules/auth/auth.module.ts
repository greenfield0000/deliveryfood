import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthServiceImpl } from 'src/app/services/auth-service/auth-service-impl.service';
import { HttpClientModule } from '@angular/common/http';
import { RegistryComponent } from './registry/registry.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { MainOutletComponent } from 'src/app/outlets/main-outlet/main-outlet.component';

@NgModule({
  declarations: [LoginComponent, RegistryComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AuthRoutingModule
  ],
  exports: [LoginComponent, RegistryComponent],
  providers: []
})
export class AuthModule { }

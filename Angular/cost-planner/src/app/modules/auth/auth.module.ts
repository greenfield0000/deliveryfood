import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegistryComponent } from './registry/registry.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import {
  MatToolbarModule, MatSidenavModule, MatButtonModule, MatCardModule,
  MatFormFieldModule, MatProgressSpinnerModule, MatInputModule
} from '@angular/material';

@NgModule({
  declarations: [LoginComponent, RegistryComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AuthRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule

  ],
  exports: [LoginComponent, RegistryComponent],
  providers: []
})
export class AuthModule { }

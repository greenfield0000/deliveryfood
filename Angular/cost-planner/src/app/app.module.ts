import { FooterOutletComponent } from './outlets/footer-outlet/footer-outlet.component';
import { MainOutletComponent } from 'src/app/outlets/main-outlet/main-outlet.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// tslint:disable-next-line:max-line-length
import { MatToolbarModule, MatSidenavModule, MatButtonModule, MatCardModule, MatIconModule, MatTreeNodeToggle, MatTreeNodePadding, MatTreeNodeDef, MatTreeNode, MatTreeModule } from '@angular/material';
import { TreeFlatOverviewComponent } from './components/tree-flat-overview/tree-flat-overview.component';
import { HeaderOutletComponent } from './outlets/header-outlet/header-outlet.component';

@NgModule({
  declarations: [
    AppComponent,
    TreeFlatOverviewComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

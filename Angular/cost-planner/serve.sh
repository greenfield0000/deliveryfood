#!/bin/bash
ng serve


<div class="main-page">
    <div class="header">
        <router-outlet name="headerOutlet"></router-outlet>
    </div>
    <div class="main">
        <div 
    *ngIf="true || !appAccountContextService.getAccountEntity().isAuthtorise()" 
        class="experimental">
            <router-outlet></router-outlet>
        </div>
        <mat-sidenav-container *ngIf="true || appAccountContextService.getAccountEntity().isAuthtorise()">
            <mat-sidenav #sidenav class="example-sidenav">
                <p class="main-menu-caption">Main menu</p>
            </mat-sidenav>
            <mat-sidenav-content>
                <div class="content">
                    <router-outlet name="content"></router-outlet>
                </div>
            </mat-sidenav-content>
        </mat-sidenav-container>
    </div>
    <div class="footer">
        <router-outlet name="footerOutlet"></router-outlet>
    </div>
</div>

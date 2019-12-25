import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { PermissionGuard } from "./guards/permission.guard";
import { DashbordModule } from "./modules/dashbord/dashbord.module";
import { AuthModule } from "./modules/auth/auth.module";

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => AuthModule },
  {
    path: 'dashbord',
    loadChildren: () => DashbordModule
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
      onSameUrlNavigation: 'reload',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

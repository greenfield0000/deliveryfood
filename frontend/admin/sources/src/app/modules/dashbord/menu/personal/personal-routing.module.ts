
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalComponent } from './journal-page/personal.component';
import { PersonalAddComponent } from './editor/personal-add/personal-add.component';
import { PersonalEditComponent } from './editor/personal-edit/personal-edit.component';

const routes: Routes = [

  {
    path: '', component: PersonalComponent
  },
  {
    path: 'add', component: PersonalAddComponent
  },
  {
    path: 'edit', component: PersonalEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule { }

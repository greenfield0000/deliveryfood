import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalAddComponent } from './editor/personal-add/personal-add.component';
import { PersonalEditComponent } from './editor/personal-edit/personal-edit.component';
import { PersonalRoutingModule } from './personal-routing.module';
import { PersonalComponent } from './journal-page/personal.component';
import { JournalComponent } from 'src/app/components/journal/journal.component';
import { FilterPanelComponent } from 'src/app/components/journal/filter-panel/filter-panel.component';
import { AgGridModule } from 'ag-grid-angular';
import { RowNumberRenderer } from 'src/app/components/journal/cell-renders/rownumber-renderer.component';
import { MatPaginatorModule, MatProgressSpinnerModule, MatMenuModule, MatSidenavModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatOptionModule, MatDatepickerModule } from '@angular/material';
import { PersonInfoEditorComponent } from 'src/app/components/person-info-editor/person-info-editor.component';
import { AuthModule } from 'src/app/modules/auth/auth.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PersonalComponent,
    PersonalAddComponent,
    PersonalEditComponent,
    // common components for journals
    JournalComponent,
    FilterPanelComponent,
    RowNumberRenderer,
    // person components
    PersonInfoEditorComponent,
  ],
  imports: [
    CommonModule,
    PersonalRoutingModule,

    // Material
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatSidenavModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSelectModule,

    // Angular Ag-grid
    AgGridModule.withComponents([RowNumberRenderer]),

    AuthModule,
    ReactiveFormsModule
  ],
  exports: [
    // common components
    JournalComponent,
    FilterPanelComponent,
    RowNumberRenderer
  ]
})
export class PersonalModule { }

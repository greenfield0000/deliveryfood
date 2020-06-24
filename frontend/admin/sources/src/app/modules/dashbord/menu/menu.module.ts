import { FullCalendarModule } from '@fullcalendar/angular';
import { MatPaginatorModule, MatProgressSpinnerModule, MatMenuModule, MatSidenavModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatOptionModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuRoutingModule } from './menu-routing.module';
import { DashbordComponent } from '../dashbord.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { WorkScheduleComponent } from './work-schedule/work-schedule.component';
import { OrdersComponent } from './orders/orders.component';
import { SuggestNewsComponent } from './suggest-news/suggest-news.component';
import { StopSheetComponent } from './stop-sheet/stop-sheet.component';
import { MenuComponent } from './menu/menu.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { MasterClassesComponent } from './master-classes/master-classes.component';
import { FestivalsComponent } from './festivals/festivals.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { VacationScheduleComponent } from './vacation-schedule/vacation-schedule.component';
import { ProfessionalStaffTrainingComponent } from './professional-staff-training/professional-staff-training.component';
import { PersonalModule } from './personal/personal.module';
import { DishComponent } from './dish/dish.component';

@NgModule({
  declarations: [
    // menu (menu pages) component
    DashbordComponent,
    ReservationsComponent,
    WorkScheduleComponent,
    OrdersComponent,
    SuggestNewsComponent,
    StopSheetComponent,
    MenuComponent,
    DeliveryComponent,
    MasterClassesComponent,
    FestivalsComponent,
    PurchasesComponent,
    VacationScheduleComponent,
    ProfessionalStaffTrainingComponent,
    DishComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    RouterModule,
    // JournalsModule
    PersonalModule,
    FullCalendarModule
  ]
})
export class MenuModule { }

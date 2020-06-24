import { DashbordComponent } from '../dashbord.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryComponent } from './delivery/delivery.component';
import { FestivalsComponent } from './festivals/festivals.component';
import { MasterClassesComponent } from './master-classes/master-classes.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfessionalStaffTrainingComponent } from './professional-staff-training/professional-staff-training.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { StopSheetComponent } from './stop-sheet/stop-sheet.component';
import { SuggestNewsComponent } from './suggest-news/suggest-news.component';
import { VacationScheduleComponent } from './vacation-schedule/vacation-schedule.component';
import { WorkScheduleComponent } from './work-schedule/work-schedule.component';
import { PersonalModule } from './personal/personal.module';
import { MenuComponent } from './menu/menu.component';
import { DishComponent } from './dish/dish.component';

const routes: Routes = [

  {
    path: '', component: DashbordComponent
  },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'festivals', component: FestivalsComponent },
  { path: 'master-classes', component: MasterClassesComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'personal', loadChildren: () => PersonalModule },
  { path: 'menu', component: MenuComponent },
  { path: 'professional-staff-training', component: ProfessionalStaffTrainingComponent },
  { path: 'purchases', component: PurchasesComponent },
  { path: 'reservations', component: ReservationsComponent },
  { path: 'stop-sheet', component: StopSheetComponent },
  { path: 'suggest-news', component: SuggestNewsComponent },
  { path: 'vacation-schedule', component: VacationScheduleComponent },
  { path: 'work-schedule', component: WorkScheduleComponent },
  { path: 'dish', component: DishComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }

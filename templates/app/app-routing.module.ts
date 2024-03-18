import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterAmtraakComponent } from './components-amtrak/register-amtraak/register-amtraak.component';
import { LoginAmtraakComponent } from './components-amtrak/login-amtraak/login-amtraak.component';
import { BookingsAmtraakComponent } from './components-amtrak/bookings-amtraak/bookings-amtraak.component';
import { TrainsAmtraakComponent } from './components-amtrak/trains-amtraak/trains-amtraak.component';
import { StationsAmtraakComponent } from './components-amtrak/stations-amtraak/stations-amtraak.component';
import { SchedulesComponent } from './components-amtrak/schedules/schedules.component';
import { TicketsViewComponent } from './components-amtrak/tickets-view/tickets-view.component';

const routes: Routes = [
  { path: '', component: RegisterAmtraakComponent },
  { path: 'register', component: RegisterAmtraakComponent },
  { path: 'login', component: LoginAmtraakComponent },
  { path: 'booking', component: BookingsAmtraakComponent },
  { path: 'trains', component: TrainsAmtraakComponent },
  { path: 'schedules', component: SchedulesComponent },
  { path: 'stations', component: StationsAmtraakComponent },
  { path: 'tickets', component: TicketsViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

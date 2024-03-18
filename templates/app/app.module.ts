import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrainsAmtraakComponent } from './components-amtrak/trains-amtraak/trains-amtraak.component';
import { BookingsAmtraakComponent } from './components-amtrak/bookings-amtraak/bookings-amtraak.component';
import { LoginAmtraakComponent } from './components-amtrak/login-amtraak/login-amtraak.component';
import { RegisterAmtraakComponent } from './components-amtrak/register-amtraak/register-amtraak.component';
import { HeaderComponent } from './components-amtrak/header/header.component';
import { FormsModule } from '@angular/forms';
import { StationsAmtraakComponent } from './components-amtrak/stations-amtraak/stations-amtraak.component';
import { SchedulesComponent } from './components-amtrak/schedules/schedules.component';

import { HttpClientModule } from '@angular/common/http';
import { TicketsViewComponent } from './components-amtrak/tickets-view/tickets-view.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    TrainsAmtraakComponent,
    BookingsAmtraakComponent,
    LoginAmtraakComponent,
    RegisterAmtraakComponent,
    HeaderComponent,
    StationsAmtraakComponent,
    SchedulesComponent,
    TicketsViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

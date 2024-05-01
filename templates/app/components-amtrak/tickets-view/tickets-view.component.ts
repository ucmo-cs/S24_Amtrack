import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetServiceService } from 'templates/app/services/get-service.service';
import { InsertServiceService } from 'templates/app/services/insert-service.service';
import { UpdateServiceService } from 'templates/app/services/update-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tickets-view',
  templateUrl: './tickets-view.component.html',
  styleUrls: ['./tickets-view.component.scss']
})
export class TicketsViewComponent implements OnInit {
  tickets: any = [];
  ngOnInit(): void {
    this.getTickets();
  }
  constructor(public router: Router, private datePipe: DatePipe,public getService: GetServiceService, public insertService: InsertServiceService , public updateService: UpdateServiceService) {}


  getTickets(){
    if(this.getService.user.isCustomer){
      this.getService.getAllTicketsOfUser(this.getService.user).subscribe((res)=>{
        this.tickets = res;
      })
    }
    else{
      this.getService.getAllTickets().subscribe((res)=>{
        this.tickets = res;
      })
    }
    
  }

  convertTo12HourFormat(originalTime: string): string {
    const parsedTime = originalTime.split(':');
    const hours = parseInt(parsedTime[0], 10);
    const minutes = parseInt(parsedTime[1], 10);
    const time = new Date();
    time.setHours(hours);
    time.setMinutes(minutes);

    return this.datePipe.transform(time, 'h:mm a') || '';
  }

  cancelReservation(ticket: any) {
    this.updateService.updateTicket(ticket).subscribe((res)=>{
      this.getTickets();
    })
  }
}

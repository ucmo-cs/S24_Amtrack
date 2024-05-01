import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetServiceService {

  constructor(private httpclient : HttpClient) { }
  baseUrl = "http://127.0.0.1:5000/";

  user : any ={
    firstName : null,
    lastName: null,
    email : null,
    password: null,
    phoneNumber: null,
    dob: null,
    gender: null,
    isAdmin   :false,
    isCustomer: false
  };
  isLoginSuccessful : boolean = false;


  getUser(userEmail: any): Observable<any>{
    return this.httpclient.get(this.baseUrl +'getAllDetails/'+userEmail );
  }

  getStations(): Observable<any>{
    return this.httpclient.get(this.baseUrl +'getAllStations');
  }
  
  getTrains(): Observable<any>{
    return this.httpclient.get(this.baseUrl +'getAllTrains');
  }

  getSchedules(): Observable<any>{
    return this.httpclient.get(this.baseUrl +'getAllSchedules');
  }

  getBookingsOfTrain(train: any): Observable<any>{
    return this.httpclient.post(this.baseUrl +'getAllBookings', train);
  }

  searchTrains(body: any): Observable<any>{
    return this.httpclient.post(this.baseUrl +'searchTrain', body);
  }

  getSchedulesWithSearch(body: any):Observable<any>{
    return this.httpclient.post(this.baseUrl + 'getSchedulesBySearch', body)
  }

  getAllTicketsOfUser(body: any):Observable<any>{
    return this.httpclient.post(this.baseUrl + 'getAllTicketsOfUser', body)
  }

  getAllTickets():Observable<any>{
    return this.httpclient.get(this.baseUrl + 'getAllTickets', )
  }

}

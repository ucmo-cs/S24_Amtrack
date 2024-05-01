import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetServiceService } from 'templates/app/services/get-service.service';
import { InsertServiceService } from 'templates/app/services/insert-service.service';
import { UpdateServiceService } from 'templates/app/services/update-service.service';

@Component({
  selector: 'app-stations-amtraak',
  templateUrl: './stations-amtraak.component.html',
  styleUrls: ['./stations-amtraak.component.scss']
})
export class StationsAmtraakComponent  implements OnInit{

  ngOnInit(): void {
    this.getStations();
  }
  stations : any = [
    // { name: 'Station A', location: 'Location A', editable: false },
    // { name: 'Station B', location: 'Location B', editable: false },
    // // Add more station data as needed
  ];
  stationName: any = null;
  stationLocation: any = null;
  phoneNumber: any = null;
  city: any = null;
  state: any = null;
  showStationForm: boolean = false;

  constructor(private router: Router,public getService: GetServiceService, public insertService: InsertServiceService , public updateService: UpdateServiceService) {}
  showAddStationForm() {
    this.showStationForm = true;
  }

  toggleEdit(station: any) {
    if(station.editable){
      this.updateStation(station);
    }
    else{
      station.editable = !station.editable;
    }
    
  }
  cancelEdit(station: any){
    station.editable = !station.editable;
    station.updatedName =     station.stationName;
    station.updatedLocation = station.location;
    station.updatedPhoneNum = station.phoneNumber;
    station.updatedState = station.state;
    station.updatedCity = station.city;
  }

  OnBackClicked(){
    this.showStationForm = false;
    this.stationName = null;
    this.stationLocation = null;
    this.state = null;
    this.city = null;
    this.phoneNumber = null;
  }

  getStations(){
    this.getService.getStations().subscribe((res)=>{
      if(res){
        this.stations = res;
        this.stations.forEach((c: any)=>{
          c.updatedName = c.stationName;
          c.updatedLocation = c.location;
          c.updatedPhoneNum = c.phoneNumber;
          c.updatedState = c.state;
          c.updatedCity = c.city;
          c.editable = false;
        })
      }
    })
  }


  addStation(){
    var body = {
      stationName : this.stationName,
      location: this.stationLocation,
      phoneNumber: this.phoneNumber,
      state: this.state,
      city : this.city
    }
    this.insertService.addStation(body).subscribe((res)=>{
      if(res){
        this.showStationForm = false;
        this.stationName = null;
        this.stationLocation = null;
        this.getStations();
      }
     
    })
  }

  updateStation(station: any){
    var body = {
      _id: station._id,
      stationName : station.updatedName,
      location: station.updatedLocation,
      phoneNumber: station.updatedPhoneNum,
      state: station.updatedState,
      city : station.updatedCity
    }
    this.updateService.updateStation(body).subscribe((res)=>{
      if(res){
        this.getStations();
      }
    })
  }

}

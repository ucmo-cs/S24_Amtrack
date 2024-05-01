import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetServiceService } from 'templates/app/services/get-service.service';
import { InsertServiceService } from 'templates/app/services/insert-service.service';
import { UpdateServiceService } from 'templates/app/services/update-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent  implements OnInit{
  showNewScheduleForm: boolean = false;
  selectedTrain: any = '';
  selectedStartDay: any = '';
  selectedEndDay: any = '';
  startTime: any = '';
  endTime: any = '';
  existingSchedules: any= [];
  trains: any = [];
  isEditClicked: boolean = false;
  startStation: any = null;
  endStation: any = null;
  stations : any = [
   
  ];
  stationName: any = null;
  arrivalTime: any = null;
  masterStations: any = [];
  selectedScheduleForEdit: any = null;
  selectedStartStation: any = null;
  selectedEndStation  : any = null;
  scheduleStations: any = [];

  daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


  constructor(private router: Router,private datePipe: DatePipe,public getService: GetServiceService, public insertService: InsertServiceService , public updateService: UpdateServiceService) {}
  
  ngOnInit(): void {
    this.getStations();
    this.getTrains();
    this.getSchedules();
  }

  getTrains(){
    this.getService.getTrains().subscribe((res)=>{
      if(res){
        this.trains = res;
      }
    })
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
  

  getSchedules(){
    this.getService.getSchedules().subscribe((res)=>{
      this.existingSchedules = res;

      this.existingSchedules.forEach((sch: any)=>{
        sch.stations.sort((a: any,b: any)=> a.sequence - b.sequence);
    })
  });
  }

  addNewSchedule() {
    this.showNewScheduleForm = true;
  }

  saveNewSchedule() {
    if(this.isEditClicked){      

      var body ={
        _id: this.selectedScheduleForEdit._id,
        trainName: this.selectedTrain,
        startStation: this.startStation,
        destinationStation: this.endStation,
        startDay: this.selectedStartDay,
        endDay:this.selectedEndDay,
        startTime:this.startTime,
        endTime: this.endTime,
        stations: this.scheduleStations
      }

      this.updateService.updateSchedule(body).subscribe((res)=>{
        this.OnBackClicked();
      this.getSchedules();
      this.isEditClicked = false;
      })

    }
    else{
  var trainNum = this.trains.find((r: any)=> r.trainName == this.selectedTrain).trainNumber;
    var bodyForNew ={
      trainName: this.selectedTrain,
      trainNumber: trainNum,
      startStation: this.startStation,
      destinationStation: this.endStation,
      startDay: this.selectedStartDay,
      startTime:this.startTime,
      endTime: this.endTime,
      stations: this.scheduleStations
    }
    this.insertService.addSchedule(bodyForNew).subscribe((res)=>{
      this.showNewScheduleForm = false;
      this.OnBackClicked();
      this.getSchedules();
    })
  }
  }

  addStation(){
    this.scheduleStations.push({
      stationName: this.stationName,
      arrivalTime :this.arrivalTime,
      sequence: this.scheduleStations.length + 1
    })
    this.stationName= null;
    this.arrivalTime= null;
  }


  getStartStation() {
    var train = this.trains.find((train: any) => train.name === this.selectedTrain);
    return train ? train.startStation : '';
  }

  getEndStation() {
    var train = this.trains.find((train:any) => train.name === this.selectedTrain);
    return train ? train.destinationStation : '';
  }

  OnBackClicked(){
    this.showNewScheduleForm = false;
    this.selectedTrain=null;
    this.selectedEndDay= null;
    this.selectedStartDay = null;
    this.selectedEndDay = null;
    this.isEditClicked = false;
    this.startTime= null;
    this.endTime= null;
    this.stations.forEach((st : any)=>{
      st.sequence = null;
      st.arrivalTime = null;
    })
  }

  editSchedule(schedule: any ){
    this.selectedTrain=schedule.trainName;
    this.selectedStartDay = schedule.startDay;
    
    var train = this.trains.find((train:any) => train.name === this.selectedTrain);
    this.startStation = schedule.startStation;
    this.endStation    = schedule.destinationStation;
    this.scheduleStations = schedule.stations;
    this.startTime= schedule.startTime;
    this.endTime= schedule.endTime;
    this.isEditClicked = true;
    this.masterStations.forEach((station: any)=>{
      if(!this.stations.find((st: any )=> st.stationName  == station.stationName) && station.stationName != this.selectedEndStation){
        station.sequence = null;
        station.arrivalTime = null;
        this.stations.push(station);
      }
    })
    this.selectedScheduleForEdit = schedule;
  }

  toggleStatus(schedule: any){
    
  }

  removeFromSchedule(station: any){
    var index =this.scheduleStations.findIndex((st: any) => st.stationName == station.stationName);
    this.scheduleStations.splice(index,1);
  }

  getStations(){
    this.getService.getStations().subscribe((res)=>{
      if(res){
        this.masterStations = res;
        this.stations = res;
        this.stations.forEach((st : any)=>{
          st.sequence = null;
          st.arrivalTime = null;
        })
      }
    })
  }

}


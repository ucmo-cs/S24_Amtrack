import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetServiceService } from 'templates/app/services/get-service.service';
import { InsertServiceService } from 'templates/app/services/insert-service.service';
import { UpdateServiceService } from 'templates/app/services/update-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bookings-amtraak',
  templateUrl: './bookings-amtraak.component.html',
  styleUrls: ['./bookings-amtraak.component.scss']
})
export class BookingsAmtraakComponent implements OnInit {
  searchParams: any ={
    trainName: null
  };
  trainName: string = '';
  fromStation: string = '';
  toStation: string = '';
  stations: any[] = []; // Array to hold station options
  searchResults: any =[];
  searchPerformed: boolean = false;
  selectedClass: any = '';
  numOfSeats: number = 0;
  showReserveFields: boolean = false;
  seatsArray: any[] = [];
  showPaymentDetails: boolean = false;
  applicableFromStations: any = [];
  applicableToStations: any = [];
  showNoAvalibilityOfSeats: boolean = false;
  paymentDetails : any ={
    cardNumber: null,
    selectedPaymentMethod: null,
    cvv: null,
    nameOnCard: null,
    expireDate: null,
  };
  showNoSeatsAValiablemsg: boolean = false;
  isDateValid: boolean = true;
  isFutureDate: boolean = true;
  isMonthValid: boolean = true;
  isCvvValid: boolean = true;
  isCardNumberValid: boolean = true;
  selectedToStation: any = null;
  selectedFromStation: any = null;
  selectedSchedule: any = null;
  calculatedFare: any = null;
  selectedDate: any = null;
  errorMsg: boolean = false;
  bookings: any = [];
  trains: any = [];

  constructor(public router: Router,private datePipe: DatePipe,public getService: GetServiceService, public insertService: InsertServiceService , public updateService: UpdateServiceService) {}

  ngOnInit() {
    this.getTrains();
   this.getStations();
    
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
  


  onReserveClick(schedule: any){
    this.showReserveFields = true;
    this.selectedSchedule = schedule;
    this.stations.filter((station: any)=> {
      if(schedule.stations.find((st: any)=> st.stationName == station.stationName)){
        this.applicableFromStations.push(station);
      }
    })
  }

  searchTrains() {
    this.searchPerformed = true;
    // this.getService.searchTrains(this.searchParams).subscribe((res)=>{
    //   this.searchResults = res;
    // })
    this.getService.getSchedulesWithSearch(this.searchParams).subscribe((res)=>{
      this.searchResults = res;;
      this.searchResults.sort((a: any, b:any) => {
        const timeA = a.startTime.split(':').map(Number);
        const timeB = b.startTime.split(':').map(Number);
      
        // Compare the hours
        if (timeA[0] !== timeB[0]) {
          return timeA[0] - timeB[0];
        }
      
        // If hours are the same, compare the minutes
        return timeA[1] - timeB[1];
      });
    })
  }

  checkAvaliabillity(event : any){
    this.numOfSeats =0;
    const dateString = event.target.value;
    const updatedSelectedDate = dateString ? new Date(dateString) : null;
    let day = this.getDayOfWeek(updatedSelectedDate);
    this.errorMsg =  !(this.selectedSchedule.startDay == day);
    this.getBookings();
  }

  
  getBookings(){
    let totalSeats = 0;
    let totalFirstClassSeats = 0;
    var body = {
      trainName: this.selectedSchedule.trainName,
      date: this.selectedDate
    }
    this.getService.getBookingsOfTrain(body).subscribe((res)=>{
      this.bookings = res;
      res
    })
    this.showNoAvalibilityOfSeats= totalFirstClassSeats > 30 || totalSeats > 50;
  }

  getDayOfWeek(date : any) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = date.getDay(); // Get the day index (0 for Sunday, 1 for Monday, etc.)
    const dayName =dayIndex + 1 ==7 ? daysOfWeek[0] : daysOfWeek[dayIndex + 1]; // Get the day name using the index
    return dayName; // Return the day name or day index as needed
  }

  calculateFare(){
    let fare = this.selectedClass == 'First Class' ? 15 : 20;
    const selectedToStationArrival = this.selectedSchedule.stations.find((c: any)=> c.stationName == this.selectedToStation).arrivalTime;
    const selectedFromStationArrival = this.selectedSchedule.stations.find((c: any)=> c.stationName == this.selectedFromStation).arrivalTime;   
    const dateStationTo: Date = new Date('1970-01-01T' + selectedToStationArrival); // Assuming a default date (1970-01-01)
    const dateStationFrom: Date = new Date('1970-01-01T' + selectedFromStationArrival); // Assuming a default date (1970-01-01)
    const diffInMilliseconds: number = Math.abs(dateStationTo.getTime() - dateStationFrom.getTime());
    const diffInMinutes: number = Math.floor(diffInMilliseconds / (1000 * 60 * 60)); // Convert milliseconds to minutes
    return diffInMinutes * Number(fare);
  }

  cardNumberValidation(): boolean {
    return this.paymentDetails.cardNumber != null && this.paymentDetails.cardNumber != ""? /^\d{16}$/.test(this.paymentDetails.cardNumber) : true; 
  }

  securityCodeValidation(): boolean {
    return this.paymentDetails.cvv != null && this.paymentDetails.cvv != ""? /^\d{3}$/.test(this.paymentDetails.cvv) : true; 
  }

  validateCvv(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    const cvvPattern = /^[0-9]{3,4}$/;
    this.isCvvValid = cvvPattern.test(inputValue);
}

validateExpiryDate(event: Event) {
  if((event.target as HTMLInputElement).value != null){
    const inputValue = (event.target as HTMLInputElement).value;
    const datePattern = /^\d{2}\/\d{2}$/;
    this.isDateValid = datePattern.test(inputValue);

    if (this.isDateValid) {
        const currentDate = new Date();
        const inputDateParts = inputValue.split('/');
        const inputMonth = Number(inputDateParts[0]);
        const inputYear = Number(inputDateParts[1]);
        const inputDate = new Date(2000 + inputYear, inputMonth - 1, 1);

        this.isMonthValid = inputMonth >= 1 && inputMonth <= 12;
        this.isFutureDate = inputDate > currentDate;
    }
  }
  else{
    this.isMonthValid = true;
    this.isFutureDate  = true;
  }
}

validateCardNumber(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    const cardNumberPattern = /^[0-9]{16}$/;
    this.isCardNumberValid = cardNumberPattern.test(inputValue);
}

  submitPayment(){
       this.paymentDetails.cvv= this.paymentDetails.cvv.toString();
       this.paymentDetails.cardNumber = this.paymentDetails.cardNumber.toString();
       this.insertService.addBookings(this.getBookingPayload()).subscribe((res: any)=>{
        if(res && res.inserted_id){
          this.insertService.addTickets(this.getPayloadTicket(res.inserted_id)).subscribe((ticRes: any) =>{
            this.insertService.addPayment(this.getPaymentPayload(res.inserted_id)).subscribe((payRes: any) =>{
              this.router.navigateByUrl('/schedules');

            })
          })
        }
       })
     
 }

 getBookingPayload(){
  return {
    scheduleId: this.selectedSchedule._id,
    trainName: this.selectedSchedule.trainName,
    startStation: this.selectedFromStation,
    destinationStation:this.selectedToStation,
    noOfSeatsSelected: this.numOfSeats,
    fare: this.calculateFare() * this.numOfSeats,
    type: this.selectedClass,
    date: this.selectedDate,
    userId: this.getService.user._id,
    userName: this.getService.user.firstName +  " " + this.getService.user.firstName
    
  }
 }

 getPaymentPayload(bookingId: any){
  return {
    bookingId: bookingId,
    paymentDetails: this.paymentDetails,
    userId: this.getService.user._id,
    userName: this.getService.user.name
  }
 }

 getPayloadTicket(bookingId: any){
  var tickets : any = [];
  this.seatsArray.forEach((seat)=>{
    tickets.push({
      passengerName: seat.name,
      dob: seat.dob,
      gender: seat.gender,
      contact: seat.contact,
      trainName: this.selectedSchedule.trainName,
      bookingId: bookingId,
      fare: this.calculateFare() ,
      date: this.selectedDate,
      userId: this.getService.user._id,
      userName: this.getService.user.name,
      startStation: this.selectedFromStation,
      destinationStation:this.selectedToStation,
      status:"Reservation Booked",
      estimatedArrivalTime: this.selectedSchedule.stations.find((station: any)=> station.stationName == this.selectedFromStation).arrivalTime
    })
  })
  return tickets;
 }

 showTable(){
  var train = this.trains.find((train: any)=> train.trainName == this.selectedSchedule.trainName);

  let totalSeats = 0;
  let totalFirstClassSeats = 0;
  let totalEconomySeats = 0;
  this.bookings.forEach((tr : any)=>{
    if(tr.type == 'Business Class')totalSeats += tr.noOfSeatsSelected;
    if(tr.type == 'First Class')totalFirstClassSeats += tr.noOfSeatsSelected;
    if(tr.type == 'Economy Class')totalEconomySeats += tr.noOfSeatsSelected;
  });
  this.showNoAvalibilityOfSeats= Number(totalFirstClassSeats) + Number(this.numOfSeats) > train.firstClassNoOfSeats
   || Number(totalSeats) + Number(this.numOfSeats) > train.businessClassNoOfSeats 
   || Number(totalEconomySeats) + Number(this.numOfSeats) > train.economyClassNoOfSeats;
  if(!this.showNoAvalibilityOfSeats){
    this.seatsArray = [];
    for (let i = 1; i <= this.numOfSeats; i++) {
      this.seatsArray.push({
        passengerNumber: i,
        name: '',
        dob: null,
        gender: '',
      
      });
    }
  }
  else{
    this.selectedDate = null;
  }

  
  
 }


  viewPaymentSection() {
    this.showPaymentDetails = true;
  }

  backClicked(){
   this.resetAllFields();
  }
  resetAllFields(){
    this.searchParams ={
      trainName: null,
      destinationStation: null,
      startStation: null
    };
    this.paymentDetails={
      cardNumber: null,
      selectedPaymentMethod: null,
      cvv: null,
      nameOnCard: null,
      expireDate: null,
      appointmentId: null,
      amount: null
    };
    this.applicableFromStations = [];
    this.numOfSeats = 0;
    this.selectedSchedule = null;
    this.selectedDate = null;
    this.errorMsg = false;
    this.showPaymentDetails = false;
    this.showReserveFields = false;
    this.searchResults = [];
    this.searchPerformed = false;
    this.seatsArray =[];
    this.selectedClass = null;
    this.selectedFromStation = null;
    this.selectedToStation = null;
    this.showNoSeatsAValiablemsg = false;
  }


  getStations(){
    this.getService.getStations().subscribe((res)=>{
      if(res){
        this.stations = res;
       
      }
    })
  }
}

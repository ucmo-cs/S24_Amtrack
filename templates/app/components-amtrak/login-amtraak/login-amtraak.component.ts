import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetServiceService } from 'templates/app/services/get-service.service';
import { InsertServiceService } from 'templates/app/services/insert-service.service';
import { UpdateServiceService } from 'templates/app/services/update-service.service';
@Component({
  selector: 'app-login-amtraak',
  templateUrl: './login-amtraak.component.html',
  styleUrls: ['./login-amtraak.component.scss']
})
export class LoginAmtraakComponent implements OnInit {

  constructor(private router: Router,public getService: GetServiceService, public insertService: InsertServiceService , public updateService: UpdateServiceService) {}
  user : any = {
    email: null,
    password: null
  };
  showNotApprovedMsg: boolean =false;
  showIncorrectPasswordError: boolean = false;
  showNoUser: boolean = false;
  isPasswordVisible: boolean = false;
  ngOnInit():void{

  }

  togglePasswordVisibility(){
    this.isPasswordVisible = !this.isPasswordVisible;
  }


  getUserDetails(){
  this.showIncorrectPasswordError = false;
  this.showNoUser = false;
  this.getService.getUser(this.user.email).subscribe((res)=>{
    if(res && res.Success == false && res.message == 'No Details Found!'){
      this.showNoUser =  true;
      this.user = {
        email: null,
        password: null
      }
    }
    else{
      if(res.password == this.user.password){
        this.getService.user = res;
        this.getService.isLoginSuccessful = true;
        this.getService.user.isAdmin ? this.router.navigateByUrl('/stations') : this.router.navigateByUrl('/tickets') ;
      }
      else{
        this.showIncorrectPasswordError = true;
        this.user = {
          email: null,
          password: null
        }
      }
     
    }
  })
  
  }
}

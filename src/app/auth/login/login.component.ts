import { Component, OnDestroy, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms'
import { AuthService, Login } from '../auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy{
  @ViewChild('form',{ static: true }) form:NgForm;
  LoginEvent:Subscription;
  IsLoading:boolean;
  error:string;
  constructor(private authService:AuthService,private router:Router,private Route:ActivatedRoute){
    this.error=null;
    this.IsLoading=false;
  }

  OnSubmit(){
   const login:Login={Email:this.form.value.Email,password:this.form.value.password}
   this.IsLoading=true;
 this.LoginEvent=this.authService.Login(login).subscribe(res=>{
  this.IsLoading=false;
  this.form.reset();
   this.router.navigate(['/']);
 },err =>{
  this.IsLoading=false;
   const errorObj = err.error;
   this.error=errorObj.message;
 
 } )

  }
ngOnDestroy(): void {
  this.LoginEvent.unsubscribe();
  this.form.reset();

}
  
}

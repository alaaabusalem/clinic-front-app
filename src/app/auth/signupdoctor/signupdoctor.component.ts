import { Component, OnDestroy, OnInit, ViewChild,ElementRef } from '@angular/core';
import {NgForm} from '@angular/forms'
import { AuthService,registerdoctor,registeruser } from '../auth.service';
import { Subscription,Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../../shared/models/Department.model';
import { Location } from '../../shared/models/Location.model';

@Component({
  selector: 'app-signupdoctor',
  templateUrl: './signupdoctor.component.html',
  styleUrl: '../auth.component.css'
})
export class SignupdoctorComponent implements OnInit{
  @ViewChild('form',{ static: true }) form:NgForm;
  CreateDoctorEvent:Subscription;
  IsLoading:boolean=false;
  errArray:string[];
    departmentArr:Department[];
    locationArr:Location[];
    @ViewChild('Imgs') fileInput: ElementRef;

  constructor(private authService:AuthService,private router:Router,private route:ActivatedRoute){}

  ngOnInit() {
    this.authService.GetDepartments().subscribe(res=>{
      console.log(res)

this.departmentArr=res;
console.log(this.departmentArr)
    })
    this.authService.GetLocations().subscribe(res=>{
      console.log(res)
      this.locationArr=res;
      console.log(this.locationArr)

          })
  }
    async OnSubmit(){
      const formData = new FormData();
    formData.append('Imgs', this.fileInput.nativeElement.files[0]);
     const doctor:registerdoctor={ name: this.form.value.name, Email: this.form.value.Email,
       password: this.form.value.password,
       PhoneNumber: this.form.value.PhoneNumber,LocationDetailes: this.form.value.LocationDetailes,
       LocationId:parseFloat(this.form.value.LocationId),
      DepartmentId:parseFloat(this.form.value.DepartmentId),fees:(this.form.value.fees.toString()),OpeningTime:this.form.value.OpeningTime,
    CloseTime:this.form.value.CloseTime,Gender:this.form.value.Gender,Description:this.form.value.Description,
  Specialization:this.form.value.Specialization,Imgs:formData};
  this.IsLoading=true;
  console.log(doctor);
   this.CreateDoctorEvent=this.authService.CreatDoctor(doctor).subscribe(res=>{
    this.IsLoading=false;
  this.router.navigate(['/auth/login'])
   },err =>{
    this.IsLoading=false;
if(err.error != null){
    const errorObj = err.error.errors;
  this.errArray=[];
          for (let key in errorObj) {
           
              this.errArray.push(...errorObj[key]);
            }
          }
   } )
  }
  
   ngOnDestroy(){
    if(this.CreateDoctorEvent){
     this.CreateDoctorEvent.unsubscribe();
    }

   }
}

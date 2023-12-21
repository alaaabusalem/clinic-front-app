import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';

export interface registeruser{
 name:string;
 Email:string;
 PhoneNumber:string;
 password:string;
}

export interface Login{
   
  Email:string;
  password:string;
}
@Injectable({providedIn:'root'})
export class AuthService{
   
    constructor(private http: HttpClient) {}

    CreateUser(user:registeruser){
     return   this.http.post('https://localhost:7197/api/user/RegisterUser',user);
    }
    CreateManager(admin:registeruser){
        return   this.http.post('https://localhost:7197/api/user/RegisterAdmin',admin);

    }
     Login(login:Login){
        return   this.http.post<User>('https://localhost:7197/api/user/login',login);

     }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { BehaviorSubject, tap } from 'rxjs';

export interface registeruser {
  name: string;
  Email: string;
  PhoneNumber: string;
  password: string;
}

export interface Login {

  Email: string;
  password: string;
}
@Injectable({ providedIn: 'root' })
export class AuthService {
LoguotTime:any;
  constructor(private http: HttpClient) { }

  userEvent = new BehaviorSubject<User>(null);
  CreateUser(user: registeruser) {
    return this.http.post('https://localhost:7197/api/user/RegisterUser', user);
  }
  CreateManager(admin: registeruser) {
    return this.http.post('https://localhost:7197/api/user/RegisterAdmin', admin);

  }
  Login(login: Login) {


    return this.http.post<User>('https://localhost:7197/api/user/login', login).pipe(tap(user => {
      localStorage.setItem('user', JSON.stringify(user));
      this.AutoLogout(new Date(user.expired))

    }));


  }
  Logout() {
    this.userEvent.next(null);
    localStorage.removeItem('user');
    if(this.LoguotTime){
      clearTimeout(this.LoguotTime);
      this.LoguotTime=null;
    }

  }

  checkLogin() {

    const user: {
      name: string,
      email: string,
      _token: string,
      expired: Date,
      role: string
    }
      = JSON.parse(localStorage.getItem('user'));
 

    if (user) {
      const thisUser = new User(user.name, user.email, user._token, new Date(user.expired), user.role);

      console.log(thisUser);
    

      if (thisUser.token) {
        console.log(thisUser.token);
        this.userEvent.next(thisUser);
        this.AutoLogout(new Date(thisUser.expired));
        return true;
      }

    }

     console.log("clean");
     this.userEvent.next(null);

    localStorage.removeItem('user');
    return false;
  }



AutoLogout(date: Date){
  const currentTime = new Date();
  let time=date.getTime()-currentTime.getTime();
  this.LoguotTime=setTimeout(() => {
    this.Logout();
  }, time);
}
}
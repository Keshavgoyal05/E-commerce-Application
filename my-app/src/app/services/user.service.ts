import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {
    
  }

  baseURL = "http://localhost:8000/users";
 
  varIsLoggedIn="isLoggedIn";
  LoginUser(loginObj : any) : Observable<any> {
    var URL = this.baseURL + "/login"; 
    let header ={'content-type' : 'application/json'}; 
    return this.http.post(URL, loginObj, {'headers' : header , responseType : 'json'}) ; 
  } 
  RegisterUser (registerObj : any) : Observable<any> { 
    var URL = this.baseURL + "/register"; 
    let header ={'content-type' : 'application/json'}; 
    console.log ("Data to be inserted in the db.json : "+registerObj + JSON.stringify(registerObj)); 
    return this.http.post(URL, registerObj, {'headers' : header , responseType : 'text'}); 
  }
  SendOTP (email : any) : Observable<any> { 
    var URL = this.baseURL + "/sendOtp"; 
    let header ={'content-type' : 'application/json'}; 
    console.log ("otp to be sent on email : "+email); 
    return this.http.post(URL, email, {'headers' : header , responseType : 'text'}); 
  }
  UpdatePassword  (userObj : any) : Observable<any> { 
    var URL = this.baseURL + "/updatePassword"; 
    let header ={'content-type' : 'application/json'}; 
    console.log ("Data to be updated in the  user db : "+JSON.stringify(userObj)); 
    return this.http.put(URL, userObj, {'headers' : header , responseType : 'text'}); 
  }
  
}

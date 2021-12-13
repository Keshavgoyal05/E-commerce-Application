import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }

  baseURL = "http://localhost:8000/payment";

  stripePayment(stripeObj : any) : Observable<any> {
    var URL = this.baseURL +"/stripePayment"; 
    let header ={'content-type' : 'application/json'}; 
    // console.log ("Data to be inserted in the db.json : "+body) 
    return this.http.post(URL, stripeObj, {'headers' : header , responseType : 'json'}) ; 
  }
}

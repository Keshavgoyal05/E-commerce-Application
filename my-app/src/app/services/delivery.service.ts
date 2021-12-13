import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private http:HttpClient) { }

  baseURL = "http://localhost:8000/delivery";

  getDeliveryData(userid : any) : Observable<any> { 
    var URL = this.baseURL + "/getDeliveryData/"+userid; 
    return this.http.get(URL); 
  }
  getDeliveryDataById(userid :any, deliveryid : any) : Observable<any> { 
    var URL = this.baseURL + "/getDeliveryDataById/"+userid+"/"+deliveryid; 
    return this.http.get(URL); 
  } 
  addDeliveryAddress(deliveryObj : any) : Observable<any> {
    var URL = this.baseURL + "/insertDeliveryAddress"; 
    let header ={'content-type' : 'application/json'}; 
    // console.log ("Data to be inserted in the db.json : "+body) 
    return this.http.post(URL, deliveryObj, {'headers' : header , responseType : 'json'}) ;
  }
  editDeliveryAddress  (deliveryObj : any) : Observable<any> { 
    var URL = this.baseURL + "/updateDeliveryAddress"; 
    let header ={'content-type' : 'application/json'};  
    return this.http.put(URL, deliveryObj, {'headers' : header , responseType : 'json'}); 
  }
  deleteDeliveryAddress(userid :any, deliveryid : any) : Observable<any> {
    var URL = this.baseURL + "/deleteDeliveryAddress/"+userid+"/"+deliveryid; 
    console.log ("URL : "+URL); 
    return this.http.delete(URL, {responseType : 'json'}); 
  }
}

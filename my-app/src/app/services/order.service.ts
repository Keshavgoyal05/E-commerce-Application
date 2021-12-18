import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  baseURL = "http://localhost:8000/order";

  getAllOrders(userid : any) : Observable<any> { 
    var URL = this.baseURL + "/getAllOrders/"+userid; 
    return this.http.get(URL); 
  }
  addOrder(orderObj : any) : Observable<any> {
    var URL = this.baseURL + "/addOrder"; 
    let header ={'content-type' : 'application/json'}; 
    // console.log ("Data to be inserted in the db.json : "+body) 
    return this.http.post(URL, orderObj, {'headers' : header , responseType : 'json'}) ;
  }
  addProductOrderFromcart(productOrderObj : any) : Observable<any> {
    var URL = this.baseURL + "/addProductOrder"; 
    let header ={'content-type' : 'application/json'}; 
    // console.log ("Data to be inserted in the db.json : "+body) 
    return this.http.post(URL, productOrderObj, {'headers' : header , responseType : 'json'}) ;
  }
}

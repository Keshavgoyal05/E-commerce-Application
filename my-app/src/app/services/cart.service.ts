import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }

  baseURL = "http://localhost:8000/cart";

  

  getCart(userid :number) : Observable<any> {
    var URL = this.baseURL + "/getCarts/"+userid; 
    return this.http.get(URL);
  }

  getCartBasedonProductandUser(obj :any) : Observable<any> {
    var URL = this.baseURL + "/getCartsBasedOn_UserID_ProductID"; 
    let header ={'content-type' : 'application/json'}; 
    return this.http.post(URL,obj,{'headers' : header , responseType : 'text'});
  }
  insertData (cartObj : any) : Observable<any> {
    var URL = this.baseURL + "/insertCartItem"; 
    let header ={'content-type' : 'application/json'};  
    return this.http.post(URL, cartObj, {'headers' : header , responseType : 'text'}) ; 
  }
  
  deleteRecord(cartid : any) : Observable<any> {
    let URL = this.baseURL + "/deleteCartItem/"+cartid; 
    console.log ("URL : "+URL); 
    return this.http.delete(URL, {responseType : 'text'}); 
  }

  editData (cartObj : any) : Observable<any> { 
    var URL = this.baseURL + "/updateCartItem"; 
    let header ={'content-type' : 'application/json'}; 
    // console.log ("Data to be inserted in the db.json : "+body) 
    return this.http.put(URL, cartObj, {'headers' : header , responseType : 'text'}); 
  }
  emptyCart(userid : any) : Observable<any> {
    let URL = this.baseURL + "/emptyCart/"+userid; 
    console.log ("URL : "+URL); 
    return this.http.delete(URL, {responseType : 'json'}); 
  }
  
}

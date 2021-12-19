import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  baseURL = "http://localhost:8000/products";

  
  insertMockData () : Observable<any> {
    var URL = this.baseURL + "/addMockProducts"; 
    let header ={'content-type' : 'application/json'}; 
    // console.log ("Data to be inserted in the db.json : "+body) 
    return this.http.post(URL, {'headers' : header , responseType : 'json'}) ; 
  } 
  
  getData() : Observable<any> { 
    var URL = this.baseURL + "/getAllProducts"; 
    return this.http.get(URL); 
  } 
  
  insertData (productObj : any) : Observable<any> {
    var URL = this.baseURL + "/insertProduct"; 
    let header ={'content-type' : 'application/json'}; 
    // console.log ("Data to be inserted in the db.json : "+body) 
    return this.http.post(URL, productObj, {'headers' : header , responseType : 'text'}) ; 
  } 
  editData (userObj : any) : Observable<any> { 
    var URL = this.baseURL + "/updateProduct"; 
    let header ={'content-type' : 'application/json'}; 
    // console.log ("Data to be inserted in the db.json : "+body) 
    return this.http.put(URL, userObj, {'headers' : header , responseType : 'text'}); 
  } 
  deleteRecord(id : number) : Observable<any> {
    let URL = this.baseURL + "/deleteProduct/"+id; 
    console.log ("URL : "+URL); 
    return this.http.delete(URL, {responseType : 'text'}); 
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  baseURL = "http://localhost:8000/admin";
  getData() : Observable<any> { 
    var URL = this.baseURL + "/getAllUsers"; 
    return this.http.get(URL); 
  } 
  
  insertData (userObj : any) : Observable<any> {
    var URL = this.baseURL + "/insertUser"; 
    let header ={'content-type' : 'application/json'}; 
    // console.log ("Data to be inserted in the db.json : "+body) 
    return this.http.post(URL, userObj, {'headers' : header , responseType : 'text'}) ; 
  } 
  editData (userObj : any) : Observable<any> { 
    var URL = this.baseURL + "/updateUser"; 
    let header ={'content-type' : 'application/json'}; 
    // console.log ("Data to be inserted in the db.json : "+body) 
    return this.http.put(URL, userObj, {'headers' : header , responseType : 'text'}); 
  } 
  deleteRecord(id : number) : Observable<any> {
    let URL = this.baseURL + "/deleteUser/"+id; 
    console.log ("URL : "+URL); 
    return this.http.delete(URL, {responseType : 'text'}); 
  }
}

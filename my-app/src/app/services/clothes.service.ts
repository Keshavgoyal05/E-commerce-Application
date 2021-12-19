import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClothesService {
  
  constructor(private http:HttpClient) { }

  baseURL = "http://localhost:8000/clothes";

  getClothesData() : Observable<any> { 
    var URL = this.baseURL + "/getAllClothes"; 
    return this.http.get(URL); 
  }
  
}

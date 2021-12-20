import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }
  cart:any[]=[]
  private data = new BehaviorSubject(this.cart);
  data$ = this.data.asObservable();
  
  baseURL = "http://localhost:8000/cart";

  getCart(userid :any,auth_token : any){
    console.log(this.cart)
    let header = { 'Content-Type' : 'application/json', 'Authorization' : `Bearer ${auth_token}` };
    this.http.get<any[]>(this.baseURL+ "/getCarts/"+userid,{ 'headers' : header})
    .subscribe(data=>{
      var data1=[]
      console.log(data)
      for(var i=0;i<data.length;i++){
        var obj = {
          cart_id:data[i].cart_id,
          user_id:data[i].user_id,
          product_id:data[i].product_id,
          product_name:data[i].product_name,
          product_category:data[i].product_category,
          product_subcategory:data[i].product_subcategory,
          image:data[i].image,
          price:data[i].price,
          discount:data[i].discount,
          quantity:data[i].quantity,
        }
        data1.push(obj);
      }
      
      console.log(this.data$);
      this.data.next([...data1])
    })
     return this.http.get<any[]>(this.baseURL+ "/getCarts/"+userid,{ 'headers' : header});
  }

  Add_Cart(cartObj : any){
    console.log(cartObj)
    var new_cart_obj = {
      cart_id:cartObj.cart_id,
      user_id:cartObj.user_id,
      product_id:cartObj.product_id,
      product_name:cartObj.product_name,
      product_category:cartObj.product_category,
      product_subcategory:cartObj.product_subcategory,
      image:cartObj.image,
      price:cartObj.price,
      discount:cartObj.discount,
      quantity:cartObj.quantity,
    }
    this.data.next([...this.data.getValue(),new_cart_obj]);
  }

  update_Cart(cartObj: any){
    for (let i =0 ; i<this.data.getValue().length;i++){
      if(cartObj.cart_id==this.data.getValue()[i].cart_id && cartObj.user_id==this.data.getValue()[i].user_id){
        var temp_data = this.data.getValue()[i];
        temp_data.quantity=cartObj.quantity;
        this.cart[i]=temp_data;
        this.data.next([...this.cart])
        console.log(this.data)
        break;
      }
    }
  }

  Delete(id:number){
    let arr = this.data.getValue()
    let index=0
    for (let i =0;i<arr.length;i++){
      if(arr[i].cart_id==id){
        index=i;
        break
      }
    }
    arr.splice(index,1);
    this.data.next(arr);
  }

  emptyCart1() {
    this.data.next([])
    this.cart=[] 
  }


  // getCart(userid :number) : Observable<any> {
  //   var URL = this.baseURL + "/getCarts/"+userid; 
  //   return this.http.get(URL);
  // }


  getCartBasedonProductandUser(obj :any) : Observable<any> {
    var URL = this.baseURL + "/getCartsBasedOn_UserID_ProductID"; 
    let header ={'content-type' : 'application/json'}; 
    return this.http.post(URL,obj,{'headers' : header , responseType : 'text'});
  }
  insertData (cartObj : any,auth_token : String) : Observable<any> {
    this.Add_Cart(cartObj)
    var URL = this.baseURL + "/insertCartItem"; 
    let header ={'content-type' : 'application/json', 'Authorization' : `Bearer ${auth_token}`};  
    return this.http.post(URL, cartObj, {'headers' : header , responseType : 'text'}) ; 
  }
  
  deleteRecord(cartid : any,auth_token : any) : Observable<any> {
    this.Delete(cartid);
    let URL = this.baseURL + "/deleteCartItem/"+cartid; 
    console.log ("URL : "+URL); 
    let header ={'content-type' : 'application/json', 'Authorization' : `Bearer ${auth_token}`};
    return this.http.delete(URL, {'headers' : header ,responseType : 'text'}); 
  }

  editData (cartObj : any,auth_token : any) : Observable<any> { 
    this.update_Cart(cartObj);
    var URL = this.baseURL + "/updateCartItem"; 
    let header ={'content-type' : 'application/json', 'Authorization' : `Bearer ${auth_token}`}; 
    return this.http.put(URL, cartObj, {'headers' : header , responseType : 'text'}); 
  }
  emptyCart(userid : any,auth_token : any) : Observable<any> {
    this.emptyCart1();
    let URL = this.baseURL + "/emptyCart/"+userid; 
    console.log ("URL : "+URL); let header ={'content-type' : 'application/json', 'Authorization' : `Bearer ${auth_token}`};
    return this.http.delete(URL, {'headers' : header ,responseType : 'json'});
  }
  
}

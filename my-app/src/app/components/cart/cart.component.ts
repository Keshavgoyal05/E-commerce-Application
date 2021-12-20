import { Component, OnInit } from '@angular/core';
import { CartFilterPipe } from 'src/app/pipes/cart-filter.pipe';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  userid :any;
  constructor(private cartService : CartService, private cartFilter : CartFilterPipe) {
    this.userid =localStorage.getItem('userid');
  }

  ngOnInit(): void {
    console.log(this.userid);
    
    this.readCartData();
    
    console.log("cart length : " + this.arrCart.length);
    
  }
  totalCartItem : number = 0;
  coupon_code : any;
  arrCart : any[]=[]; 
  totalPrice : number = 0;
  discount : number = 0;
  delivery : number = 40;
  readCartData() 
  { 
    // this.cartService.getCart(this.userid);
    // this.cartService.data$.subscribe((res) => this.arrCart = res)
    
    this.cartService.getCart(this.userid,localStorage.getItem("auth_token")).subscribe
    ( 
      (data) => 
      { 
        this.arrCart = data;
        this.totalCartItem=this.arrCart.length;
        localStorage.setItem("totalCartItem",String(this.totalCartItem));
        this.totalPrice = this.cartFilter.transform(this.arrCart)+this.delivery;
         
      }, 
      (error) => {
        alert(error.error);
        console.log (""+error);
      }
    );
  }
  deleteCartRecord(cart_id:any) 
  { 
    this.cartService.deleteRecord(cart_id,localStorage.getItem("auth_token")).subscribe 
    ( 
      (data) => 
      {
        alert("product removed"); 
        this.readCartData(); 
      }, 
      (error) => {
        alert(error.error);
        console.log ("Unabled to delete record because " + error) ;
      }
      
    );
  }
  
  applyCoupon(){
    if(this.coupon_code=="MTX"){
      alert("volla, 10% off has been applied");
      this.discount=this.totalPrice*0.10;
      this.totalPrice= this.totalPrice - this.discount + this.delivery;
    }
    else{
      alert("Invalid coupon");
    }
    
  }
  
}

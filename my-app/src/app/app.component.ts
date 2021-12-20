import { Component } from '@angular/core';
import { CartService } from './services/cart.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  login : any = false;
  totalCartItem : any ;
  userid: any;
  username1 :any;
  auth_token : any;

  constructor(private userService : UserService, private cartService : CartService){
    this.userid =localStorage.getItem('userid');
    this.username1 =localStorage.getItem('username');
    this.auth_token = localStorage.getItem("auth_token");
    this.cartService.data$.subscribe((res)=>{this.totalCartItem=res.length});
  }
  
  
  ngOnInit(){
    //this.totalCartItem = localStorage.getItem("totalCartItem");
    this.readCartData();
    
  }

  readCartData() 
  { 
    this.cartService.getCart(this.userid,this.auth_token).subscribe
    ( 
      (data) => 
      { 
        this.totalCartItem=data.length;  
      }, 
      (error) => console.log (error)
    );
  }
  logout(){
    localStorage.setItem (this.userService.varIsLoggedIn, 'false') ;
    if(localStorage.getItem (this.userService.varIsLoggedIn)=='false'){
      this.login=false;
      localStorage.removeItem('username');
      localStorage.removeItem('totalCartItem');
      localStorage.removeItem("auth_token");
      localStorage.removeItem("userid");
    }

  }

  ngDoCheck(){
    if(localStorage.getItem(this.userService.varIsLoggedIn)=='true'){
      this.login=true;
    this.username1 =localStorage.getItem('username');
    }
  }
}

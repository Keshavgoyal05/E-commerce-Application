import { Component } from '@angular/core';
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

  constructor(private user : UserService){
    this.username1 =localStorage.getItem('username');

  }
  username1 :any;
  ngOnInit(){
    this.totalCartItem = localStorage.getItem("totalCartItem");
    //this.username1 =localStorage.getItem('username'); 
  }

  logout(){
    localStorage.setItem (this.user.varIsLoggedIn, 'false') ;
    this.login=false;
    localStorage.removeItem('username');
    localStorage.removeItem('totalCartItem');
  }

  ngDoCheck(){
    if(localStorage.getItem(this.user.varIsLoggedIn)=='true'){
      this.login=true;
    this.username1 =localStorage.getItem('username');
    }
  }
}

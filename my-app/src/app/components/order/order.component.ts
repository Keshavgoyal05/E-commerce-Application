import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  
  userid :any;
  username: string | null;
  orderFilterCreteria :string ="All";
  constructor(private orderService : OrderService) {
    this.userid =localStorage.getItem('userid');
    this.username = localStorage.getItem('username');
   }

  ngOnInit(): void {
    this.readOrderData();
  }

  order_column=["order_id", "purchase_date", "delivery_address", "payment_status", "phone", "order_status", "product_id", "quantity", "price"];
  arrOrders : any[]=[]; 
  readOrderData() 
  { 
    this.orderService.getAllOrders(this.userid).subscribe
    ( 
      (data) => 
      { 
        this.arrOrders = data; 
      }, 
      (error) => 
      {
        alert("unable to fetch orders" + JSON.stringify(error));
        console.log (error);
      }
    );
  }

}

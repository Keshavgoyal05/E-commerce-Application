import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StripeService } from "ngx-stripe";
import { PaymentService } from 'src/app/services/payment.service';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { DeliveryService } from 'src/app/services/delivery.service';
import { OrderService } from 'src/app/services/order.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private fb : FormBuilder, private stripeService : StripeService, private paymentService : PaymentService, private deliveryService : DeliveryService, private orderService : OrderService, private cartService : CartService) { 
    this.userid =localStorage.getItem('userid');
    
  }
  
  radioValue : any;
  deliveryData : any[]=[]; 
  disableAddressInput : any = false;
  showupdate : any =false;
  elements : any; 
  card : any; 
  paymentStatus : any; 
  stripeData : any; 
  submitted : any; 
  loading: any; 
  elementsOptions : StripeElementsOptions = { 
    locale : 'en' 
  }; 

  stripeForm : FormGroup = new FormGroup({
    name : new FormControl(''),
    amount: new FormControl('')
  });

  deliveryForm : FormGroup = new FormGroup({
    name : new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    zip: new FormControl('')
  }); 

  
  userid :any;
  ngOnInit() {
    this.deliveryForm = this.fb.group({ 
      name : ['', Validators.required],
      phone : ['',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      address : ['', [Validators.required]], 
      city : ['',[Validators.required]],
      state : ['',Validators.required],
      zip : ['', [Validators.required,Validators.pattern("^[1-9][0-9]{5}$")]]
    });
    this.readDeliveryData();
    this.readCartData();
    this. loading = false; 
    this.createForm(); 
    
    this.stripeService.elements(this.elementsOptions).subscribe (elements => { 
      this.elements = elements; 
      if (!this.card) { 
        this.card = this.elements.create('card', { 
          iconStyle : 'solid', 
          style : { 
            base : { 
              iconcolor : '#666EE8', 
              color : '#31325F', 
              lineHeight : '40px', 
              fontWeight : 300, 
              fontFamily : '"Helvetica Neue", Helvetica, sans-serif', 
              fontSize : '18px', 
              '::placeholder' : { 
                color : '#CFD7EO' 
              } 
            } 
          }, 
        }); 
        this.card.mount('#card-element'); 
      } 
    }); 
  }

  get g(): { [key: string]: AbstractControl } {
    console.log(this.deliveryForm.controls);
    return this.deliveryForm.controls;
  }

  createForm() { 
    this.stripeForm = this.fb.group({ 
      name : ['', [Validators.required]], 
      amount : ['', [Validators.required]] 
    }); 
  }
  get f(): { [key: string]: AbstractControl } {
    return this.stripeForm.controls;
  }

  buy () { 
    this. loading = true; 
    this.stripeData = this.stripeForm.value;
    if(this.radioValue==-1 || this.radioValue==0 || this.radioValue==undefined){
      alert("Fill Delivery Address first");
      return;
    }
    this.submitted = true;
    if(this.stripeForm.invalid){
      alert("fill all details pls");
      return;
    }
    else{
      this.stripeService.createToken(this.card,  { name :this.stripeData.name } ).subscribe (result => { 
        console.log("token : "+result.token);
        if (result.token) { 
          this.stripeData['token']=result.token;
          this.paymentService.stripePayment(this.stripeData).subscribe((res)=>{ 
            //JSON.parse(res);
            if(res['success']){ 
              this. loading = false; 
              this. submitted = false; 
              this.paymentStatus = true;
              alert(res['msg']);
              this.addOrder();
            } 
            else{ 
              this. loading = false; 
              this. submitted = false; 
              this.paymentStatus = false;
              alert(this.paymentStatus+res['msg']); 
            } 
          }) 
        } 
        else if (result.error) { 
          alert(result.error.message);
        } 
      });
    }
  }

  
  readDeliveryData() 
  { 
    this.deliveryService.getDeliveryData(this.userid).subscribe
    ( 
      (data) => 
      {
        this.deliveryData = data; 
      }, 
      (error) => console.log (error)
    );
  }
  onSaveAddress(x:any){
    if(x==-1 || this.radioValue==-1 || this.radioValue==0){
      this.deliveryForm.reset();
      this.showupdate = false;
      this.disableAddressInput = false;
    }
  }

  delivery_id : any;
  saveAddress(){
    this.submitted=true;
    if(this.deliveryForm.invalid){
      alert("fill all details pls");
      return;
    }
    else{
      let deliveryAddress = {
        "user_id" : this.userid,
        "name" : this.deliveryForm.value.name,
        "phone" : this.deliveryForm.value.phone,
        "address" : this.deliveryForm.value.address,
        "city" : this.deliveryForm.value.city,
        "state" : this.deliveryForm.value.state,
        "zip" : this.deliveryForm.value.zip
      }
      this.deliveryService.addDeliveryAddress(deliveryAddress).subscribe 
      ( 
        (data) => 
        { 
          alert(data.message);
          if(this.radioValue==-1)
            this.delivery_id = data.delivery_data.delivery_id;
          
          this.submitted=false;
          this.radioValue=0;
          this.readDeliveryData();
        }, 
        (error) =>
        {
          console.log("Unabled to add delivery address to DB because" + error.getMessage);
          alert("Some Issue with adding delivery address");
        } 
      );      
      
    }
  }
  deliver_id_for_edit : any;
  onEditAddress(){
    if(this.radioValue==-1 || this.radioValue==0 ||  this.radioValue==undefined)
      return;
    let delivery_id= this.radioValue;
    this.deliver_id_for_edit =delivery_id;
    this.deliveryService.getDeliveryDataById(this.userid,delivery_id).subscribe
    ( 
      (data) => 
      {
        delete data[0].delivery_id;
        delete data[0].user_id;
        this.deliveryForm.setValue(data[0]);
        this.radioValue=-1;
        this.showupdate=true;
        this.disableAddressInput = true;
      },
      (error) =>
      {
        alert("some error in fetching deliver data");
        console.log (error);
      } 
    );
    
  }

  editDeliveryAddress(){
    this.submitted=true;
    if(this.deliveryForm.invalid){
      alert("fill all details pls");
      return;
    }
    else{
      let deliveryAddress = {
        "delivery_id" : this.deliver_id_for_edit,
        "user_id" : this.userid,
        "name" : this.deliveryForm.value.name,
        "phone" : this.deliveryForm.value.phone,
        "address" : this.deliveryForm.value.address,
        "city" : this.deliveryForm.value.city,
        "state" : this.deliveryForm.value.state,
        "zip" : this.deliveryForm.value.zip
      }
      this.deliveryService.editDeliveryAddress(deliveryAddress).subscribe 
      ( 
        (data) => 
        { 
          alert(data.message);
          this.radioValue=0;
          this.readDeliveryData();
            
        }, 
        (error) =>
        {
          console.log("Unabled to update delivery address to DB because" + error.getMessage);
          alert("Some Issue with updating delivery address");
        } 
      );  
      this.submitted=false; 
    }
  }

  cancel(){
    this.radioValue=0;
    return ;
  }

  deleteDeliverAddress(delivery_id : any){
    this.deliveryService.deleteDeliveryAddress(this.userid,delivery_id).subscribe
    ( 
      (data) => 
      { 
        alert(data.message); 
        this.readDeliveryData(); 
      }, 
      (error) => console.log ("Unabled to delete delivery because " + error.getMessage) 
    );
  }

  close(){
    this.submitted = false;
    this.deliveryForm.reset();
  }

  arrCart : any[]=[];
  totalCartItem:any;
  readCartData() 
  { 
    // this.cartService.getCart(this.userid);
    // this.cartService.data$.subscribe((res) => this.arrCart = res)
    
    this.cartService.getCart(this.userid,String(localStorage.getItem("auth_token"))).subscribe
    ( 
      (data) => 
      { 
        this.arrCart = data;
        this.totalCartItem=this.arrCart.length; 
      }, 
      (error) => console.log (error)
    );
  }

  addOrder(){
    this.deliveryService.getDeliveryDataById(this.userid,this.radioValue).subscribe
    ( 
      (data) => 
      {
        let delivery_address = `${data[0].name}, ${data[0].address}, ${data[0].city}, ${data[0].state}, ${data[0].zip}`;
        let order = {
          "user_id" : this.userid,
          "purchase_date" : new Date().toISOString().slice(0, 10),
          "delivery_address" : delivery_address,
          "payment_status" : "success",
          "phone" : data[0].phone
        }
        this.orderService.addOrder(order).subscribe 
        ( 
          (data) => 
          { 
            console.log("order added successfully");
            alert(data.message);
            let order_id= data.order_id;
            let productOrder: { user_id: any; order_id: any; order_status: any, product_id: any; quantity: any; price: number; }[] =[];
            this.arrCart.forEach((item,index)=>{
                productOrder.push(
                  {
                    "user_id" : this.userid,
                    "order_id" : order_id,
                    "order_status" : "ordered",
                    "product_id" : item.product_id,
                    "quantity" : item.quantity,
                    "price" : item.price * item.quantity
                  }
                );
            })
            this.orderService.addProductOrderFromcart(productOrder).subscribe 
            ( 
              (data) => 
              { 
                console.log("all cart products added to productOrder Table successfully");
                alert(data.message);
                this.cartService.emptyCart(this.userid,String(localStorage.getItem("auth_token"))).subscribe 
                ( 
                  (data) => 
                  { 
                    alert(data.message); 
                  }, 
                  (error) => 
                  {
                    console.log ("Unabled to empty cart because " + error.getMessage);
                    alert("unable to empty cart");
                  } 
                );
              }, 
              (error) =>
              {
                console.log("Unabled to add cart products to productOrder Table : " + error.error.message);
                alert("Unabled to add cart products to productOrder Table : " + error.error.message);
              } 
            );
          }, 
          (error) =>
          {
            console.log("Unabled to add order to DB because" + error.error.message);
            alert("post order failed : "+error.error.message);
          } 
        );
      },
      (error) =>
      {
        alert("some error in fetching delivery data");
        console.log (error);
      } 
    );
  }
  

}


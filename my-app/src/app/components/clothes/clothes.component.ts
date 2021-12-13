import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ClothesService } from 'src/app/services/clothes.service';

@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.css']
})
export class ClothesComponent implements OnInit {

  constructor(private clothes : ClothesService,private cartService : CartService) { 
    this.userid =localStorage.getItem('userid');
  }
  userid :any;
  cartid:any;

  ngOnInit(): void {
    this.getAllProducts();
  }

  category="clothes";
  arrProducts : any = [];
  subcategory : any =[]; 
  priceRange : number = 10000;
  selectedSubCategory : string ="select";
  apply : boolean = false;
  radioSelected:any = "";

  getAllProducts() { 
    this.clothes.getData().subscribe
    ( 
      (data) => 
      { 
        this.arrProducts = data;
        for(var item of this.arrProducts){
          if(item.category==this.category)
            this.subcategory.push(item.subcategory);
        }
        this.subcategory = this.subcategory.filter((x:any, i:any, a:any) => a.indexOf(x) === i)  
      }, 
      (error) => console.log (error)
    ); 
  }
  
  applyFilter(){
    this.apply = true;
  }
  clearFilter(){
    this.apply = false;
    this.selectedSubCategory="select";
    this.priceRange=10000;
    this.radioSelected="";
  }

  addItemToCart(product: any): void{
    var obj={
      "product_id" : product.product_id,
      "user_id" : this.userid
    };
    //alert(JSON.stringify(obj));
    this.cartService.getCartBasedonProductandUser(obj).subscribe
    ( 
      (data) => 
      {
        //alert(data);
        console.log("cart based on product"+data);
        data= JSON.parse(data);
        if(data.length>0){
          let cart = {
            cart_id: data[0].cart_id,
            user_id: this.userid,
            quantity: data[0].quantity + 1
          };
          this.editCartRecord(cart);
        }
        else{
          let cart = {
            user_id: this.userid,
            product_id: product.product_id,
            product_name: product.name,
            product_category: product.category,
            product_subcategory: product.subcategory,
            image: product.image,
            price: product.price,
            discount: product.discount,
            quantity: 1
          };
          this.insertDataToCart(cart); 
        }
      }, 
      (error) => console.log (error)
    );
  }

  insertDataToCart(cart :any){
    this.cartService.insertData(cart).subscribe 
    ( 
      (data) => 
      { 
        console.log("Inserted data is "+data);
        alert("Item added to Cart successfully");  
      }, 
      (error) => console.log("Unabled to insert record because" + error.getMessage)
    );
  }

  editCartRecord(cart :any){
    this.cartService.editData(cart).subscribe 
    ( 
      (data) => 
      { 
        console.log("Edited data is "+data);
        alert("Item updated to Cart successfully");
      }, 
      (error) => console.log("Unabled to update record because" + error.getMessage)
    ); 

  }
  

}

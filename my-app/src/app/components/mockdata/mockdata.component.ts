import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-mockdata',
  templateUrl: './mockdata.component.html',
  styleUrls: ['./mockdata.component.css']
})
export class MockdataComponent implements OnInit {

  constructor(private productService : ProductService) { }

  ngOnInit(): void {
  }

  addMockProductData(){
    this.productService.insertMockData().subscribe 
    ( 
      (data) => 
      { 
        alert(data.message);
      }, 
      (error) => {
        alert(error.error.message);
        console.log("Unabled to insert user record because" + error.getMessage())
      }
    );
  }

}

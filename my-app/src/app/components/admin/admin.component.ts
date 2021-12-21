import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import Validation from 'src/app/Validations/validation';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private userService : UserService,private formbuilber : FormBuilder, private productService : ProductService) { }

  form ! : FormGroup;
  productForm ! : FormGroup;
  submitted = false;
  isLogin : boolean = false;
  ngOnInit(): void {
    this.form = this.formbuilber.group({
      user_id: ['',], 
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      email : ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]], 
      phone : ['',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      whatsappNo : ['',Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      password : ['', [Validators.required]],
      confirmPassword : ['',Validators.required]
    },
    {
      validators: [Validation.checkPassword('password'),Validation.matchPassword('password','confirmPassword')]
    });

    this.productForm = this.formbuilber.group({
      product_id : ['',],
      image : ['', Validators.required],
      category : ['', Validators.required],
      subcategory : ['', [Validators.required]], 
      name : ['',[Validators.required]],
      rating : ['',],
      description : ['',],
      available : ['',],
      condition : ['',],
      color : ['',],
      price : ['',Validators.required],
      discount : ['',]
    });
    localStorage.setItem (this.userService.varIsLoggedIn, 'false') ;
    this.readUserData();
    this.readProductData();
  }
  get f(): { [key: string]: AbstractControl } {
    console.log(this.form.controls);
    return this.form.controls;
  }
  get g(): { [key: string]: AbstractControl } {
    console.log(this.productForm.controls);
    return this.productForm.controls;
  }

  login(username : string,password : string){
      if(username=="admin" && password=="imadmin"){
        alert("welcome admin");
        this.isLogin=true;
      }
      else{
        alert("try again");
        this.isLogin=false;
      }
        

  }
  

  user_column=["StudentID", "First Name", "Last Name", "Email", "Phone No.",'Whatsapp No.','Action'];
  arrUser : any[]=[]; 
  readUserData() 
  { 
    this.userService.getData().subscribe
    ( 
      (data) => 
      { 
        this.arrUser = data.sort((a: { user_id: any; }, b: { user_id: any; }) => (a.user_id) - (b.user_id));; 
      }, 
      (error) => console.log (error)
    );
  }

  product_column=["PID", "image", "category", "subcategory", "name", "rating",'description','available','condition','color','price','discount','Action'];
  arrProduct : any[]=[]; 
  readProductData() 
  { 
    this.productService.getData().subscribe
    ( 
      (data) => 
      { 
        this.arrProduct = data.sort((a: { product_id: any; }, b: { product_id: any; }) => (a.product_id) - (b.product_id));
      }, 
      (error) => console.log (error)
    );
  }
  showAdd !: boolean;
  showUpdate !: boolean;
  clickAddButton(){
    this.close();
    this.showAdd=true;
    this.showUpdate=false;
  }
  insertUserRecord()
  { 
    
    this.submitted = true;
    if(this.form.invalid){
      alert("fill all details pls");
      return;
    }
    else{
      let userObj = {
        "user_id" : this.form.value.user_id,
        "firstName" : this.form.value.firstName,
        "lastName" : this.form.value.lastName,
        "email" : this.form.value.email,
        "phone" : this.form.value.phone,
        "whatsappNo" : this.form.value.whatsappNo,
        "password" : this.form.value.password
      }
      this.userService.RegisterUser(userObj).subscribe 
      ( 
        (data) => 
        { 
          console.log("Inserted data is "+data);
          alert(data.message); 
          this.readUserData(); 
          this.close();
        }, 
        (error) => {
          alert(JSON.parse(error));
          console.log("Unabled to insert user record because" + error.getMessage)
        }
      );
    } 
  } 
  deleteUserRecord(id:number) 
  { 
    this.userService.deleteRecord(id).subscribe 
    ( 
      (data) => 
      { 
        alert(data); 
        this.readUserData(); 
      }, 
      (error) => 
      {
        alert(error.error);
        console.log ("Unabled to delete record because " + error.getMessage);
      } 
    );
  }
  onEditUserRecord(row:any){
    this.close();
    this.showAdd=false;
    this.showUpdate=true;
    this.form.controls['user_id'].setValue(row.user_id); 
    this.form.controls['firstName'].setValue(row.firstName);
    this.form.controls['lastName'].setValue(row.lastName);
    this.form.controls['email'].setValue(row.email);
    this.form.controls['phone'].setValue(row.phone); 
    this.form.controls['whatsappNo'].setValue(row.whatsappNo);
    //this.form.controls['password'].setValue(row.password);
  }
  editUserRecord()
  {
    this.submitted = true;
    if(this.form.controls['user_id'].invalid || this.form.controls['firstName'].invalid || 
      this.form.controls['lastName'].invalid || this.form.controls['email'].invalid || 
      this.form.controls['phone'].invalid || this.form.controls['whatsappNo'].invalid )
    {
      alert("fill all details pls");
      return;
    }
    else{
      let studentobj = {
        "user_id" : this.form.value.user_id,
        "firstName" : this.form.value.firstName,
        "lastName" : this.form.value.lastName,
        "email" : this.form.value.email,
        "phone" : this.form.value.phone,
        "whatsappNo" : this.form.value.whatsappNo,
        "password" : null
      }
      this.userService.editData(studentobj).subscribe 
      ( 
        (data) => 
        { 
          alert(data);
          console.log("Edited data is "+data); 
          this.readUserData(); 
          this.close();
        }, 
        (error) => {
          alert(JSON.parse(error));
          console.log("Unabled to insert record because" + error.getMessage)
        }
      ); 
    }
    
  }

  close(){
    this.submitted = false;
    this.form.reset();
    this.productForm.reset();
  }

  searchById = '';
  searchByName = '';
  clear(){
    this.searchById = '';
    this.searchByName = '';
  }

  insertProductRecord()
  { 
    this.submitted = true;
    if(this.productForm.invalid){
      alert("fill all details pls");
      return;
    }
    else{
      let productObj = {
        "image" : this.productForm.value.image,
        "category" : this.productForm.value.category,
        "subcategory" : this.productForm.value.subcategory,
        "name" : this.productForm.value.name,
        "rating" : this.productForm.value.rating,
        "description" : this.productForm.value.description,
        "available" : this.productForm.value.available,
        "condition" : this.productForm.value.condition,
        "color" : this.productForm.value.color,
        "price" : parseInt(this.productForm.value.price),
        "discount" : parseInt(this.productForm.value.discount)
      }
      this.productService.insertData(productObj).subscribe 
      ( 
        (data) => 
        { 
          console.log("Inserted data is "+data);
          alert(data); 
          this.readProductData(); 
          this.close();
        }, 
        (error) => {
          alert(JSON.parse(error));
          console.log("Unabled to insert product record because " + error.getMessage)
        }
      );
    } 
  } 
  deleteProductRecord(id:number) 
  { 
    this.productService.deleteRecord(id).subscribe 
    ( 
      (data) => 
      { 
        alert(data); 
        this.readProductData(); 
      }, 
      (error) => 
      {
        alert(error.error);
        console.log ("Unabled to delete product because " + error.getMessage) ;
      }
    );
  }
  onEditProductRecord(row:any){
    this.close();
    this.showAdd=false;
    this.showUpdate=true;
    this.productForm.setValue(row);
  }
  editProductRecord()
  {
    this.submitted = true;
    if(this.productForm.invalid){
      alert("fill all details pls");
      return;
    }
    else{
      this.productService.editData(this.productForm.value).subscribe 
      ( 
        (data) => 
        { 
          alert(data); 
          this.readProductData(); 
          this.close();
        }, 
        (error) => {
          alert(error.message);
          console.log("Unabled to insert record because" + error.getMessage)
        }
      ); 
    }
    
  }

}

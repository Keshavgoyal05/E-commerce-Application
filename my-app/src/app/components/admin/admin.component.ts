import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import Validation from 'src/app/Validations/validation';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private user : AdminService,private formbuilber : FormBuilder) { }

  form ! : FormGroup;
  submitted = false;
  ngOnInit(): void {
    this.form = this.formbuilber.group({
      user_id: ['',], 
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      email : ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]], 
      phone : ['',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      whatsappNo : ['',Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
      password : ['', [Validators.required,Validators.maxLength(20)]],
      confirmPassword : ['',Validators.required]
    },
    {
      validators: [Validation.checkPassword('password'),Validation.matchPassword('password','confirmPassword')]
    });
    this.readUserData();
  }
  get f(): { [key: string]: AbstractControl } {
    console.log(this.form.controls);
    return this.form.controls;
  }
  

  user_column=["StudentID", "First Name", "Last Name", "Email", "Phone No.",'Whatsapp No.','Password'];
  arrUser : any[]=[]; 
  readUserData() 
  { 
    this.user.getData().subscribe
    ( 
      (data) => 
      { 
        this.arrUser = data; 
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
      this.user.insertData(userObj).subscribe 
      ( 
        (data) => 
        { 
          console.log("Inserted data is "+data);
          alert(data); 
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
  deleteUserRecord(id:number) 
  { 
    this.user.deleteRecord(id).subscribe 
    ( 
      (data) => 
      { 
        alert(data); 
        this.readUserData(); 
      }, 
      (error) => console.log ("Unabled to delete record because " + error.getMessage) 
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
    this.form.controls['password'].setValue(row.password);
  }
  editUserRecord()
  {
    this.submitted = true;
    if(this.form.invalid){
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
        "password" : this.form.value.password
      }
      this.user.editData(studentobj).subscribe 
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
  }

  searchById = '';
  searchByName = '';
  clear(){
    this.searchById = '';
    this.searchByName = '';
  }

}

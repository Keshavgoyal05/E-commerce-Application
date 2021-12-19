import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import Validation from 'src/app/Validations/validation';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private formbuilber : FormBuilder, private user : UserService, private router : Router, private cartService : CartService) { }

  
  form : FormGroup = new FormGroup({
    user_id : new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    whatsappNo: new FormControl(''),
    password: new FormControl(''),
    confirmPassword : new FormControl('')
  }); 
  forgotPasswordForm : FormGroup = new FormGroup({
    email : new FormControl(''),
    otp : new FormControl(''),
    password : new FormControl(''),
    confirmPassword : new FormControl('')
  });
  submitted = false;
  showSend : boolean = true;
  showSave !: boolean;
  showOtp !: boolean;
  otp : any;
  email : any;

  ngOnInit(){ 
    this.form = this.formbuilber.group({ 
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
    this.forgotPasswordForm = this.formbuilber.group({
      email : ['', [Validators.required,Validators.email]], 
      otp : ['', Validators.required],
      password : ['',Validators.required],
      confirmPassword : ['',Validators.required]
    },
    {
      validators: [Validation.checkPassword('password'),Validation.matchPassword('password','confirmPassword')]
    });     
  }

  get f(): { [key: string]: AbstractControl } {
    console.log(this.form.controls);
    return this.form.controls;
  }
  get g(): { [key: string]: AbstractControl } {
    console.log(this.forgotPasswordForm.controls);
    return this.forgotPasswordForm.controls;
  }
  
  login(){
    this.submitted = true;
    let email =this.form.value.email;
    let password=this.form.value.password;
    var userObj = {
      "email" : email,
      "password" : password
    }
    if(this.form.controls['email'].invalid || this.form.controls['password'].invalid){
      //alert("Pls provide Email id & Password");
      return;
    }
    else{
      this.user.LoginUser(userObj).subscribe 
      ( 
        (data) => 
        {
          //data = JSON.parse(data);
          alert(data.message);
          console.log("token : "+data.token)
          if(data.login==true){
            console.log("login : success");
            localStorage.setItem (this.user.varIsLoggedIn, 'true') ;
            localStorage.setItem("username",data.username);
            localStorage.setItem("userid",data.userid);
            this.cartService.getCart(data.userid).subscribe
            ( 
              (data) => 
              { 
                console.log("data received");
              }, 
              (error) => console.log (error)
            );
            this.close();
            this.router.navigate(['/home']);
          }
          this.close();
        }, 
        (error) => 
        {
          alert(error.error.message);
          console.log("Login failed" + error.getMessage);
        }
      );
    }
  }

  register(){
    this.submitted = true;
    if(this.form.invalid){
      alert("fill all details pls");
      return;
    }
    else{
      let register = {
        "user_id" : this.form.value.user_id,
        "firstName" : this.form.value.firstName,
        "lastName" : this.form.value.lastName,
        "email" : this.form.value.email,
        "phone" : this.form.value.phone,
        "whatsappNo" : this.form.value.whatsappNo,
        "password" : this.form.value.password
      }
      this.user.RegisterUser(register).subscribe 
      ( 
        (data) => 
        { 
          alert(JSON.parse(data).message);
          this.close(); 
          this.router.navigate(['/login']);   
        }, 
        (error) =>
        {
          console.log("Unabled to insert record because" + error.getMessage);
          alert("Some Issue, Try Later");
        } 
      );
      this.close(); 
    }
  }
  

  sendOtp(){
    this.submitted = true;
    let email =this.forgotPasswordForm.value.email;
    if(this.forgotPasswordForm.controls['email'].invalid){
      alert("fill email id");
      return;
    }
    else{
      this.user.SendOTP({email : email}).subscribe 
      ( 
        (data) => 
        {
          data = JSON.parse(data);
          alert(data.message);
          console.log("otp sent");
          if(data.flag==true){
            this.otp=data.otp;
            this.email=data.email;
            this.showOtp=true;
            this.showSend=false;
            this.showSave=true;
          }
        }, 
        (error) => 
        {
          alert(JSON.parse(error));
          console.log("otp send failed" + error.getMessage);
        }
      );
    } 
  }
  
  changePassword(){
    this.submitted = true;
    let email = this.forgotPasswordForm.value.email;
    let otp = this.forgotPasswordForm.value.otp;
    let password = this.forgotPasswordForm.value.password;
    var userObj = {
      "email" : email,
      "password" : password,
    }
    if(this.forgotPasswordForm.invalid){
      alert("fill all details pls");
      return;
    }
    else{
      if(otp==this.otp && email==this.email){
        this.user.UpdatePassword(userObj).subscribe 
        ( 
          (data) => 
          {
            alert(JSON.parse(data).message);
            console.log("password updated");
            this.close();
            this.router.navigate(['/login']);
          }, 
          (error) => 
          {
            alert(JSON.parse(error));
            console.log("password reset failed" + error.getMessage);
          }
        );
      }
      else{
        if(this.email!=email)
          alert("Invalid mail");
        else
          alert("Invalid OTP");
        this.close();
      }   
    }
  }

  onRegister(){
    this.close();
  }
  close(){
    this.submitted = false;
    this.form.reset();
    this.forgotPasswordForm.reset();
  }

}

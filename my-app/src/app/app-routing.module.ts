import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AdminComponent } from './components/admin/admin.component';
import { CartComponent } from './components/cart/cart.component';
import { ClothesComponent } from './components/clothes/clothes.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PaymentComponent } from './components/payment/payment.component';
import { UserComponent } from './components/user/user.component';
import { AuthguardService } from './services/authguard.service';

const routes : Routes = [
  {path : '', redirectTo : "/home", pathMatch : 'full'}, 
  {path : 'home', component : HomeComponent}, 
  {path : 'admin', component : AdminComponent},
  {path : 'cart', component : CartComponent,canActivate:[AuthguardService]},
  {path : 'about', component : AboutComponent,canActivate:[AuthguardService]}, 
  {path : 'contact', component : ContactComponent,canActivate:[AuthguardService]},
  {path : 'clothes', component : ClothesComponent,canActivate:[AuthguardService]},
  {path : 'payment', component : PaymentComponent,canActivate:[AuthguardService]},
  {path : 'login', component : UserComponent},
  {path : '**', component : PageNotFoundComponent}, 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

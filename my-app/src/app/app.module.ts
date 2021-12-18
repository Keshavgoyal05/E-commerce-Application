import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserComponent } from './components/user/user.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ClothesComponent } from './components/clothes/clothes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './components/admin/admin.component';
import { UserFilterPipe } from './pipes/user-filter.pipe';
import { CartFilterPipe } from './pipes/cart-filter.pipe';
import { ClothesFilterPipe } from './pipes/clothes-filter.pipe';
import { NgxStripeModule } from 'ngx-stripe';
import { PaymentComponent } from './components/payment/payment.component';
import { FooterComponent } from './components/footer/footer.component';
import { OrderComponent } from './components/order/order.component';
import { OrderFilterPipe } from './pipes/order-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    PageNotFoundComponent,
    UserComponent,
    AboutComponent,
    ContactComponent,
    ClothesComponent,
    AdminComponent,
    UserFilterPipe,
    CartFilterPipe,
    ClothesFilterPipe,
    PaymentComponent,
    FooterComponent,
    OrderComponent,
    OrderFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxStripeModule.forRoot('pk_test_51K4IeYSFYc3x0FqPyGRY38mLgR9AKTlKsw4MTib6sIEmvLglzPjZZp0RjPt1nXqAw8fjs89ipSK69nIVepTCiqYS00EJDSikMl'),
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [CartFilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

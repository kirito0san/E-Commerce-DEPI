import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { CartComponent } from './pages/cart/cart.component';
import { TestimonialsComponent } from './pages/testimonials/testimonials.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './pages/products/products.component';
import { MatIconModule } from '@angular/material/icon';
import { NewArrivalComponent } from './components/new-arrival/new-arrival.component';
import { ProductComponent } from './pages/product/product.component';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './pages/error/error.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { MinMapComponent } from './components/min-map/min-map.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { CheckoutOneComponent } from './components/checkout-one/checkout-one.component';
import { CheckoutTwoComponent } from './components/checkout-two/checkout-two.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    NewArrivalComponent,
    ProductComponent,
    ErrorComponent,
    MinMapComponent,
    CheckOutComponent,
    CheckoutOneComponent,
    CheckoutTwoComponent,
  ],
  imports: [
    FavoritesComponent,
    HeaderComponent,
    CartComponent,
    FooterComponent,
    HeaderComponent,
    BrowserModule,
    AppRoutingModule,
    CartComponent,
    SignupComponent,
    NgbModule,
    LoginComponent,
    BrowserAnimationsModule,
    HttpClientModule,
    ProductsComponent,
    MatIconModule,
    FooterComponent,
    TestimonialsComponent,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

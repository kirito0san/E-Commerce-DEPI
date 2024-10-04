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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    TestimonialsComponent,
    AboutComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CartComponent,
    SignupComponent,
    NgbModule,
    LoginComponent,
    BrowserAnimationsModule,
    HttpClientModule,
    ProductsComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

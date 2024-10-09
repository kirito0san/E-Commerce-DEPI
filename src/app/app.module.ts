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
import { FavoritesComponent } from './pages/favorites/favorites.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    NewArrivalComponent,
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
    TestimonialsComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

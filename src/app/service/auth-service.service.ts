import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private apiUrl = 'https://retoolapi.dev/rGNpuZ/data'; // Replace with your API URL
  public favorites = [];
  public cart = [];
  public logIn: boolean = localStorage.getItem('user') ? true : false; // Set to true if user exists, false otherwise
  constructor(private router: Router, private http: HttpClient) {
    this.logIn = localStorage.getItem('user') ? true : false;
  }
  logInIcon() {
    this.logIn = true;
  }
  logout() {
    localStorage.removeItem('user');
    this.cart = [];
    this.favorites = [];
    this.logIn = false;
  }
  register(userData: {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}`, userData);
  }
  login(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      tap(() => {
        this.logIn = true;
      })
    );
  }
  saveFavorites(userId: number, favorites: any[]): Observable<any> {
    const apiUrl = `${this.apiUrl}/${userId}`; // Replace with your API URL
    return this.http.patch(apiUrl, { favorites });
  }
  saveCart(userId: number, cart: any[]): Observable<any> {
    const apiUrl = `${this.apiUrl}/${userId}`; // Replace with your API URL
    return this.http.patch(apiUrl, { cart });
  }

  getAllUser(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  getUserData(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  deleteCart(userId: string, cart: any[]): Observable<any> {
    const apiUrl = `${this.apiUrl}/${userId}`;
    return this.http.patch(apiUrl, { cart });
  }

  deleteFavorites(userId: string, favorites: any[]): Observable<any> {
    const apiUrl = `${this.apiUrl}/${userId}`;
    return this.http.patch(apiUrl, { favorites }); // Use PATCH to update the favorites
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  public isBuy: boolean = false;
  public BuyForm!: FormGroup;
  private apiUrl = 'https://retoolapi.dev/IeOon5/data'; // Replace with your API URL
  public favorites = [];
  public cart = [];
  public logIn: boolean = localStorage.getItem('user') ? true : false; // Set to true if user exists, false otherwise
  public couponIsActive: boolean = false; // Set to true if user exists, false otherwise
  public category: string = 'all';

  constructor(private router: Router, private http: HttpClient) {
    this.logIn = localStorage.getItem('user') ? true : false;
  }

  getUserData(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}

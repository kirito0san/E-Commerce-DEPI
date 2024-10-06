import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private apiUrl = 'https://retoolapi.dev/rGNpuZ/data'; // Replace with your API URL
  public favorites = [];
  public cart = [];
  constructor(private router: Router, private http: HttpClient) {}
  register(userData: {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}`, userData);
  }
  login(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  saveFavorites(userId: string, favorites: any[]): Observable<any> {
    const apiUrl = `${this.apiUrl}/${userId}`; // Replace with your API URL
    return this.http.patch(apiUrl, { favorites });
  }

  getAllUser(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://fakestoreapi.com/products';
  public serchResult= '';
  private searchStringSource = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}
  getAllData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  setSearch(search:string){
this.serchResult = search
  }
  // searchProducts(term: string): Observable<any> {
  //   const searchUrl = `${this.apiUrl}?title=${term}`;
  //   return this.http.get<any[]>(searchUrl); // Adjust API endpoint based on API specs
  // }

  currentSearchString = this.searchStringSource.asObservable();

  setSearchString(searchString: string) {
    this.searchStringSource.next(searchString);
  }

}

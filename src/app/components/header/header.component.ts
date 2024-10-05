import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, debounceTime, distinctUntilChanged, Observable, of, switchMap } from 'rxjs';
import { DataService } from 'src/app/service/data.service';

@Component({
  // standalone: true,
  // imports: [HttpClientModule, NgFor, NgIf, FormsModule],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    showInput: boolean = false;
    searchTerm: string = ''; // Holds the user's search input
    filteredProducts: any[] = []; // Holds the search results
    isDropdownVisible: boolean = false;
    isDesktop = window.innerWidth >= 768;

  // Reference to the input and container elements
  @ViewChild ('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  @ViewChild('searchContainer') searchContainer!: ElementRef;

  constructor(private dataService: DataService, private route:Router) {}

  // Toggles the input field visibility and focuses the input when shown
  toggleSearch() {
    this.showInput = !this.showInput;
    if (this.showInput) {
      setTimeout(() => {
        this.searchInput.nativeElement.focus();
      }, 0);
    }else{
    if (!this.searchTerm.trim()) {
      this.dataService.setSearchString(this.searchTerm)
      // this.route.navigate(['/products']);
      console.log(this.dataService.currentSearchString);

      return; // Exit the function if input is empty
    }
  }
  }

  // Listens for clicks outside the search container
  @HostListener ('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (this.showInput && !this.searchContainer.nativeElement.contains(event.target)) {
      this.showInput = false;
    }
  }
  // This function will be triggered every time the user types
  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement; // Cast target to HTMLInputElement
    this.searchTerm = inputElement.value.trim();

    // if (this.searchTerm.trim()) {
    //   this.dataService.searchProducts(this.searchTerm).subscribe((products) => {
    //     this.filteredProducts = products;
    //   }
    //   ,
    //   (error) => {
    //     console.error('Error fetching products:', error);});
    // } else {
    //   this.filteredProducts = []; // Clear the product list if search is empty
    // }
  }

  // Fetch products from API based on search term
  // fetchProducts(term: string): Observable<any[]> {
  //   const apiUrl = `https://fakestoreapi.com/products?limit=5`;
  //   return this.http.get<any[]>(apiUrl).pipe(
  //     debounceTime(300), // Wait for 300ms pause in typing before making the API call
  //     distinctUntilChanged(), // Ignore if the new search term is the same as the previous one
  //     catchError((error) => {
  //       console.error('Error fetching products:', error);
  //       return of([]); // Return an empty array if there’s an error
  //     })
  //   );
  // }

//Drop down list
dropDown(){
  this.isDropdownVisible = !this.isDropdownVisible;
}

hideDropdown() {
  this.isDropdownVisible = false;
}

@HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isDesktop = window.innerWidth >= 768; // Adjust based on your breakpoint
    if (this.isDesktop) {
      this.isDropdownVisible = false; // Close the menu when switching to desktop
    }
  }

}


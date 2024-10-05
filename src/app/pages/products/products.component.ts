import { Component, DoCheck, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor and ngIf
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    FormsModule,
  ],
  standalone: true,
})
export class ProductsComponent implements OnInit, DoCheck {
  products: any = [];
  searchTerm: string = '';
  constructor(private data: DataService) {}
  ngOnInit() {
    this.data.getAllData().subscribe((data) => {
      this.products = data;
    });
  }
  get filteredItems(): any {
    if (!this.searchTerm) {
      return this.products;
    }
    return this.products.filter((item: any) =>
      item.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  lastUsedInput: 'inputOne' | 'inputTwo' = 'inputOne'; // Track the last input used
  ngDoCheck(): void {
    if (this.data.searchResult) {
      this.searchTerm = this.data.searchResult;
      this.data.searchResult = '';
    }
  }
}

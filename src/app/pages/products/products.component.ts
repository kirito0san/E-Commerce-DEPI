import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor and ngIf

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [MatCardModule, MatButtonModule, CommonModule],
  standalone: true,
})
export class ProductsComponent implements OnInit {
  products: any = [];
  constructor(private data: DataService) {}
  ngOnInit() {
    this.data.getAllData().subscribe((data) => {
      console.log(data);
      this.products = data;
    });
  }
}

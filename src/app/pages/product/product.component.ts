import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

  productDetails:any;
  counterValue:number = 1;
  sizes: string[] = ['XS', 'S', 'M', 'L', 'XL'];
  selectedSize: string = '';
  isFavorited: boolean = false;

constructor(private dataService:DataService, private route:ActivatedRoute){}

ngOnInit(): void {
  const productId = this.route.snapshot.paramMap.get('id');

  this.dataService.getAllData().subscribe((data)=>{
    this.productDetails = data.find((p:any)=>p.id == productId)
  })
}

// Handiling Rating Stars
getFullStars(rate: number) {
  return Math.floor(rate);  // For full stars
}

hasHalfStar(rate: number) {
  //return rate % 1 >= 0.5;  // Check for half star
  return rate % 1 > 0 && rate % 1 <= 0.9;
}

// hasQuartStar(rate: number){
//   return rate % 1 < 0.5 && rate % 1 > 0;
// }

getEmptyStars(rate: number) {
  return 5 - Math.ceil(rate);  // For empty stars
}

// Start Counter
increase(){
  this.counterValue = this.counterValue + 1;
}
decrease(){
  if(this.counterValue > 1){
    this.counterValue = this.counterValue - 1;
  }
}
  selectSize(size: string) {
    this.selectedSize = size;
  }

  toggleFavorite() {
    this.isFavorited = !this.isFavorited;
  }

}

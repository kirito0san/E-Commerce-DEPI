import { Component, ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';
@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [NgbCarouselModule, CommonModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent {
  @ViewChild('carousel') carousel!: NgbCarousel;
  constructor(private router: Router, private authServes: AuthServiceService) {}

  images = [
    {
      src: '../../../assets/electronics.png',
      alt: `electronics`,
      title: `electronics`,
      place: `electronics`,
    },
    {
      src: '../../../assets/wemen.jpg',
      alt: `women's clothing`,
      title: `women's clothing`,
      place: `women's clothing`,
    },
    {
      src: '../../../assets/only-men.jpg',
      alt: `men's clothing`,
      title: `men's clothing`,
      place: `men's clothing`,
    },
    {
      src: '../../../assets/all.png',
      alt: 'all',
      title: 'All category',
      place: `all`,
    },
    {
      src: '../../../assets/electronics.png',
      alt: `electronics`,
      title: `electronics`,
      place: `electronics`,
    },
    {
      src: '../../../assets/wemen.jpg',
      alt: `women's clothing`,
      title: `women's clothing`,
      place: `women's clothing`,
    },
    {
      src: '../../../assets/only-men.jpg',
      alt: `men's clothing`,
      title: `men's clothing`,
      place: `men's clothing`,
    },
    {
      src: '../../../assets/all.png',
      alt: 'all',
      title: 'All category',
      place: `all`,
    },
    {
      src: '../../../assets/electronics.png',
      alt: `electronics`,
      title: `electronics`,
      place: `electronics`,
    },
    {
      src: '../../../assets/wemen.jpg',
      alt: `women's clothing`,
      title: `women's clothing`,
      place: `women's clothing`,
    },
    {
      src: '../../../assets/only-men.jpg',
      alt: `men's clothing`,
      title: `men's clothing`,
      place: `men's clothing`,
    },
    {
      src: '../../../assets/all.png',
      alt: 'all',
      title: 'All category',
      place: `all`,
    },
  ];

  imageChunks: any[][] = [];

  ngOnInit() {
    this.imageChunks = this.chunkArray(this.images, 3);
  }
  onClick(i: string) {
    this.authServes.category = i;
    this.router.navigate([`/products`]);
  }
  chunkArray(array: any[], size: number) {
    const chunked = [];
    for (let i = 0; i < array.length; i += size) {
      chunked.push(array.slice(i, i + size));
    }
    return chunked;
  }

  next() {
    this.carousel.next();
  }

  prev() {
    this.carousel.prev();
  }
}

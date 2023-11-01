import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  imgDimension = 'width: 14em; height: 14em;';
  headerBackgroundUrl = 'assets/Resursi/flowerBackground1.jpg';
  flowerImageUrl = 'assets/Resursi/FTD_SplitBanner_Merx_1.png';

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getCart();
  }
}

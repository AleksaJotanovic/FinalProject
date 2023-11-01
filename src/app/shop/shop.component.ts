import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from 'src/data';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private crud: CrudService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const filter = params['filter'];
      switch (filter) {
        case 'simpathy':
          this.filterProducts(filter);
          break;
        case 'anniversary':
          this.filterProducts(filter);
          break;
        case 'congratulations':
          this.filterProducts(filter);
          break;
        case 'getwell':
          this.filterProducts(filter);
          break;
        default:
          this.products = [];
      }
    });
  }

  filterProducts(filter: string) {
    this.crud.getProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products.filter(
          (product) => product.category === filter
        );
      },
      error: (err) =>
        console.error('Alexa error during products filtering: ', err),
    });
  }
}

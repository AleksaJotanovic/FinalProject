import { Component, OnInit } from '@angular/core';
import { Product } from 'src/data';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  cart: Product[] = [];
  subtotal: number = 0;

  constructor(
    public productsService: ProductsService,
    private router: Router,
    private crud: CrudService
  ) {}

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {
    this.initializeCart();
    this.productsService.totalPrice.subscribe((data) => (this.subtotal = data));
    this.productsService.computeCartTotals();
  }

  initializeCart() {
    this.crud.getCart().subscribe({
      next: (cart: Product[]) => {
        this.cart = cart;
      },
      error: (err) =>
        console.error('error while initializing shopping cart page: ', err),
    });
  }

  incrementQuantity(product: Product) {
    this.productsService.addToCart(product);
    this.initializeCart();
  }

  decrementQuantity(product: Product) {
    this.productsService.decrementQuantity(product);
    this.initializeCart();
  }

  remove(product: Product) {
    this.productsService.remove(product);
    this.initializeCart();
  }

  checkout() {
    this.router.navigate(['/product-order']);
  }
}

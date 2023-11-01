import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/data';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  productsUrl: string = 'http://localhost:3000/products';
  cartUrl: string = 'http://localhost:3000/cart';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>(this.productsUrl);
  }

  getCart() {
    return this.http.get<Product[]>(this.cartUrl);
  }

  postProduct(product: Product) {
    return this.http.post<Product>(this.cartUrl, product);
  }

  updateCart(product: Product) {
    return this.http.put(this.cartUrl + `/${product.id}`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(this.cartUrl + `/${id}`);
  }
}

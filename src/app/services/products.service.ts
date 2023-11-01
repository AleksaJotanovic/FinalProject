import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Subject, map } from 'rxjs';
import { Product } from 'src/data';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor(private http: HttpClient, private crud: CrudService) { }

  getProductById(id: number) {
    return this.http.get<Product[]>('http://localhost:3000/products').pipe(
      map((res: Product[]) => {
        let filtered = res.filter((prod) => prod.id === id);
        if (filtered.length) {
          return filtered[0];
        } else {
          return 'It`s undefined :|';
        }
      })
    );
  }

  getCart() {
    this.crud.getCart().subscribe({
      next: () => this.computeCartTotals(),
    });
  }

  addToCart(product: Product) {
    let productToAdd: Product = {
      id: product.id,
      category: product.category,
      title: product.title,
      price: product.price,
      quantity: product.quantity,
      description: product.description,
      photo: product.photo,
    };

    this.crud.getCart().subscribe({
      next: (cart: Product[]) => {
        let productExists: boolean = false;

        for (let i in cart) {
          if (cart[i].id === productToAdd.id) {
            let updatingCartProduct: Product = {
              ...cart[i],
              quantity: (cart[i].quantity += 1),
            };
            this.crud.updateCart(updatingCartProduct).subscribe({
              error: (err) =>
                console.error('Alexa error while updating cart product: ', err),
            });
            productExists = true;
            break;
          }
        }

        if (!productExists) {
          this.crud.postProduct(productToAdd).subscribe({
            error: (error) =>
              console.log('Alexa error during post request: ', error),
          });
        }
      },
      error: (err) =>
        console.error(
          'Alexa error Products Service, inside addToCart() -> ',
          err
        ),
    });
    this.getCart();
    // let filtered = this.products.filter(function (product) {
    //   return product.id === id;
    // });

    // let productExists = false;

    // for (let i in this.cart) {
    //   if (this.cart[i].id === filtered[0].id) {
    //     this.cart[i].quantity++;
    //     productExists = true;
    //     break;
    //   }
    // }

    // if (!productExists) {
    //   this.cart.push({
    //     id: filtered[0].id,
    //     category: filtered[0].category,
    //     title: filtered[0].title,
    //     price: filtered[0].price,
    //     quantity: qty,
    //     description: filtered[0].description,
    //     photo: filtered[0].photo,
    //   });
    // }

    // this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    this.crud.getCart().subscribe({
      next: (cart: Product[]) => {
        for (let currentProduct of cart) {
          totalPriceValue += currentProduct.quantity * currentProduct.price;
          totalQuantityValue += currentProduct.quantity;
        }

        //Publish the new values... all the subscribers will receive the new data.
        this.totalPrice.next(totalPriceValue);
        this.totalQuantity.next(totalQuantityValue);
      },
      error: (err) =>
        console.error(
          'Alexa error while accessing data from computeCartTotals: ',
          err
        ),
    });
  }

  decrementQuantity(product: Product) {
    // product.quantity--;

    // if (product.quantity === 0) {
    //   this.remove(product);
    // } else {
    //   this.computeCartTotals();
    // }

    let updatingCartProduct: Product = {
      ...product,
      quantity: (product.quantity -= 1),
    };
    this.crud.updateCart(updatingCartProduct).subscribe({
      error: (err) =>
        console.error('Alexa error while decrementing quantity: ', err),
    });
    if (product.quantity === 0) {
      this.remove(product);
    } else {
      this.computeCartTotals();
    }
  }

  remove(cartProduct: Product) {
    this.crud.deleteProduct(cartProduct.id).subscribe({
      error: (err) => console.log('Alexa error during delete request: ', err),
    });
    this.computeCartTotals();
  }

  empty() {
    this.crud.getCart().subscribe({
      next: (cart: Product[]) => {
        for (let product of cart) {
          this.crud.deleteProduct(product.id).subscribe({
            error: (err) =>
              console.log('Alexa error while emptying cart: ', err),
          });
        }
        console.log('Getting for deleting: ', cart);
      },
      error: (err) =>
        console.log('Alexa error during get request inside emptu() -> ', err),
    });
  }
}

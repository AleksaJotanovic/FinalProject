import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.css'],
})
export class ProductOrderComponent {
  orderForm!: FormGroup;

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.orderForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      comment: new FormControl(null),
      paymentMethod: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    this.router.navigate(['/']);
    this.productsService.empty();
    this.orderForm.reset();
  }
}

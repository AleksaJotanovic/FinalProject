import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/data';
import { AuthService } from 'src/app/services/auth.service'
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { VerifyModalComponent } from 'src/app/verify-modal/verify-modal.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input() product: Product = {
    id: 0,
    category: '',
    title: '',
    price: 0,
    quantity: 0,
    description: '',
    photo: '',
  };
  modalRef: MdbModalRef<VerifyModalComponent> | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    public productsService: ProductsService,
    public router: Router,
    private crud: CrudService,
    private authService: AuthService,
    private modalService: MdbModalService,
  ) { }

  ngOnInit(): void {
    this.routeChanged(this.activatedRoute.snapshot.params['productId']);
    this.activatedRoute.params.subscribe((params: Params) => {
      this.routeChanged(Number(params['productId']));
    });
  }

  getRouteUrl() {
    return 'Shop' + this.router.url.replace(/[0-9]+/g, this.product.title);
  }

  routeChanged(id: number) {
    this.productsService.getProductById(id).subscribe({
      next: (data: any) => {
        this.product.id = data.id;
        this.product.category = data.category;
        this.product.title = data.title;
        this.product.price = data.price;
        this.product.quantity = data.quantity;
        this.product.description = data.description;
        this.product.photo = data.photo;
      },
      error: (error) => console.error('Alexa error during getById: ', error),
    });
  }

  nextProduct() {
    this.crud.getProducts().subscribe({
      next: (products: Product[]) => {
        let nextId = this.product.id + 1;
        this.router.navigate(['/product', nextId]);
        if (nextId > products.length) {
          this.router.navigate(['/product', products[0].id]);
        }
      },
      error: (err) =>
        console.error('Alexa error while going next product: ', err),
    });
  }

  previousProduct() {
    this.crud.getProducts().subscribe({
      next: (products: Product[]) => {
        let previousId = this.product.id - 1;
        this.router.navigate(['/product', previousId]);
        if (previousId < products[0].id) {
          this.router.navigate(['/product', products.length]);
        }
      },
      error: (err) =>
        console.error('Alexa error while toggling previous product: ', err),
    });
  }

  addToCart(product: Product) {
    // this.productsService.addToCart(product);
    if (this.authService.isLoggedIn !== true) {
      this.modalRef = this.modalService.open(VerifyModalComponent);
    } else {
      this.productsService.addToCart(product);
    }
  }
}

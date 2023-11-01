import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isCollapsed: boolean = true;
  navbarLogoUrl = 'assets/Resursi/flowerLogo.png';
  totalQuantity: number = 0;
  displayName: any;

  constructor(
    private productsService: ProductsService,
    public authService: AuthService,
    private router: Router,
    private fireAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.updateQuantityStatus();
    if (this.authService.isLoggedIn) {
      this.fireAuth.user.subscribe(
        (user) => (this.displayName = user?.displayName)
      );
    }
  }

  updateQuantityStatus() {
    this.productsService.totalQuantity.subscribe(
      (data) => (this.totalQuantity = data)
    );
  }

  logOut() {
    if (this.router.url === '/cart') {
      this.router.navigate(['/']);
      this.authService.signOut();
    } else {
      this.authService.signOut();
    }
  }
}

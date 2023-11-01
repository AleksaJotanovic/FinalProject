import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShopComponent } from './shop/shop.component';
import { CategoryComponent } from './shop/category/category.component';
import { ProductComponent } from './shop/category/product/product.component';
import { SignupComponent } from './signup/signup.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductOrderComponent } from './product-order/product-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './about/about.component';
import { SigninComponent } from './signin/signin.component';
import { SocialSidebarComponent } from './social-sidebar/social-sidebar.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { VerifyModalComponent } from './verify-modal/verify-modal.component';
import { RegisterModalComponent } from './register-modal/register-modal.component';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MustloginModalComponent } from './mustlogin-modal/mustlogin-modal.component';
import { PipesComponent } from './pipes/pipes.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SocialSidebarComponent,
    HomeComponent,
    ShopComponent,
    CategoryComponent,
    ProductComponent,
    SigninComponent,
    SignupComponent,
    ShoppingCartComponent,
    ProductOrderComponent,
    AboutComponent,
    VerifyModalComponent,
    RegisterModalComponent,
    MustloginModalComponent,
    PipesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbCollapseModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    MdbCheckboxModule,
  ],
  providers: [MdbModalService],
  bootstrap: [AppComponent],
})
export class AppModule {}

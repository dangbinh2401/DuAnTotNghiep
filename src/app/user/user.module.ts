import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserRoutingModule } from './user-routing.module';

import { UserComponent } from './user.component';
import { HomeComponent } from './component/home/home.component';
import { AbountComponent } from './component/abount/abount.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { CartDetailComponent } from './component/cart-detail/cart-detail.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';

@NgModule({
  declarations: [
    UserComponent,
    HomeComponent,
    AbountComponent,
    ProductListComponent,
    CartDetailComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    UserRoutingModule
  ],
  providers: [],
  bootstrap: [UserComponent]
})
export class UserModule { }

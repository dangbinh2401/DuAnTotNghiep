import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { AutoFocusDirectiveDirective } from './component/auto-focus/focus.directive';

import { UserComponent } from './user.component';
import { HomeComponent } from './component/home/home.component';
import { AbountComponent } from './component/abount/abount.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { CartDetailComponent } from './component/cart-detail/cart-detail.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { LoginUserComponent } from './component/loginUser/login-user/login-user.component';
import { RegisterUserComponent } from './component/loginUser/register-user/register-user.component';
import { CheckoutComponent } from './component/checkout/checkout.component'; 
import { ControlMessageComponent } from './component/validate/control-message.component';
import { OrderHistoryComponent } from './component/order-history/order-history.component';
import { CommentComponent } from './component/comment/comment.component';

@NgModule({
  declarations: [
    UserComponent,
    HomeComponent,
    AbountComponent,
    ProductListComponent,
    CartDetailComponent,
    ProductDetailComponent,
    LoginUserComponent,
    RegisterUserComponent,
    CheckoutComponent,
    AutoFocusDirectiveDirective,
    ControlMessageComponent,
    OrderHistoryComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [UserComponent]
})
export class UserModule { }

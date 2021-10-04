import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbountComponent } from './component/abount/abount.component';
import { CartDetailComponent } from './component/cart-detail/cart-detail.component';
import { CheckoutComponent } from './component/checkout/checkout.component'; 
import { HomeComponent } from './component/home/home.component';
import { LoginUserComponent } from './component/loginUser/login-user/login-user.component';
import { RegisterUserComponent } from './component/loginUser/register-user/register-user.component';
import { OrderHistoryComponent } from './component/order-history/order-history.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { UserComponent } from './user.component';


const routes: Routes = [
  {
    path: 'user', component: UserComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AbountComponent },
      { path: 'productList', component: ProductListComponent },
      { path: 'productDetail/:productId', component: ProductDetailComponent },
      { path: 'cart', component: CartDetailComponent },
      { path: 'register', component: RegisterUserComponent },
      { path: 'login', component: LoginUserComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'orderHistory', component: OrderHistoryComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

import { Component, OnInit } from '@angular/core';
import { cartItems } from 'src/model/cartItems';
import { CartService } from 'src/service/userService/cartService/cart.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss']
})
export class CartDetailComponent implements OnInit {

  cartItemss: cartItems[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(
    public cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.cartDetails();
  }

  cartDetails(){
    this.cartItemss = this.cartService.cartItem;

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.cartService.calculateTotalPrice();
  }

  incrementQuantity(cartItem: cartItems){
    this.cartService.addToCart(cartItem);
  }

  decrementQuantity(cartItem: cartItems){
    this.cartService.decrementQuantity(cartItem);
  }

  remove(cartItem: cartItems){
    this.cartService.remove(cartItem);
  }

}

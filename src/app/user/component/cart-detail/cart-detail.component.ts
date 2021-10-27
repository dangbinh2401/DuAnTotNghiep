import { Component, OnInit } from '@angular/core';
import { cartItems } from 'src/model/cartItems';
import { CartService } from 'src/service/userService/cartService/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss']
})
export class CartDetailComponent implements OnInit {

  cartItemss: cartItems[] = [];
  deleteCartItem: cartItems = null!;
  totalPrice: number = 0;
  totalQuantity: number = 0;
  isAuthenticated!: string;
  store: Storage = sessionStorage;

  constructor(
    public cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.cartDetails();

    this.isAuthenticated = this.store.getItem('isLogin') as string;
  }

  cartDetails() {
    this.cartItemss = this.cartService.cartItem;

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.cartService.calculateTotalPrice();
  }

  incrementQuantity(cartItem: cartItems) {
    this.cartService.addToCart(cartItem);
  }

  decrementQuantity(cartItem: cartItems) {
    this.cartService.decrementQuantity(cartItem);
  }

  remove(cartItem: cartItems) {
    this.cartService.remove(cartItem);
  }

  showConfilm(cartItem: cartItems) {
    Swal.fire({
      title: 'Quantity is one',
      text: `Do you want to delete?!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.remove(cartItem);
      }
      else if (result.dismiss == Swal.DismissReason.cancel) { }
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/service/userService/cartService/cart.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }

  updateCartStatus() {
    //subscribe to the events
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    ) 
    
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    )
  }

}

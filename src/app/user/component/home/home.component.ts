import { Component, OnInit } from '@angular/core';
import { cartItems } from 'src/model/cartItems';
import { Product } from 'src/model/product';
import { CartService } from 'src/service/userService/cartService/cart.service';
import { ProductListService } from 'src/service/userService/productListService/product-list.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  productTop!: Product[];

  constructor(
    public productListService: ProductListService,
    private cartService: CartService
    ) { }

  ngOnInit(): void {
    this.getProductTop();
  }

  getProductTop() {
    this.productListService.getProductTop().subscribe(data => {
      this.productTop = data;
    })
  }

  /** Add to cart */

  addToCart(product: Product) {
    console.log(`product name: ${product.name}, and price: ${product.unitPrice}`);
    const cartItem = new cartItems(product);
    this.cartService.addToCart(cartItem);
    Swal.fire("success!", "Add cart successfully!", "success");
  }

}

import { Component, OnInit } from '@angular/core';
import { cartItems } from 'src/model/cartItems';
import { Category } from 'src/model/category';
import { Product } from 'src/model/product';
import { TokenStorageService } from 'src/service/loginService/token-storage.service';
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
  categories!: Category[];
  constructor(
    public productListService: ProductListService,
    private cartService: CartService,
    private tokenStorage: TokenStorageService,
    ) { }

  ngOnInit(): void {
    this.getProductTop();
    this.getCategory();
    console.log(this.tokenStorage.getUser())
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
    Swal.fire("Thành công!", "Thêm giỏ hàng thành công!", "success");
  }

   /** Load category */

   getCategory() {
    this.productListService.getCategory().subscribe(data => {
      this.categories = data;
    })
  }

}

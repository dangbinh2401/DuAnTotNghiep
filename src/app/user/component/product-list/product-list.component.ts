import { Component, OnInit } from '@angular/core';
import { cartItems } from 'src/model/cartItems';
import { Category } from 'src/model/category';
import { Product } from 'src/model/product';
import { CartService } from 'src/service/userService/cartService/cart.service';
import { ProductListService } from 'src/service/userService/productListService/product-list.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products!: Product[];
  categories!: Category[];

  constructor(
    public productListService: ProductListService,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.getAllListProduct();
    this.getCategory();
  }

  getAllListProduct() {
    this.productListService.getAllProducts().subscribe(data => {
      this.products = data;
    })
  }

  getCategory() {
    this.productListService.getCategory().subscribe(data => {
      this.categories = data;
    })
  }

  addToCart(product: Product){
    console.log(`product name: ${product.name}, and price: ${product.unitPrice}`);
    const cartItem = new cartItems(product);
    this.cartService.addToCart(cartItem);
    Swal.fire("success!", "Add cart successfully!", "success");
  }
}

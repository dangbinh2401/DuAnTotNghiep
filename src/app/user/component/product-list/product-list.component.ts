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
  page = 1;
  pageSize = 6;
  totalLength = 0;
  orderList: String = ''
  isDesc: boolean = true;
  orderSort: String=''
  FILTER_PAG_REGEX = /[^0-9]/g;

  constructor(
    public productListService: ProductListService,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.getAllListProduct();
    this.getCategory();
  }

  /** Load product to list */

  getAllListProduct() {
    this.productListService.getAllProducts().subscribe(data => {
      this.products = data;
      this.totalLength = this.products.length;
    })
  }

   /** Pagination list products */

   selectPage(page: string) {
    this.page = parseInt(page) || 1;
  }

  /** Format input */

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(this.FILTER_PAG_REGEX, '');
  }

  /** Sort list products */
  
  sort(header:any){
    this.isDesc =! this.isDesc
    this.orderSort = header
  }

  /** Search product by name */

  search(key: string): void {
    const result: Product[] = [];
    key = key.trim();
    for (const p of this.products) {
      if (p.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        result.push(p)
      }
    }
    this.products = result
    this.totalLength = result.length
    this.page = 1
    if (result.length === 0 || !key) {
      this.totalLength = result.length
      this.page = 1
    }
    if (!key) {
      this.ngOnInit()
    }
  }

  /** Load category */

  getCategory() {
    this.productListService.getCategory().subscribe(data => {
      this.categories = data;
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

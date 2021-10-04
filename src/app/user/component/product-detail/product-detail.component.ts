import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cartItems } from 'src/model/cartItems';
import { Product } from 'src/model/product';
import { ProductService } from 'src/service/adminService/productService/product.service';
import { CartService } from 'src/service/userService/cartService/cart.service';
import { CommentService } from 'src/service/userService/commentService/comment.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productId: any;
  product!: Product;
  products!: Product[];
  commentSize: any;

  constructor(
    public productService: ProductService,
    private cartService: CartService,
    private commentService: CommentService,
    private router: Router,
    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params['productId'];
    this.productService.getProductById(this.productId).subscribe((data: any) => {
      if (data.status === true) {
        const rs = data.result;
        this.product = rs;
        console.log(this.product);
      }
      else {
        Swal.fire("error!", "System error!", "error");
      }
    })

    this.getCommentSize();
  }

  /** Add to cart */

  addToCart() {
    console.log(`product name: ${this.product.name}, and price: ${this.product.unitPrice}`);
    const cartItem = new cartItems(this.product);
    this.cartService.addToCart(cartItem);
    Swal.fire("success!", "Add cart successfully!", "success");
  }

  /** Get productId */

  getProductId(): number {
    let productId = Number(this.activatedRoute.snapshot.paramMap.get('productId'));
    return productId;
  }

  /** Get size comment */

  getCommentSize() {
    this.commentService.getCommentSize(this.getProductId()).subscribe(data => {
      this.commentSize = data;
    })
  }
}

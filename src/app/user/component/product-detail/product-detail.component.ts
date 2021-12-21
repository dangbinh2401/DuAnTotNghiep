import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cartItems } from 'src/model/cartItems';
import { Product } from 'src/model/product';
import { ProductService } from 'src/service/adminService/productService/product.service';
import { CartService } from 'src/service/userService/cartService/cart.service';
import { CommentService } from 'src/service/userService/commentService/comment.service';
import Swal from 'sweetalert2'
import { NgxSpinnerService } from "ngx-spinner";

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
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService

  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.productId = this.activatedRoute.snapshot.params['productId'];
    this.productService.getProductById(this.productId).subscribe((data: any) => {
      setTimeout(() => {
        if (data.status === true) {    
          const rs = data.result;
          this.product = rs;
          console.log(this.product);
          this.spinner.hide();
        }
        else {
          Swal.fire("Lỗi!", "Lỗi hệ thống!", "error");
        }
      },1500)
    })

    this.getCommentSize();
  }

  /** Add to cart */

  addToCart() {
    console.log(`product name: ${this.product.name}, and price: ${this.product.unitPrice}`);
    const cartItem = new cartItems(this.product);
    this.cartService.addToCart(cartItem);
    Swal.fire("Thành công!", "Thêm vào giỏ hàng thành công!", "success");
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

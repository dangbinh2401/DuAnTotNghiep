import { Component, OnInit } from '@angular/core';
import { cartItems } from 'src/model/cartItems';
import { Category } from 'src/model/category';
import { Product } from 'src/model/product';
import { CartService } from 'src/service/userService/cartService/cart.service';
import { ProductListService } from 'src/service/userService/productListService/product-list.service';
import Swal from 'sweetalert2'
import { NgxSpinnerService } from "ngx-spinner";
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  categories!: Category[];
  page = 1;
  pageSize = 6;
  totalLength = 0;
  orderList: String = ''
  isDesc: boolean = true;
  orderSort: String = ''
  searchName: string = '';
  searchs = new FormControl();
  categoryId: any;
  curCategoryId: number = 1;
  preCategoryId: number = 1;
  FILTER_PAG_REGEX = /[^0-9]/g;

  constructor(
    public productListService: ProductListService,
    private cartService: CartService,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      () => { 
        this.listProducts(); 
      });
    
    this.getCategory();
  }

  /** List categories */

  listProducts() {
    if (this.searchName !== '') {
      this.getProductSearchAndPage(this.searchName);
    }
    else if(this.activatedRoute.snapshot.paramMap.has('categoryId')) {
      this.getProductByCategory();
    }
    else {
      this.getAllListProduct();
    }
  }

  /** Load product to list */

  getAllListProduct() {
    this.spinner.show();
    this.productListService.getAllProducts(this.page - 1, this.pageSize).subscribe(this.processResult());
  }

  getProductSearchAndPage(fullname: string) {
    this.productListService.getProductByNameAndPage(fullname, this.page - 1, this.pageSize).subscribe(this.processResult());
  }

  getProductByCategory() {
    // check id parameter is avaiable
    if (this.activatedRoute.snapshot.paramMap.has('categoryId')) {
      this.curCategoryId = Number(this.activatedRoute.snapshot.paramMap.get('categoryId'));     
    }
    if(this.preCategoryId != this.curCategoryId) {
      this.page = 1;
    }
    this.preCategoryId = this.curCategoryId;
    this.productListService.getProductByCategory(this.curCategoryId, this.page - 1, this.pageSize).subscribe(this.processResult());
  }


  processResult() {
    this.spinner.show();
    return (data: any) => {
      setTimeout(() => {
        console.log(data);
        this.page = data.number + 1;
        this.pageSize = data.size;
        this.products = data.content;
        this.totalLength = data.totalElements;
        this.spinner.hide();
      }, 1000)

    };
  }

  /** Pagination list products */

  selectPage(page: string) {
    this.page = parseInt(page) || 1;
    this.pageSize = 6
    this.getAllListProduct();
  }

  /** Format input */

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(this.FILTER_PAG_REGEX, '');
  }

  /** Sort list products */

  sort(header: any) {
    this.isDesc = !this.isDesc
    this.orderSort = header
  }

  /** Search keyword product by name */

  search() {
    this.searchs.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(
      value => {
        console.log(value);
        this.searchName = value;
        this.getProductSearchAndPage(this.searchName);
      }
    )
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

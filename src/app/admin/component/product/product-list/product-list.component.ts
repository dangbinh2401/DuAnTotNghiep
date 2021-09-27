import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/model/product';
import { ProductService } from 'src/service/productService/product.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products!: Product[];
  page = 1;
  pageSize = 5;
  totalLength: any;
  orderList: String = ''
  isDesc: boolean = true;
  orderSort: String=''
  FILTER_PAG_REGEX = /[^0-9]/g;

  constructor(
    public productService: ProductService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getProductSize();
  }

  /** Get all list products */

  getAllProducts() {
    this.productService.getAllProducts(this.page - 1, this.pageSize).subscribe(data => {
      console.log(data);
      this.products = data;
    })
  }

  /** Get size of products */

  getProductSize() {
    this.productService.getProductSize().subscribe(data => {
      this.totalLength = data;
    })
  }

  /** Change pageSize */

  selectPage(page: string) {
    this.page = parseInt(page) || 1;
    this.pageSize = 5
    this.getAllProducts();
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
    for (const ct of this.products) {
      if (ct.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        result.push(ct)
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
}

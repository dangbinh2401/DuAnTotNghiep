import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from 'src/model/product';
import { ProductService } from 'src/service/adminService/productService/product.service';
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
  orderSort: String = ''
  public load = false;
  listCheckboxProducts: any[] = [];
  FILTER_PAG_REGEX = /[^0-9]/g;

  constructor(
    public productService: ProductService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getProductSize();
  }

  /** Get all list products */

  getAllProducts() {
    this.spinner.show();
    this.productService.getAllProducts(this.page - 1, this.pageSize).subscribe(data => {
      setTimeout(() => {
        console.log(data);
        this.products = data;
        this.spinner.hide();
      },1500);
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

  sort(header: any) {
    this.isDesc = !this.isDesc
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

  getCheckedListProduct(e: any, id: any) {
    if (e.target.checked) {
      this.listCheckboxProducts.push(id);
    } else {
      this.listCheckboxProducts = this.listCheckboxProducts.filter(m => m != id)
    }
  }


  /** Get product edit by id  */

  getProductEdit(productId: any) {
    this.productService.getProductById(productId).subscribe((data: any) => {
      if (data.status === true) {
        this.router.navigate(['/admin/product/update', productId]);
      }
      if (data.status === false) {
        Swal.fire({
          title: 'Product does not exist!',
          text: 'Do you want to reload page?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes, reload page!',
          cancelButtonText: 'No, keep it'
        }).then((result) => {
          if (result.value) {
            this.ngOnInit();
          }
          else if (result.dismiss == Swal.DismissReason.cancel) { }
        })
      }
      if (data.status === 500) {
        Swal.fire("Error!", "System error!", "error");
      }
    })
  }

  /** Delete product by id */

  deleteProduct(productId: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete your category?!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.productService.deleteProduct(productId).subscribe((data: any) => {
          if (data.status === true) {
            Swal.fire("Delete product successfull!", "You clicked the button!", "success");
            this.ngOnInit();
          }
          if (data.status === false) {
            Swal.fire({
              title: 'Product has been deleted by someone else!',
              text: 'Do you want to reload page?',
              icon: 'question',
              showCancelButton: true,
              confirmButtonText: 'Yes, reload page!',
              cancelButtonText: 'No, keep it'
            }).then((result) => {
              if (result.value) {
                this.ngOnInit();
              }
            })
          }
          if (data.status === 500) {
            Swal.fire("Delete product error!", "System error!", "error");
          }
        })
      }
      else if (result.dismiss == Swal.DismissReason.cancel) { }
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from 'src/model/product';
import { ProductService } from 'src/service/adminService/productService/product.service';
import Swal from 'sweetalert2'
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as $ from "jquery"
import { HttpErrorResponse } from '@angular/common/http';
import { Category } from 'src/model/category';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products!: Product[];
  categories!: Category[];
  page = 1;
  pageSize = 5;
  totalLength: any;
  orderList: String = ''
  isDesc: boolean = true;
  orderSort: String = ''
  public load = false;
  listCheckboxProducts: any[] = [];
  searchName: string = '';
  searchs = new FormControl();
  selectedAll: any;
  curCategoryId: number = 1;
  preCategoryId: number = 1;
  FILTER_PAG_REGEX = /[^0-9]/g;

  constructor(
    public productService: ProductService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      () => { 
        this.listProducts(); 
      });
      console.log(this.products);
    this.getCategory();
  }

  /** List products */

  listProducts() {
    if (this.searchName !== '') {
      this.getProductByName(this.searchName);
    }
    else if(this.activatedRoute.snapshot.paramMap.has('categoryId')) {
      this.getProductByCategory();
    }
    else {
      this.getAllProducts();
    }
  }

  /** Get all list products by pagination */

  getAllProducts() {
    this.spinner.show();
    this.productService.getAllProducts(this.page - 1, this.pageSize).subscribe(this.processResult());
  }

  /** Get all list products by pagination and search */

  getProductByName(name: string) {
    this.productService.getProductByNameAndPage(name, this.page - 1, this.pageSize).subscribe(this.processResult());
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
    this.productService.getProductByCategory(this.curCategoryId, this.page - 1, this.pageSize).subscribe(this.processResult());
  }

  /** Result data */

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

  getCategory() {
    this.productService.getCategory().subscribe(data => {
      this.categories = data;
    })
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
        this.getProductByName(this.searchName);
      }
    )
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

  checkAllCheckBox(ev: any) {
    this.products?.forEach((x) => (x.checked = ev.target.checked));
  }

  allCheckBoxChecked() {
    return this.products?.every((p) => p.checked);
  }

  /** Get product edit by id  */

  getProductEdit(productId: any) {
    this.productService.getProductById(productId).subscribe((data: any) => {
      if (data.status === true) {
        this.router.navigate(['/admin/product/update', productId]);
      }
      if (data.status === false) {
        Swal.fire({
          title: 'S???n ph???m kh??ng t???n t???i!',
          text: 'B???n c?? mu???n t???i l???i trang?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'C??, T???i l???i trang!',
          cancelButtonText: 'Kh??ng, Gi??? nguy??n'
        }).then((result) => {
          if (result.value) {
            this.ngOnInit();
          }
          else if (result.dismiss == Swal.DismissReason.cancel) { }
        })
      }
      if (data.status === 500) {
        Swal.fire("L???i!", "L???i h??? th???ng!", "error");
      }
    })
  }

  /** Delete product by id */

  deleteProduct(productId: any) {
    Swal.fire({
      title: 'B???n c?? ch???c mu???n x??a?',
      text: 'B???n c?? ch???c mu???n x??a s???n ph???m?!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'V??ng, X??a!',
      cancelButtonText: 'Kh??ng, Gi??? nguy??n'
    }).then((result) => {
      if (result.value) {
        this.productService.deleteProduct(productId).subscribe((data: any) => {
          if (data.status === true) {
            Swal.fire("X??a th??nh c??ng!", "Nh???n v??o n??t ????? ti???p t???c!", "success");
            this.ngOnInit();
          }
          if (data.status === false) {
            Swal.fire({
              title: 'S???n ph???m ???? b??? x??a b???i ng?????i kh??c!',
              text: 'b???n c?? mu???n t???i l???i trang kh??ng?',
              icon: 'question',
              showCancelButton: true,
              confirmButtonText: 'C??, T???i l???i trang!',
              cancelButtonText: 'Kh??ng, Gi??? nguy??n'
            }).then((result) => {
              if (result.value) {
                this.ngOnInit();
              }
            })
          }
          if (data.status === 500) {
            Swal.fire("X??a s???n ph???m th???t b???i!", "L???i h??? th???ng!", "error");
          }
        })
      }
      else if (result.dismiss == Swal.DismissReason.cancel) { }
    })
  }


  public deleteProducts() {
    const selectedProducts = this.products
      ?.filter((product) => product.checked)
      .map((p) => p.productId);
    if (selectedProducts && selectedProducts.length > 0) {
      Swal.fire({
        title: 'B???n c?? ch???c ch???n mu???n x??a?',
        text: 'B???n c?? ch???c mu???n x??a c??c s???n ph???m ???????c ch???n??!',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'C??, X??a s???n ph???m!',
        cancelButtonText: 'Kh??ng, Gi??? nguy??n'
      }).then((result) => {
        if (result.isConfirmed) {
          this.productService.deleteMultipleProducts(selectedProducts).subscribe(
            (response: void) => {
              Swal.fire("X??a th??nh c??ng!", "Nh???n v??o n??t ????? ti???p t???c!", "success");
              this.ngOnInit();
            },
            (error: HttpErrorResponse) => {
              alert(error.message);
            }
          );
        }
        else if (result.dismiss == Swal.DismissReason.cancel) { }
      })
    } else {
      Swal.fire("Vui l??ng ch???n s???n ph???m c???n x??a!", "Xin h??y ch???n c??c s???n ph???m c???n x??a!", "error");
    }
  }

}

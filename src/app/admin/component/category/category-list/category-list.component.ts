import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/model/category';
import { CategoryService } from 'src/service/adminService/categoryService/category.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categories!: Category[];
  page = 1;
  pageSize = 5;
  totalLength: any;
  orderList: String = ''
  isDesc: boolean = true;
  orderSort: String=''
  FILTER_PAG_REGEX = /[^0-9]/g;
  constructor(
    private categoryService: CategoryService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.getCategorySize();
  }


  /** Get all list categories */

  getAllCategories() {
    this.categoryService.getAllCategories(this.page - 1, this.pageSize).subscribe(data => {
      console.log(data);
      this.categories = data;
    })
  }

  /** Get size of categories */

  getCategorySize() {
    this.categoryService.getCategorySize().subscribe(data => {
      this.totalLength = data;
    })
  }

  /** Change pageSize */

  selectPage(page: string) {
    this.page = parseInt(page) || 1;
    this.pageSize = 5
    this.getAllCategories();
  }

  /** Format input */

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(this.FILTER_PAG_REGEX, '');
  }

  /** Sort list categories */
  
  sort(header:any){
    this.isDesc =! this.isDesc
    this.orderSort = header
  }

  /** Search category by name */

  search(key: string): void {
    const result: Category[] = [];
    key = key.trim();
    for (const ct of this.categories) {
      if (ct.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        result.push(ct)
      }
    }
    this.categories = result
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

  /** Get category edit by id  */

  getCategoryEdit(categoryId: any) {
    this.categoryService.getCategoryById(categoryId).subscribe((data: any) => {
      if (data.status === true) {
        this.router.navigate(['/admin/category/update', categoryId]);
      }
      if (data.status === false) {
        Swal.fire({
          title: 'Category does not exist!',
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

  /** Delete category by id */

  deleteCategory(categoryId: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete your category?!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.categoryService.deleteCategory(categoryId).subscribe((data: any) => {
          if (data.status === true) {
            Swal.fire("Delete category successfull!", "You clicked the button!", "success");
            this.getAllCategories();
          }
          if (data.status === false) {
            Swal.fire({
              title: 'Category has been deleted by someone else!',
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
            Swal.fire("Delete category error!", "System error!", "error");
          }
          if (data.status === 501) {
            Swal.fire("Category exists in the product.!", "System error!", "error");
          }
        })
      }
      else if (result.dismiss == Swal.DismissReason.cancel) { }
    })
  }
}

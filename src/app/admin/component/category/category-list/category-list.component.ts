import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/model/category';
import { CategoryService } from 'src/service/adminService/categoryService/category.service';
import Swal from 'sweetalert2'
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

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
  orderSort: String = ''
  searchName: string = '';
  searchs = new FormControl();
  FILTER_PAG_REGEX = /[^0-9]/g;
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.listCategories();
  }

  /** List categories */

  listCategories() {
    if (this.searchName !== '') {
      this.getCategoryByNameAndPage(this.searchName);
    }
    else {
      this.getAllCategories();
    }
  }

  /** Get list category by pagination and search */

  getCategoryByNameAndPage(name: string) {
    this.categoryService.getCategoriesByNameAndPage(name, this.page - 1, this.pageSize).subscribe(this.processResult());
  }

  /** Get all list categories by pagination */

  getAllCategories() {
    this.categoryService.getAllCategories(this.page - 1, this.pageSize).subscribe(this.processResult());
  }

  /** Result data */

  processResult() {
    this.spinner.show();
    return (data: any) => {
      setTimeout(() => {
        console.log(data);
        this.page = data.number + 1;
        this.pageSize = data.size;
        this.categories = data.content;
        this.totalLength = data.totalElements;
        this.spinner.hide();
      }, 1000)

    };
  }

  /** Search keyword category by name */

  search() {
    this.searchs.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(
      value => {
        console.log(value);
        this.searchName = value;
        this.getCategoryByNameAndPage(this.searchName);
      }
    )
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

  sort(header: any) {
    this.isDesc = !this.isDesc
    this.orderSort = header
  }

  checkAllCheckBox(ev: any) {
    this.categories?.forEach((x) => (x.checked = ev.target.checked));
  }

  allCheckBoxChecked() {
    return this.categories?.every((c) => c.checked);
  }

  /** Get category edit by id  */

  getCategoryEdit(categoryId: any) {
    this.categoryService.getCategoryById(categoryId).subscribe((data: any) => {
      if (data.status === true) {
        this.router.navigate(['/admin/category/update', categoryId]);
      }
      if (data.status === false) {
        Swal.fire({
          title: 'Thể loại không tồn tại!',
          text: 'bạn có muốn tải lại trang không?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Có, Tải lại!',
          cancelButtonText: 'Không, Giữ nguyên'
        }).then((result) => {
          if (result.value) {
            this.ngOnInit();
          }
          else if (result.dismiss == Swal.DismissReason.cancel) { }
        })
      }
      if (data.status === 500) {
        Swal.fire("Lỗi!", "Lỗi hệ thống!", "error");
      }
    })
  }

  /** Delete category by id */

  deleteCategory(categoryId: any) {
    Swal.fire({
      title: 'Bạn có chắc?',
      text: 'Bạn có muốn xóa danh mục của mình không?!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Có, Xóa nó!',
      cancelButtonText: 'Không, Giữ nguyên'
    }).then((result) => {
      if (result.value) {
        this.categoryService.deleteCategory(categoryId).subscribe((data: any) => {
          if (data.status === true) {
            Swal.fire("Xóa thể loại thành công!", "Nhấn vào nút để tiếp tục!", "success");
            this.ngOnInit();
          }
          if (data.status === false) {
            Swal.fire({
              title: 'Danh mục đã bị người khác xóa',
              text: 'Bạn có muốn tải lại trang không?',
              icon: 'question',
              showCancelButton: true,
              confirmButtonText: 'Có, Tải lại trang!',
              cancelButtonText: 'Không, Giữ nguyên'
            }).then((result) => {
              if (result.value) {
                this.ngOnInit();
              }
            })
          }
          if (data.status === 500) {
            Swal.fire("Xóa thất bại!", "Lỗi hệ thống!", "error");
          }
          if (data.status === 501) {
            Swal.fire("Thể loại đang tồn tại trong sản phẩm.!", "Lỗi hệ thống!", "error");
          }
        })
      }
      else if (result.dismiss == Swal.DismissReason.cancel) { }
    })
  }

  public deleteCategories() {
    const selectedCategories = this.categories
      ?.filter((category) => category.checked)
      .map((c) => c.categoryId);
    if (selectedCategories && selectedCategories.length > 0) {
      Swal.fire({
        title: 'Bạn có chắc?',
        text: 'Bạn có chắc muốn xóa các thể loại được chọn??!',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Vâng, Xóa nó!',
        cancelButtonText: 'Không, Giữ nó'
      }).then((result) => {
        if (result.isConfirmed) {
          this.categoryService.deleteMultipleCategories(selectedCategories).subscribe(
            (response: void) => {
              Swal.fire("Xóa thành công!", "Nhấn vào nút để tiếp tục!", "success");
              this.ngOnInit();
            },
            (error: HttpErrorResponse) => {
              console.log(error.error.message);
              Swal.fire("Lỗi!", "Lỗi hệ thống!", "error");
            }
          );
        }
        else if (result.dismiss == Swal.DismissReason.cancel) { }
      })
    } else {
      Swal.fire("Làm ơn chọn!", "Bạn chưa chọn bất kỳ thể loại nào!", "error");
    }
  }
}

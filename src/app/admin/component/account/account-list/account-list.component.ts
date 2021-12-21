import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Custommer } from 'src/model/custommer';
import { CustommerService } from 'src/service/adminService/custommerService/custommer.service';
import { FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { NgxSpinnerService } from 'ngx-spinner';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {

  custommers: Custommer[] = [];
  page = 1;
  pageSize = 5;
  totalLength: any;
  preKeyword: string = '';
  keyword: string = '';
  orderList: String = ''
  isDesc: boolean = true;
  orderSort: String = ''
  searchName: string = '';
  searchs = new FormControl();
  FILTER_PAG_REGEX = /[^0-9]/g;

  constructor(
    private custommerService: CustommerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.listProducts();
  }

  /** List custommers */

  listProducts() {
    if (this.searchName !== '') {
      this.getCustommerByName(this.searchName);
    }
    else {
      this.getAllCustommer();
    }
  }

  /** Get all custommers by pagination */

  getAllCustommer() {
    this.spinner.show();
    this.custommerService.getCustommersPage(this.page - 1, this.pageSize).subscribe(this.processResult());
  }

  /** Get all custommers by pagination and search */

  getCustommerByName(fullname: string) {
    this.custommerService.getCustommerByNameAndPage(fullname, this.page - 1, this.pageSize).subscribe(this.processResult());
  }

  /** Result data */

  processResult() {
    this.spinner.show();
    return (data: any) => {
      setTimeout(() => {
        console.log(data);
        this.page = data.number + 1;
        this.pageSize = data.size;
        this.custommers = data.content;
        this.totalLength = data.totalElements;
        this.spinner.hide();
      }, 1000)

    };
  }

  /** Search keyword custommer by fullname */

  search() {
    this.searchs.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(
      value => {
        console.log(value);
        this.searchName = value;
        this.getCustommerByName(this.searchName);
      }
    )
  }

  /** Format input */

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(this.FILTER_PAG_REGEX, '');
  }

  /** Sort list custommers */

  sort(header: any) {
    this.isDesc = !this.isDesc
    this.orderSort = header
  }

  /** Change page size */

  selectPage(page: string) {
    this.page = parseInt(page) || 1;
    this.pageSize = 5
    this.getAllCustommer();
  }

  /** Get custommer edit by id  */

  getCustommerEdit(id: any) {
    this.custommerService.getCustommerById(id).subscribe((data: any) => {
      if (data.status === true) {
        this.router.navigate(['/admin/account/update', id]);
      }
      if (data.status === false) {
        Swal.fire({
          title: 'Custommer không tồn tại!',
          text: 'Bạn có muốn tải lại trang không?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Có, tải lại trang!',
          cancelButtonText: 'Không'
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

  /** Delete custommer by id */

  deleteCustommer(id: any) {
    Swal.fire({
      title: 'Bạn có chắc không?',
      text: 'Bạn có muốn xóa custommer không?!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Có, Xóa !',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.value) {
        this.custommerService.deleteCustommer(id).subscribe((data: any) => {
          if (data.status === true) {
            Swal.fire("Xóa custommer thành công!", "Bạn đã nhấp vào nút!", "success");
            this.ngOnInit();
          }
          if (data.status === false) {
            Swal.fire({
              title: 'Custommer đã bị người khác xóa!',
              text: 'Bạn có muốn tải lại trang không?',
              icon: 'question',
              showCancelButton: true,
              confirmButtonText: 'Có, tải lại trang!',
              cancelButtonText: 'Không'
            }).then((result) => {
              if (result.value) {
                this.ngOnInit();
              }
            })
          }
          if (data.status === 500) {
            Swal.fire("Xóa custommer thất bại!", "Lỗi hệ thống!", "error");
          }
        })
      }
      else if (result.dismiss == Swal.DismissReason.cancel) { }
    })
  }
}

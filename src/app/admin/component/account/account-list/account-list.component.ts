import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Custommer } from 'src/model/custommer';
import { CustommerService } from 'src/service/adminService/custommerService/custommer.service';
import { FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {

  custommers!: Custommer[];
  page = 1;
  pageSize = 5;
  totalLength: any;
  preKeyword: string = '';
  keyword: string = '';
  orderList: String = ''
  isDesc: boolean = true;
  orderSort: String = ''
  search = new FormControl();
  FILTER_PAG_REGEX = /[^0-9]/g;

  constructor(
    private custommerService: CustommerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getAllCustommer();
    this.getCustommerSize();
  }

  /** Get all custommers */

  getAllCustommer() {
    this.spinner.show();
    this.custommerService.getCustommersPage(this.page - 1, this.pageSize).subscribe(data => {
      setTimeout(() => {
        console.log(data);
        this.custommers = data;
        this.spinner.hide();
      },1500)
    })
  }

  /** Get size of custommers */

  getCustommerSize() {
    this.custommerService.getCustommerSize().subscribe(data => {
      this.totalLength = data;
    })
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

  /** Search custommer by username and fullname */

  searchCustommer(key: string): void {
    const result: Custommer[] = [];
    key = key.trim();
    for (const ct of this.custommers) {
      if (ct.username.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || ct.fullname.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        result.push(ct)
      }
    }
    this.custommers = result
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
          title: 'Custommer does not exist!',
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

  /** Delete custommer by id */

  deleteCustommer(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete your custommer?!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.custommerService.deleteCustommer(id).subscribe((data: any) => {
          if (data.status === true) {
            Swal.fire("Delete custommer successfull!", "You clicked the button!", "success");
            this.ngOnInit();
          }
          if (data.status === false) {
            Swal.fire({
              title: 'Custommer has been deleted by someone else!',
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
            Swal.fire("Delete custommer error!", "System error!", "error");
          }
        })
      }
      else if (result.dismiss == Swal.DismissReason.cancel) { }
    })
  }
}

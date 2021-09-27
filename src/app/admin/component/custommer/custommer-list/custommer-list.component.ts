import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/model/account';
import { AccountService } from 'src/service/adminService/accountService/account.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-custommer-list',
  templateUrl: './custommer-list.component.html',
  styleUrls: ['./custommer-list.component.scss']
})
export class CustommerListComponent implements OnInit {

  accounts!: Account[];
  page = 1;
  pageSize = 5;
  totalLength = 0;
  orderList: String = ''
  isDesc: boolean = true;
  orderSort: String=''
  FILTER_PAG_REGEX = /[^0-9]/g;

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllAccounts();
  }

  /** Get all list accounts */

  getAllAccounts() {
    this.accountService.getAccounts().subscribe(data => {
      console.log(data);
      this.accounts = data;
      this.totalLength = this.accounts.length;
    })
  }

  /** Get account edit by id  */

  getAccountEdit(id: any) {
    this.accountService.getAccountById(id).subscribe((data: any) => {
      if (data.status === true) {
        this.router.navigate(['/admin/customer/update', id]);
      }
      if (data.status === false) {
        Swal.fire({
          title: 'Account does not exist!',
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

  /** Sort list accounts */
  
  sort(header:any){
    this.isDesc =! this.isDesc
    this.orderSort = header
  }

  /** Pagination list accounts */

  selectPage(page: string) {
    this.page = parseInt(page) || 1;
  }

  /** Format input */

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(this.FILTER_PAG_REGEX, '');
  }

  /** Search account by fullname and email */

  search(key: string): void {
    const result: Account[] = [];
    key = key.trim();
    for (const acc of this.accounts) {
      if (acc.fullname.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || acc.email.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        result.push(acc)
      }
    }
    this.accounts = result
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

  /** Delete account by id */

  deleteAccount(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete your account?!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.accountService.deleteAccount(id).subscribe((data: any) => {
          if (data.status === true) {
            Swal.fire("Delete account successfull!", "You clicked the button!", "success");
            this.getAllAccounts();
          }
          if (data.status === false) {
            Swal.fire({
              title: 'Account has been deleted by someone else!',
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
            Swal.fire("Delete account error!", "System error!", "error");
          }
        })
      }
      else if (result.dismiss == Swal.DismissReason.cancel) { }
    })
  }
}

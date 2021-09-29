import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/service/adminService/accountService/account.service'; 
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Account } from 'src/model/account';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-custommer-add',
  templateUrl: './custommer-add.component.html',
  styleUrls: ['./custommer-add.component.scss']
})
export class CustommerAddComponent implements OnInit {
  
  @ViewChild('input') input!: ElementRef;
  customerForm!: FormGroup;
  account: Account = new Account();

  constructor(
    private accountService: AccountService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÁÂĂ]+(\\s[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÁÂĂ]+)*$")]],
      email: ['',[Validators.required, Validators.pattern("^\\w{5,}.?\\w+(@\\w{3,8})(.\\w{3,8})+$")]],
      fullname: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(50),Validators.pattern("^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÁÂĂ]+(\\s[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÁÂĂ]+)*$")]],
      password: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      gender: ['',[Validators.required]]
    });
  }

  get f() {
    return this.customerForm.controls;
  }

  /** Tab in form */
  
  onKey(event: any) {
    if (event.key === 'Tab') {
      this.input.nativeElement.focus();
    }
  }

  /** Validate form field */

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  /** Create account */

  saveAccount() {
    this.accountService.createAccount(this.account).subscribe((data:any) => {
      console.log(data);
      if(data.status === true){
        Swal.fire("Add account successfull!", "You clicked the button!", "success");
        this.getListAccounts();
      }
      if(data.status === false){
        Swal.fire("Add account error!", "Account already exist!", "error");
      }
      if(data.status === 500){
        Swal.fire("Add account error!", "System error!", "error");
      }
    })
  }

  /** Get router go to list account */

  getListAccounts() {
    this.router.navigate(['/admin/customer/list']);
  }

  /** Submit account */

  onSubmit() {
    if(this.customerForm.valid){
      this.account.username = this.customerForm.value.username;
      this.account.fullname = this.customerForm.value.fullname;
      this.account.email = this.customerForm.value.email;
      this.account.password = this.customerForm.value.password;
      this.account.gender = this.customerForm.value.gender;
      this.saveAccount();
    }
    else{
      Swal.fire("Add account error!", "You clicked the button!", "error");
      this.validateAllFormFields(this.customerForm);
    }
  }
}

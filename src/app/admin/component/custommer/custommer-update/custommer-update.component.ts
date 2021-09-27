import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/model/account';
import { AccountService } from 'src/service/adminService/accountService/account.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-custommer-update',
  templateUrl: './custommer-update.component.html',
  styleUrls: ['./custommer-update.component.scss']
})
export class CustommerUpdateComponent implements OnInit {

  id: any;
  account: Account = new Account();
  customerForm!: FormGroup;
  @ViewChild('input') input!: ElementRef;
  
  constructor(
    private accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.accountService.getAccountById(this.id).subscribe((data:any) => {
      if(data.status === true){
        const rs = data.result;
        console.log(rs);
        this.account = rs;
        this.customerForm.patchValue(rs);
      }
      else{
        Swal.fire("error!", "System error!", "error");
      }
      
    })
    
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

  /** Update account */

  updateAccount(){
    this.accountService.updateAccount(this.id, this.account).subscribe((data:any) => {
      if(data.status === true){
        Swal.fire("Update account successfull!", "You clicked the button!", "success");
        this.getListAccounts();
      }
      if(data.status === false){
        Swal.fire("Update account error!", "Account already exist!", "error");
      }
      if(data.status === 500){
        Swal.fire("Update account error!", "System error!", "error");
      }
    })
  }

  /** OnSubmit form */

  onSubmit() {
    if(this.customerForm.valid){
      this.account.username = this.customerForm.value.username;
      this.account.fullname = this.customerForm.value.fullname;
      this.account.email = this.customerForm.value.email;
      this.account.password = this.customerForm.value.password;
      this.account.gender = this.customerForm.value.gender;
      this.updateAccount();
    }
    else{
      Swal.fire("Update account error!", "You clicked the button!", "error");
      this.validateAllFormFields(this.customerForm);
    }
  }

  /** Go to list account */

  getListAccounts() {
    this.router.navigate(['/admin/customer/list']);
  }
}

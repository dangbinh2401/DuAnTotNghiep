import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Custommer } from 'src/model/custommer';
import { CustommerService } from 'src/service/adminService/custommerService/custommer.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.scss']
})
export class AccountAddComponent implements OnInit {

  @ViewChild('input') input!: ElementRef;
  custommerForm!: FormGroup;
  custommer: Custommer = new Custommer();

  constructor(
    private custommerService: CustommerService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.custommerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(3), Validators.pattern("^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÁÂĂ]+(\\s[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÁÂĂ]+)*$")]],
      fullname: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(5), Validators.pattern("^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÁÂĂ]+(\\s[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÁÂĂ]+)*$")]],
      email: ['',[Validators.required, Validators.pattern("^\\w{5,}.?\\w+(@\\w{3,8})(.\\w{3,8})+$")]],
      password: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
    });
  }


  get f() {
    return this.custommerForm.controls;
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

  saveAccount() {
    this.custommerService.createCustommer(this.custommer).subscribe((data:any) => {
      console.log(data);
      if(data.status === true){
        Swal.fire("Add custommer successfull!", "You clicked the button!", "success");
        this.getListCustommers();
      }
      if(data.status === false){
        Swal.fire("Add custommer error!", "Account already exist!", "error");
      }
      if(data.status === 500){
        Swal.fire("Add custommer error!", "System error!", "error");
      }
    })
  }

  /** Get router go to list account */

  getListCustommers() {
    this.router.navigate(['/admin/account/list']);
  }

  /** Submit account */

  onSubmit() {
    if(this.custommerForm.valid){
      this.custommer.username = this.custommerForm.value.username;
      this.custommer.fullname = this.custommerForm.value.fullname;
      this.custommer.email = this.custommerForm.value.email;
      this.custommer.password = this.custommerForm.value.password;
      this.saveAccount();
    }
    else{
      Swal.fire("Add custommer error!", "You clicked the button!", "error");
      this.validateAllFormFields(this.custommerForm);
    }
  }
}

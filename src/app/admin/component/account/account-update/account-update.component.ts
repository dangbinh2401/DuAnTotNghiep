import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Custommer } from 'src/model/custommer';
import { CustommerService } from 'src/service/adminService/custommerService/custommer.service';
import Swal from 'sweetalert2'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-account-update',
  templateUrl: './account-update.component.html',
  styleUrls: ['./account-update.component.scss']
})
export class AccountUpdateComponent implements OnInit {

  id: any;
  custommer: Custommer = new Custommer();
  custommerForm!: FormGroup;
  @ViewChild('input') input!: ElementRef;

  constructor(
    private custommerService: CustommerService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.id = this.activatedRoute.snapshot.params['id'];
    this.custommerService.getCustommerById(this.id).subscribe((data: any) => {
      if (data.status === true) {
        setTimeout(() => {
          const rs = data.result;
          console.log(rs);
          this.custommer = rs;
          this.custommerForm.patchValue(rs);
          this.spinner.hide();
        },1500)
      }
      else {
        Swal.fire("Lỗi!", "Lỗi hệ thống!", "error");
      }

    })


    this.custommerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(3), Validators.pattern("^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÁÂĂ]+(\\s[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÁÂĂ]+)*$")]],
      fullname: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(5), Validators.pattern("^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÁÂĂ]+(\\s[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÁÂĂ]+)*$")]],
      email: ['', [Validators.required, Validators.pattern("^\\w{5,}.?\\w+(@\\w{3,8})(.\\w{3,8})+$")]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
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

  /** Update category */

  updateCustommer() {
    this.custommerService.updateCustommer(this.id, this.custommer).subscribe((data: any) => {
      if (data.status === true) {
        Swal.fire("Cập nhật custommer thành công!", "Bạn đã nhấp vào nút!", "success");
        this.getListCustommers();
      }
      if (data.status === false) {
        Swal.fire("Cập nhật custommer thất bại!", "Tài khoản đã tồn tại!", "error");
      }
      if (data.status === 500) {
        Swal.fire("Cập nhật custommer thất bại!", "Lỗi hệ thống!", "error");
      }
    })
  }

  /** Get router go to list account */

  getListCustommers() {
    this.router.navigate(['/admin/account/list']);
  }

  /** Submit account */

  onSubmit() {
    if (this.custommerForm.valid) {
      this.custommer.username = this.custommerForm.value.username;
      this.custommer.fullname = this.custommerForm.value.fullname;
      this.custommer.email = this.custommerForm.value.email;
      this.custommer.password = this.custommerForm.value.password;
      this.updateCustommer();
    }
    else {
      Swal.fire("Thêm custommer thất bại!", "Bạn đã nhấp vào nút!", "error");
      this.validateAllFormFields(this.custommerForm);
    }
  }
}

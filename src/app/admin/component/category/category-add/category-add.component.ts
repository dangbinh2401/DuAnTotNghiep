import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/model/category';
import { CategoryService } from 'src/service/adminService/categoryService/category.service'; 
import Swal from 'sweetalert2'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {

  @ViewChild('input') input!: ElementRef;
  categoryForm!: FormGroup;
  category: Category = new Category();
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(3), Validators.pattern("^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÁÂĂ]+(\\s[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÁÂĂ]+)*$")]]
    });
  }

  get f() {
    return this.categoryForm.controls;
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

  /** Create category */

  saveCategory() {
    this.categoryService.createCategory(this.category).subscribe((data:any) => {
      console.log(data);
      if(data.status === true){
        Swal.fire("Add category successfull!", "You clicked the button!", "success");
        this.getListCategories();
      }
      if(data.status === false){
        Swal.fire("Add category error!", "Category already exist!", "error");
      }
      if(data.status === 500){
        Swal.fire("Add category error!", "System error!", "error");
      }
    })
  }

  /** Get router go to list category */

  getListCategories() {
    this.router.navigate(['/admin/category/list']);
  }

  /** Submit category */

  onSubmit() {
    if(this.categoryForm.valid){
      this.category.name = this.categoryForm.value.name;
      this.saveCategory();
    }
    else{
      Swal.fire("Add category error!", "You clicked the button!", "error");
      this.validateAllFormFields(this.categoryForm);
    }
  }

}

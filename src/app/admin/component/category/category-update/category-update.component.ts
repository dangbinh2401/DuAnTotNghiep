import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/model/category';
import { CategoryService } from 'src/service/adminService/categoryService/category.service'; 
import Swal from 'sweetalert2'

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.scss']
})
export class CategoryUpdateComponent implements OnInit {

  categoryId: any;
  category: Category = new Category();
  categoryForm!: FormGroup;
  @ViewChild('input') input!: ElementRef;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.categoryId = this.activatedRoute.snapshot.params['categoryId'];
    this.categoryService.getCategoryById(this.categoryId).subscribe((data:any) => {
      if(data.status === true){
        const rs = data.result;
        console.log(rs);
        this.category = rs;
        this.categoryForm.patchValue(rs);
      }
      else{
        Swal.fire("error!", "System error!", "error");
      }
      
    })

    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(3), Validators.pattern("^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÁÂĂ]+(\\s[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÁÂĂ]+)*$")]]
    });
  }


  get f() {
    return this.categoryForm.controls;
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

  /** Update category */

  updateCategory(){
    this.categoryService.updateCategory(this.categoryId, this.category).subscribe((data:any) => {
      if(data.status === true){
        Swal.fire("Update category successfull!", "You clicked the button!", "success");
        this.getListCategories();
      }
      if(data.status === false){
        Swal.fire("Update category error!", "Account already exist!", "error");
      }
      if(data.status === 500){
        Swal.fire("Update category error!", "System error!", "error");
      }
    })
  }

  /** Get router go to list category */

  getListCategories() {
    this.router.navigate(['/admin/category/list']);
  }

  /** OnSubmit form */

  onSubmit() {
    if(this.categoryForm.valid){
      this.category.name = this.categoryForm.value.name;
      this.updateCategory();
    }
    else{
      Swal.fire("Update category error!", "You clicked the button!", "error");
      this.validateAllFormFields(this.categoryForm);
    }
  }
}

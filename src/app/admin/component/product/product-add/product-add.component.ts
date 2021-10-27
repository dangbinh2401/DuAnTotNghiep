import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { Category } from 'src/model/category';
import { ProductService } from 'src/service/adminService/productService/product.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { Product } from 'src/model/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  @ViewChild('input') input!: ElementRef;
  categories!: Category[];
  imagePath: any;
  imgURL: any;
  userFile: any = File;
  year= new Date().getFullYear();
  productForm!: FormGroup;
  product: Product = new Product();
  nameImg:any;

  constructor(
    private productService: ProductService,
    private router: Router,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(150), Validators.minLength(3), Validators.pattern("^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÁÂĂ]+(\\s[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÁÂĂ]+)*$")]],
      quantity: ['', [Validators.required, Validators.min(1), Validators.max(1000)]],
      unitPrice: ['', [Validators.required, Validators.min(10000), Validators.max(100000000)]],
      discount: ['', [Validators.required, Validators.min(1), Validators.max(90)]],
      enteredDate: ['', [Validators.required, Validators.max(this.year)]],
      image: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      description: ['', [Validators.maxLength(1000)]]
    });

    this.getCategory();
  }
  
  get f() {
    return this.productForm.controls;
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

  /** Get router go to list product */

  getListProducts() {
    this.router.navigate(['/admin/product/list']);
  }

  getCategory() {
    this.productService.getCategory().subscribe((data:any) => {
      console.log("cr",data);
      this.categories = data;
    })
  }

  onSelectFile(event:any) {
    const file = event.target.files[0];
    this.userFile = file;
    console.log(file);
    var form = new FormData();
		form.append('files',this.userFile);
    this.productService.uploadImage(form).subscribe((data:any) => {
      console.log(data);
      this.productForm.value.image = data.name;
      this.nameImg = this.productForm.value.image;
    })
    var reader = new FileReader();
    this.imagePath = file;
    reader.readAsDataURL(file); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

  /** Create product */

  saveProduct() {
    this.productService.createProduct(this.product).subscribe((data:any) => {
      console.log(data);
      if(data.status === true){
        Swal.fire("Add product successfull!", "You clicked the button!", "success");
        this.getListProducts();
      }
      else{
        Swal.fire("Add product error!", "System error!", "error");
      }
    })
  }

  /** Submit category */

  onSubmit() {
    if(this.productForm.valid){
      this.product.name = this.productForm.value.name;
      this.product.quantity = this.productForm.value.quantity;
      this.product.unitPrice = this.productForm.value.unitPrice;
      this.product.discount = this.productForm.value.discount;
      this.product.image = this.nameImg;
      this.product.enteredDate = this.productForm.value.enteredDate;
      this.product.description = this.productForm.value.description;
      this.product.categoryId = this.productForm.value.categoryId;  
      // this.product.categoryId = this.product.category.categoryId
      // this.productDto.categoryId = this.productDto.product.categoryId
      // this.productDto = this.productForm.value
      this.saveProduct();
    }
    else{
      Swal.fire("Add product error!", "You clicked the button!", "error");
      this.validateAllFormFields(this.productForm);
    }
  }
}

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/model/category';
import { Product } from 'src/model/product';
import { ProductService } from 'src/service/adminService/productService/product.service';
import Swal from 'sweetalert2'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {

  productId: any;
  product: Product = new Product();
  productForm!: FormGroup;
  year = new Date().getFullYear();
  imagePath: any;
  imgURL: any;
  userFile: any = File;
  nameImg: any;
  categories!: Category[];
  @ViewChild('input') input!: ElementRef;

  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.productId = this.activatedRoute.snapshot.params['productId'];
    this.productService.getProductById(this.productId).subscribe((data: any) => {
      if (data.status === true) {
        setTimeout(() => {
          const rs = data.result;
          console.log(rs);
          this.product = rs;
          this.productForm.controls['name'].setValue(rs.name);
          this.productForm.controls['quantity'].setValue(rs.quantity);
          this.productForm.controls['unitPrice'].setValue(rs.unitPrice);
          this.productForm.controls['discount'].setValue(rs.discount);
          this.productForm.controls['enteredDate'].setValue(rs.enteredDate);
          // this.productForm.controls['image'].setValue(rs.image);
          this.productForm.controls['categoryId'].setValue(rs.category.categoryId);
          this.productForm.controls['description'].setValue(rs.description);
          // this.productForm.patchValue(rs);
          this.getCategory();
          this.spinner.hide();
        },1500)
      }
      else {
        Swal.fire("error!", "System error!", "error");
      }

    })

    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(150), Validators.minLength(3), Validators.pattern("^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÁÂĂ]+(\\s[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÁÂĂ]+)*$")]],
      quantity: ['', [Validators.required, Validators.min(1), Validators.max(1000)]],
      unitPrice: ['', [Validators.required, Validators.min(10000)]],
      discount: ['', [Validators.required, Validators.min(1), Validators.max(90)]],
      enteredDate: ['', [Validators.required, Validators.max(this.year)]],
      image: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      description: ['', [Validators.maxLength(1000)]]
    });
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
    this.productService.getCategory().subscribe((data: any) => {
      console.log("cr", data);
      this.categories = data;
    })
  }

  onSelectFile(event: any) {
    const file = event.target.files[0];
    this.userFile = file;
    console.log(file);
    var form = new FormData();
    form.append('files', this.userFile);
    this.productService.uploadImage(form).subscribe((data: any) => {
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

  /** Update product */

  updateproduct() {
    this.productService.updateProduct(this.productId, this.product).subscribe((data: any) => {
      if (data.status === true) {
        Swal.fire("Update product successfull!", "You clicked the button!", "success");
        this.getListProducts();
      }
      if (data.status === false) {
        Swal.fire("Update product error!", "Product already exist!", "error");
      }
      if (data.status === 500) {
        Swal.fire("Update product error!", "System error!", "error");
      }
    })
  }

  /** OnSubmit form */

  onSubmit() {
    if (this.productForm.valid) {
      this.product.name = this.productForm.value.name;
      this.product.quantity = this.productForm.value.quantity;
      this.product.unitPrice = this.productForm.value.unitPrice;
      this.product.discount = this.productForm.value.discount;
      this.product.image = this.nameImg;
      this.product.enteredDate = this.productForm.value.enteredDate;
      this.product.description = this.productForm.value.description;
      this.product.categoryId = this.productForm.value.categoryId;
      this.updateproduct();
    }
    else {
      Swal.fire("Update product error!", "You clicked the button!", "error");
      this.validateAllFormFields(this.productForm);
    }
  }

}

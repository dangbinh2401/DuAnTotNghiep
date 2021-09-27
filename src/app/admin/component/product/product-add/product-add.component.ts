import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { Category } from 'src/model/category';
import { ProductService } from 'src/service/productService/product.service';
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

  categories!: Category[];
  imagePath: any;
  imgURL: any;
  userFile: any = File;
  productForm!: FormGroup;
  product: Product = new Product();

  constructor(
    private productService: ProductService,
    private router: Router,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(150), Validators.minLength(3), Validators.pattern("^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÁÂĂ]+(\\s[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÁÂĂ]+)*$")]],
      quantity: ['', [Validators.required, Validators.min(1), Validators.max(1000)]],
      unitPrice: ['', [Validators.required, Validators.min(10.000)]],
      discount: ['', [Validators.required, Validators.min(1), Validators.max(90)]],
      enteredDate: ['', [Validators.required]]
    });

    this.getCategory();
  }

  getCategory() {
    this.productService.getCategory().subscribe((data:any) => {
      this.categories = data;
    })
  }

  onSelectFile(event:any) {
    const file = event.target.files[0];
    this.userFile = file;
    console.log(file);
    var form = new FormData();
		form.append('files',this.userFile);
    this.productService.uploadImage(form).subscribe(data => {
      console.log(data);
    })
    var reader = new FileReader();
    this.imagePath = file;
    reader.readAsDataURL(file); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }
}

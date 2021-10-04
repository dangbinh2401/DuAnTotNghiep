import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/model/order';
import { OrderDetail } from 'src/model/orderDetail';
import { Purchase } from 'src/model/purchase';
import { CartService } from 'src/service/userService/cartService/cart.service';
import { PurchaseService } from 'src/service/userService/purchaseService/purchase.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  @ViewChild('input') input!: ElementRef;
  checkoutForm!: FormGroup;
  totalQuantity: number = 0;
  totalPrice: number = 0;
  store: Storage = sessionStorage;
  username!: string;
  orderDetails!: OrderDetail[];

  constructor(
    private purchaseService: PurchaseService,
    private router: Router,
    private formBuilder: FormBuilder,
    private cartService: CartService
  ) { }

  ngOnInit(): void {

    this.getUsername();

    this.checkoutForm = this.formBuilder.group({
      order: this.formBuilder.group({
        adress: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(150)]],
        phone: ['', [Validators.required, Validators.pattern("[0][0-9]{9}")]]
      }),
      account: this.formBuilder.group({
        username: [this.username, [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÁÂĂ]+(\\s[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÁÂĂ]+)*$")]],
        fullname: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.pattern("^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÁÂĂ]+(\\s[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÁÂĂ]+)*$")]],
        email: ['', [Validators.required, Validators.pattern("^\\w{5,}.?\\w+(@\\w{3,8})(.\\w{3,8})+$")]],
      })
    });

    this.cartDetails();
  }

  /** Load username in session to form */

  getUsername() {
    let userCredentials = JSON.parse(this.store.getItem('auth-user') as string);
    this.username = userCredentials.username;
    console.log(this.username);
  }

  get f() {
    return this.checkoutForm.controls;
  }

  get userName() {
    return this.checkoutForm.get('account.username');
  }

  get fullName() {
    return this.checkoutForm.get('account.fullname');
  }

  get email() {
    return this.checkoutForm.get('account.email');
  }

  get adress() {
    return this.checkoutForm.get('order.adress');
  }

  get phone() {
    return this.checkoutForm.get('order.phone');
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

  /** Submit order */

  onSubmit() {
    if (this.checkoutForm.invalid) {
      // this.checkoutForm.markAllAsTouched();
      Swal.fire("error!", "Order error!", "error");
      this.validateAllFormFields(this.checkoutForm);
      return;
    }
    else {
      // set data order

      let order = new Order();
      order.totalQuantity = this.totalQuantity;
      order.totalPrice = this.totalPrice;
      order.status = Number(1);
      order.adress = this.checkoutForm.value.order.adress;
      order.phone = this.checkoutForm.value.order.phone;

      // set data order detail

      const cartItemss = this.cartService.cartItem;
      this.orderDetails = cartItemss.map(item => new OrderDetail(item));
      console.log("items", this.orderDetails)


      let purchase = new Purchase;
      purchase.custommer = this.checkoutForm.controls['account'].value;
      purchase.order = order;
      purchase.orderDetails = this.orderDetails;

      this.purchaseService.Order(purchase).subscribe(data => {
        console.log(data);
        this.resetCart();
        Swal.fire("Order successfull!", "You clicked the button!", "success");
        
      }, error => {
        console.log(error);
        Swal.fire("Order error!", "System error!", "error");
      })
    }

  }

  /** Reset when submit order */

  resetCart() {
    // reset cart
    this.store.removeItem('cartItems');
    this.cartService.cartItem = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    // reset form
    this.checkoutForm.reset();

    // go to products list
    this.router.navigate(['/user/productList']);
  }

  /** Load totalPrice and totalQuantity to form order */

  cartDetails() {

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
    this.cartService.calculateTotalPrice();
  }

}

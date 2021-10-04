import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderHistory } from 'src/model/orderHistory';
import { OrderHistoryService } from 'src/service/userService/orderHistoryService/order-history.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  orderList!: any;
  orderDetails!: any;
  storage: Storage = sessionStorage;
  username!: string;
  order!: OrderHistory;
  orderId: any;
  orderHistory: OrderHistory = new OrderHistory();

  constructor(
    public orderHistoryService: OrderHistoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getOrderHistory();
  }

  /** Get list order history */

  getOrderHistory() {
    let userCredentials = JSON.parse(this.storage.getItem('auth-user') as string);
    this.username = userCredentials.username;
    this.orderHistoryService.getOrderHistory(this.username).subscribe(data => {
      console.log(data);
      this.orderList = data;
    })
  }

  /** Get order detail by orderId */

  getOrderDetail(orderId: any) {
    this.orderHistoryService.getOrderDetail(orderId).subscribe(data => {
      console.log(data);
      this.orderDetails = data;
    })
  }

  /** Update status order to cancel */

  updateCancel(orderId: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to cancel your order?!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.orderHistoryService.updateOrderCancel(orderId, this.orderHistory).subscribe((data: any) => {
          if (data.status === true) {
            this.orderHistory.status = 0;
            this.ngOnInit();
          }
          if (data.status === false) {
            Swal.fire("Update order error!", "System error!", "error");
          }
        })
      }
      else if (result.dismiss == Swal.DismissReason.cancel) { }
    })
  }

  /** Update status order to pending */

  updatePending(orderId: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to pending your order?!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.orderHistoryService.updateOrderPending(orderId, this.orderHistory).subscribe((data: any) => {
          if (data.status === true) {
            this.orderHistory.status = 1;
            this.ngOnInit();
          }
          if (data.status === false) {
            Swal.fire("Update order error!", "System error!", "error");
          }
        })
      }
      else if (result.dismiss == Swal.DismissReason.cancel) { }
    })
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderHistory } from 'src/model/orderHistory';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  host: string = "http://localhost:8080";
  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<OrderHistory[]> {
    return this.http.get<OrderHistory[]>(environment.baseUrl+'orders');
  }

  getOrderSize() {
    return this.http.get(environment.baseUrl+'orderSize');
  }

  getOrderDetail(orderId: any): Observable<Object[]> {
    return this.http.get<Object[]>(environment.baseUrl + 'orderDetail' + `?orderId=${orderId}`);
  }

  updateOrderDelivering(orderId: any, orderHistory: OrderHistory): Observable<OrderHistory> {
    return this.http.put<OrderHistory>(environment.baseUrl + 'updateDelivering/' + orderId, orderHistory);
  }
}

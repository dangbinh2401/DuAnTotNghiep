import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OrderHistory } from 'src/model/orderHistory';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  host: string = "http://localhost:8080";
  constructor(private http: HttpClient) { }

  getOrderHistory(username: string): Observable<Object[]> {
    return this.http.get<Object[]>(environment.baseUrl + 'orderHistory' + `?username=${username}`);
  }

  getOrderDetail(orderId: any): Observable<Object[]> {
    return this.http.get<Object[]>(environment.baseUrl + 'orderDetail' + `?orderId=${orderId}`);
  }

  updateOrderCancel(orderId: any, orderHistory: OrderHistory): Observable<OrderHistory> {
    return this.http.put<OrderHistory>(environment.baseUrl + 'updateCancel/' + orderId, orderHistory);
  }

  updateOrderPending(orderId: any, orderHistory: OrderHistory): Observable<OrderHistory> {
    return this.http.put<OrderHistory>(environment.baseUrl + 'updatePending/' + orderId, orderHistory);
  }
}

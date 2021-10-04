import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Purchase } from 'src/model/purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient) { }

  Order(purchase:Purchase): Observable<any> {
    return this.http.post<Purchase>(environment.baseUrl+'purchase',purchase);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Product } from 'src/model/product';
import { Category } from 'src/model/category';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  host :string = "http://localhost:8080";
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.baseUrl+'listProduct');
  }

  getCategory(): Observable<Category[]>{
    return this.http.get<Category[]>(environment.baseUrl+'categories');
  }
}

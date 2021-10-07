import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Product } from 'src/model/product';
import { Category } from 'src/model/category';
import { ResponseProducts } from 'src/response/productResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  host :string = "http://localhost:8080";
  constructor(private http: HttpClient) { }

  // getAllProducts(): Observable<Product[]> {
  //   return this.http.get<Product[]>(environment.baseUrl+'listProduct');
  // }

  getAllProducts(page:any, size: any): Observable<ResponseProducts> {
    return this.http.get<ResponseProducts>(environment.baseUrl+'productPage'+`?page=${page}&size=${size}`);
  }

  getProductByNameAndPage(name: string, page:any, size: any): Observable<ResponseProducts> {
    return this.http.get<ResponseProducts>(environment.baseUrl+'productSearchAndPage'+`?name=${name}&page=${page}&size=${size}`);
  }

  getProductByCategory(categoryId: any, page:any, size: any): Observable<ResponseProducts> {
    return this.http.get<ResponseProducts>(environment.baseUrl+'productByCategory'+`?categoryId=${categoryId}&page=${page}&size=${size}`);
  }

  getCategory(): Observable<Category[]>{
    return this.http.get<Category[]>(environment.baseUrl+'categories');
  }

  getProductTop(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.baseUrl+'productTop');
  }
}

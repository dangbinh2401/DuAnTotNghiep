import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Category } from 'src/model/category';
import { Product } from 'src/model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = "http://localhost:8080/rest/files/image"
  host :string = "http://localhost:8080";
  constructor(private http: HttpClient) { }

  getCategory(): Observable<Category[]>{
    return this.http.get<Category[]>(environment.baseUrl+'categories');
  }

  uploadImage(form: FormData): Observable<any> {
    return this.http.post(this.url,form);
  }

  getAllProducts(page:any, size: any): Observable<Product[]> {
    return this.http.get<Product[]>(environment.baseUrl+'productPage'+`?page=${page}&size=${size}`);
  }

  getProductSize() {
    return this.http.get(environment.baseUrl+'productSize');
  }

  getProductById(productId:any): Observable<Product> {
    return this.http.get<Product>(environment.baseUrl+'product/'+productId);
  }

  createProduct(product:Product): Observable<Product> {
    return this.http.post<Product>(environment.baseUrl+'product/',product);
  }

  updateProduct(productId:any, product:Product): Observable<Product> {
    return this.http.put<Product>(environment.baseUrl+'product/'+productId,product);
  }

  deleteProduct(productId:any) {
    return this.http.delete(environment.baseUrl+'product/'+productId);
  }
}

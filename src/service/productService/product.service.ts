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
  constructor(private http: HttpClient) { }

  getCategory(){
    return this.http.get(environment.baseUrl+'categories');
  }

  uploadImage(form: FormData): Observable<any> {
    return this.http.post(this.url,form);
  }
}

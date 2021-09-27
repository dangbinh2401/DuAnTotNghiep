import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/model/category'; 
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategories(page:any, size: any): Observable<Category[]> {
    return this.http.get<Category[]>(environment.baseUrl+'categoryPage'+`?page=${page}&size=${size}`);
  }

  getCategorySize() {
    return this.http.get(environment.baseUrl+'categorySize');
  }

  getCategoryById(categoryId:any): Observable<Category> {
    return this.http.get<Category>(environment.baseUrl+'category/'+categoryId);
  }

  createCategory(category:Category): Observable<Category> {
    return this.http.post<Category>(environment.baseUrl+'category/',category);
  }

  updateCategory(categoryId:any, account:Category): Observable<Category> {
    return this.http.put<Category>(environment.baseUrl+'category/'+categoryId,account);
  }

  deleteCategory(categoryId:any) {
    return this.http.delete(environment.baseUrl+'category/'+categoryId);
  }
}

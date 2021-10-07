import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Custommer } from 'src/model/custommer';
import { ResponseCustommers } from 'src/response/custommerResponse';

@Injectable({
  providedIn: 'root'
})
export class CustommerService {

  constructor(private http: HttpClient) { }

  getCustommersPage(page: any, size: any): Observable<ResponseCustommers> {
    return this.http.get<ResponseCustommers>(environment.baseUrl + 'custommersPage' + `?page=${page}&size=${size}`);
  }

  getCustommerByNameAndPage(fullname: string, page: any, size: any): Observable<ResponseCustommers> {
    return this.http.get<ResponseCustommers>(environment.baseUrl + 'custommerSearchAndPage' + `?fullname=${fullname}&page=${page}&size=${size}`);
  }

  getCustommerSize() {
    return this.http.get(environment.baseUrl + 'custommerSize');
  }

  getCustommerById(id: any): Observable<Custommer> {
    return this.http.get<Custommer>(environment.baseUrl + 'custommer/' + id);
  }

  createCustommer(custommer: Custommer): Observable<Custommer> {
    return this.http.post<Custommer>(environment.baseUrl + 'signup/', custommer);
  }

  updateCustommer(id: any, custommer: Custommer): Observable<Custommer> {
    return this.http.put<Custommer>(environment.baseUrl + 'custommer/' + id, custommer);
  }

  deleteCustommer(id: any) {
    return this.http.delete(environment.baseUrl + 'custommer/' + id);
  }
}

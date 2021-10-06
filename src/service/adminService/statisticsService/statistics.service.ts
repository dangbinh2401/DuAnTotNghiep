import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) { }

  getReportByCategory(): Observable<Object[]> {
    return this.http.get<Object[]>(environment.baseUrl+'reportByCategory');
  }

  getImportProduct(enteredDate:any): Observable<Object[]> {
    return this.http.get<Object[]>(environment.baseUrl+'reportProduct'+`?enteredDate=${enteredDate}`);
  }
}

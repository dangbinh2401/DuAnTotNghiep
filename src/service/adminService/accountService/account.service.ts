import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from 'src/model/account';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(environment.baseUrl+'accounts');
  }

  getAccountById(id:any): Observable<Account> {
    return this.http.get<Account>(environment.baseUrl+'account/'+id);
  }

  createAccount(account:Account): Observable<Account> {
    return this.http.post<Account>(environment.baseUrl+'account/',account);
  }

  updateAccount(id:any, account:Account): Observable<Account> {
    return this.http.put<Account>(environment.baseUrl+'account/'+id,account);
  }

  deleteAccount(id:any) {
    return this.http.delete(environment.baseUrl+'account/'+id);
  }
}

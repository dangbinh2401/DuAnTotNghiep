import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from 'src/model/comment';
import { Custommer } from 'src/model/custommer';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  createComment(comment:Comment): Observable<Comment> {
    return this.http.post<Comment>(environment.baseUrl+'comment/',comment);
  }

  findCustommerByUsername(username:string): Observable<Custommer> {
    return this.http.get<Custommer>(environment.baseUrl+'custommer'+`?username=${username}`);
  }

  getComment(productId:any): Observable<Comment> {
    return this.http.get<Comment>(environment.baseUrl+'comments'+`?productId=${productId}`);
  }

  getCommentSize(productId:any) {
    return this.http.get(environment.baseUrl+'commentSize'+`?productId=${productId}`);
  }
}

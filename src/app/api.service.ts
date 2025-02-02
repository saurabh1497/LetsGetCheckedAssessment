import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:9000';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/posts`);
  }

  getPostById(postId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/posts/${postId}`);
  }

  getComments(postId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/comments?postId=${postId}`);
  }

  addComment(postId: number, comment: { name: string, content: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/comments`, {user: comment.name, content: comment.content, postId});
  }

  updateComment(commentId: number, comment: { name: string, content: string }): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/comments/${commentId}`, {
      user: comment.name,
      content: comment.content
    });
  }
}

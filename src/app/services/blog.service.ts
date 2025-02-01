// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class BlogService {
//   private API_URL = 'http://localhost:9000';

//   constructor(private http: HttpClient) {}

//   getPosts(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.API_URL}/posts`);
//   }

//   getPostById(id: number): Observable<any> {
//     return this.http.get<any>(`${this.API_URL}/posts/${id}`);
//   }

//   getComments(postId: number): Observable<any[]> {
//     return this.http.get<any[]>(`${this.API_URL}/posts/${postId}/comments`);
//   }

//   addComment(postId: number, comment: { body: string; author: string }): Observable<any> {
//     return this.http.post(`${this.API_URL}/posts/${postId}/comments`, comment);
//   }
// }

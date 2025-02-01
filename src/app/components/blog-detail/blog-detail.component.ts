import { Component, OnInit } from '@angular/core';  
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { NgFor, NgIf } from '@angular/common';
import { CommentFormComponent } from '../comment-form/comment-form.component'

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  imports: [NgFor, NgIf, CommentFormComponent]
})
export class BlogDetailComponent implements OnInit {
  post: any;
  comments: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.apiService.getPost(+postId).subscribe((data: any) => {
        this.post = data;
      });
      this.apiService.getComments(+postId).subscribe((data: any) => {
        this.comments = data;
      });
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  imports: [NgFor, NgIf, ReactiveFormsModule]
})
export class PostDetailComponent implements OnInit {
  post: any;
  comments: any[] = [];
  commentForm: FormGroup;
  postId!: number;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private fb: FormBuilder
  ) 
  
  {
    this.commentForm = this.fb.group({
      name: [''],
      content: ['']
      
    });
  }

  ngOnInit(): void {
    this.postId = Number(this.route.snapshot.paramMap.get('id'));

    this.commentForm = new FormGroup({
      name: new FormControl(''),
      content: new FormControl('')
    });
    
    // Fetch post details
    this.apiService.getPostById(this.postId).subscribe(
      (response) => this.post = response,
      (error) => console.error('Error fetching post:', error)
    );

    // Fetch comments for the post
    this.apiService.getComments(this.postId).subscribe(
      (response) => this.comments = response,
      (error) => console.error('Error fetching comments:', error)
    );
  }

  addComment(): void {
    if (this.commentForm.invalid) return;

    const newComment = {
      name: this.commentForm.value.name,
      content: this.commentForm.value.content
    };
    console.log("add comment called");

    this.apiService.addComment(this.postId, newComment).subscribe(
      (response) => {
        console.log("add comment called2");
        this.comments.push(response);
        this.commentForm.reset();
      },
      (error) => console.error('Error adding comment:', error)
    );
  }
}

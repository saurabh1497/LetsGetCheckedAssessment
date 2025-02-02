import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  imports: [NgFor, NgIf, ReactiveFormsModule, CommonModule]
})
export class PostDetailComponent implements OnInit {
  post: any;
  comments: any[] = [];
  commentForm: FormGroup;
  postId!: number;
  editingCommentId: any = null;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private fb: FormBuilder
  ) 
  
  {
    this.commentForm = this.fb.group({
      name: ['', Validators.required],
      content: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit(): void {
    this.postId = Number(this.route.snapshot.paramMap.get('id'));

    this.commentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      content: new FormControl('', [Validators.required, Validators.minLength(5)])
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

    this.apiService.addComment(this.postId, newComment).subscribe(
      (response) => {
        this.comments.push(response);
        this.commentForm.reset();
      },
      (error) => console.error('Error adding comment:', error)
    );
  }

  editComment(comment: any): void {
    this.editingCommentId = comment.id; // Track which comment is being edited
    this.commentForm.patchValue({
      name: comment.name,
      content: comment.content
    });
  }

  updateComment(): void {
    if (this.commentForm.invalid) return;

    const updatedComment = {
      name: this.commentForm.value.name,
      content: this.commentForm.value.content
    };

    this.apiService.updateComment(this.editingCommentId, updatedComment).subscribe(
      (response) => {
        const index = this.comments.findIndex(c => c.id === this.editingCommentId);
        if (index !== -1) {
          this.comments[index] = response;
        }
        this.commentForm.reset();
        this.editingCommentId = null;
      },
      (error) => console.error('Error updating comment:', error)
    );
  }

  cancelEdit(): void {
    this.editingCommentId = null;
    this.commentForm.reset();
  }
}
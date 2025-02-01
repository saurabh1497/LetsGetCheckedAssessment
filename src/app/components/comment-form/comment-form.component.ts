import { Component, Input } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
  imports: [FormsModule],
})
export class CommentFormComponent {
  @Input() postId!: number;
  comment = { author: '', text: '' };

  constructor(
    private apiService: ApiService
  ) { }

  onSubmit(): void {
    this.apiService.addComment(this.postId, this.comment).subscribe(() => {
      this.comment = { author: '', text: '' };
    });
  }
}
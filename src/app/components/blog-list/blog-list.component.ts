import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
  imports: [NgFor, NgIf]
})
export class BlogListComponent implements OnInit {
  posts: any[] = [];
  paginatedPosts: any[] = [];
  currentPage: number = 1;
  postsPerPage: number = 5;
  totalPages: number = 1;
  pages: number[] = [];
  sortOrder: 'asc' | 'desc' = 'desc'; // Default: Newest First

  constructor(private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.apiService.getPosts().subscribe(
      (response) => {
        this.posts = response;
        this.sortPosts();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  sortPosts(): void {
    this.posts.sort((a, b) => 
      this.sortOrder === 'desc' 
        ? new Date(b.date).getTime() - new Date(a.date).getTime() 
        : new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    this.totalPages = Math.ceil(this.posts.length / this.postsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.updatePaginatedPosts();
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
    this.sortPosts();
  }

  updatePaginatedPosts(): void {
    const start = (this.currentPage - 1) * this.postsPerPage;
    this.paginatedPosts = this.posts.slice(start, start + this.postsPerPage);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedPosts();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedPosts();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedPosts();
    }
  }

  viewPost(postId: number): void {
    this.router.navigate(['/post', postId]);
  }
}

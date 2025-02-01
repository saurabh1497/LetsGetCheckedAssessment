import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlogListComponent } from './components/blog-list/blog-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BlogListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'blog-app';
}

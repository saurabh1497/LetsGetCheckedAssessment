import { Routes } from '@angular/router';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';

export const routes: Routes = [
    { path: '', component: BlogListComponent },
    { path: 'post/:id', component: PostDetailComponent },
];

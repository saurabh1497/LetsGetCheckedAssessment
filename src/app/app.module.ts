import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { CommonModule, DatePipe } from '@angular/common';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BlogListComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule, 
    RouterModule, 
    HttpClientModule,
    HttpModule,
    RouterLink,
    RouterOutlet,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ], 
  providers: [
    HttpClient,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
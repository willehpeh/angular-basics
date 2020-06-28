import { Injectable } from '@angular/core';
import { Post } from '../models/post';

@Injectable({ providedIn: 'root' })
export class PostsService {

  private posts: Post[] = [];

  getPosts() {
    return [...this.posts];
  }

  clickPost(title: string) {
    alert(title + ' was clicked!');
  }

  addPost(post: Post) {
    this.posts.unshift(post);
  }

  getPostById(id: number) {
    return this.posts[id];
  }
}

import { Injectable } from '@angular/core';
import { Post } from '../models/post';

@Injectable({ providedIn: 'root' })
export class PostsService {

  private posts: Post[] = [
    new Post('Mon premier tweet', 'Voici ce que j\'ai à raconter'),
    new Post('Mon deuxième tweet', 'Voici ce que j\'ai encore à raconter'),
    new Post('Mon troisième tweet', 'Voici ce que j\'ai toujours à raconter'),
  ];

  getPosts() {
    return [...this.posts];
  }

  clickPost(title: string) {
    alert(title + ' was clicked!');
  }

}

import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  postOne: Post;
  postTwo: Post;
  postThree: Post;

  posts: Post[];

  constructor() { }

  ngOnInit(): void {
    this.postOne = new Post('Mon premier tweet', 'Voici ce que j\'ai à raconter');
    this.postTwo = new Post('Mon deuxième tweet', 'Voici ce que j\'ai encore à raconter');
    this.postThree = new Post('Mon troisième tweet', 'Voici ce que j\'ai toujours à raconter');

    this.posts = [this.postOne, this.postTwo, this.postThree];
  }

  onPostClicked(title: string) {
    alert(title + ' was clicked!');
  }

}

import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { PostsService } from '../services/posts.service';

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

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    // this.postOne = new Post('Mon premier tweet', 'Voici ce que j\'ai à raconter');
    // this.postTwo = new Post('Mon deuxième tweet', 'Voici ce que j\'ai encore à raconter');
    // this.postThree = new Post('Mon troisième tweet', 'Voici ce que j\'ai toujours à raconter');
    //
    // this.posts = [this.postOne, this.postTwo, this.postThree];

    this.posts = this.postsService.getPosts();
  }

  onPostClicked(title: string) {
    this.postsService.clickPost(title);
  }

}

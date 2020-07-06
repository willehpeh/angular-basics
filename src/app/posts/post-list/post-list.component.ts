import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostsService } from '../../services/posts.service';
import { concat, Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  postOne: Post;
  postTwo: Post;
  postThree: Post;

  posts: Post[] = [];

  searchForm: FormGroup;

  posts$: Observable<Post[]>;

  constructor(private postsService: PostsService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // this.postOne = new Post('Mon premier tweet', 'Voici ce que j\'ai à raconter');
    // this.postTwo = new Post('Mon deuxième tweet', 'Voici ce que j\'ai encore à raconter');
    // this.postThree = new Post('Mon troisième tweet', 'Voici ce que j\'ai toujours à raconter');
    //
    // this.posts = [this.postOne, this.postTwo, this.postThree];

    // this.posts = this.postsService.getPosts();
    this.searchForm = this.formBuilder.group({
      search: [null]
    });
    this.posts$ = concat(this.postsService.getPosts(), this.searchForm.get('search').valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(console.log),
      // switchMap(searchValue => this.postsService.getPosts().pipe(
      //   map(posts => posts.filter(post => post.user.username.indexOf(searchValue) > -1))
      // ))
    ));
  }

  onPostClicked(title: string) {
    this.postsService.clickPost(title);
  }

}

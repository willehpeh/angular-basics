import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/post';
import { Router } from '@angular/router';
import * as uuid from 'uuid';
import { catchError, tap } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { newPostCreated } from '../store/posts.actions';
import { selectPostsLoading } from '../store/posts.selectors';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  newPostForm: FormGroup;
  loading$: Observable<boolean>;

  constructor(private formBuilder: FormBuilder,
              private postsService: PostsService,
              private router: Router,
              private store: Store) { }

  ngOnInit(): void {
    this.newPostForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      content: [null, [Validators.required]]
    });
    this.loading$ = this.store.select(selectPostsLoading);
  }

  onSubmit() {
    // generate post with form data
    const post = {
      title: this.newPostForm.get('title').value,
      content: this.newPostForm.get('content').value,
      id: uuid.v4(),
      created_at: new Date(),
      userId: 'f63651e8-f2cd-41aa-8216-c7ef5f694d6e'
    }
    this.store.dispatch(newPostCreated({ post }));
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/post';
import { Router } from '@angular/router';
import * as uuid from 'uuid';
import { catchError, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  newPostForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private postsService: PostsService,
              private router: Router) { }

  ngOnInit(): void {
    this.newPostForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      content: [null, [Validators.required]]
    });
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
    this.postsService.addPost(post).pipe(
      // if successful, tap gets executed
      tap(_ => this.router.navigateByUrl('posts')),
      // if not, catchError logs error and returns EMPTY Observable
      catchError(err => {
        console.log(err);
        return EMPTY;
      })
    // subscribe() is acceptable here - HTTP request will either complete or error (even if timed out),
    // so we know there will be no memory leaks
    ).subscribe();
  }

}

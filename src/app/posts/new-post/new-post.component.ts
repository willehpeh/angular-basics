import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/post';
import { Router } from '@angular/router';
import * as uuid from 'uuid';
import { catchError, take, tap } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { PostEntityService } from '../post-entity.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
  animations: [
    trigger('formValidated', [
      state('VALID', style({
        backgroundColor: 'lightgreen'
      })),
      state('INVALID', style({
        backgroundColor: '*'
      })),
      transition('INVALID => VALID', animate('1000ms ease-in')),
      transition('VALID => INVALID', animate('100ms linear'))
    ])
  ]
})
export class NewPostComponent implements OnInit {

  newPostForm: FormGroup;

  loading$: Observable<boolean>;

  constructor(private formBuilder: FormBuilder,
              private postsService: PostsService,
              private router: Router,
              private postEntityService: PostEntityService) { }

  ngOnInit(): void {
    this.newPostForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      content: [null, [Validators.required]]
    });
    this.loading$ = this.postEntityService.loading$;
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
    this.postEntityService.add(post).pipe(
      take(1),
      tap(() => this.router.navigateByUrl('posts'))
    ).subscribe();
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/post';
import { Router } from '@angular/router';

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
    this.postsService.addPost(new Post());
  }

}

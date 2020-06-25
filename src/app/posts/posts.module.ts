import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostItemComponent } from './post-item/post-item.component';
import { PostListComponent } from './post-list/post-list.component';
import { NewPostComponent } from './new-post/new-post.component';
import { PostsRoutingModule } from './posts-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SinglePostComponent } from './single-post/single-post.component';

@NgModule({
  declarations: [
    PostItemComponent,
    PostListComponent,
    NewPostComponent,
    SinglePostComponent,
  ],
  imports: [
    PostsRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class PostsModule { }

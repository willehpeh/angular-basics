import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostItemComponent } from './post-item/post-item.component';
import { PostListComponent } from './post-list/post-list.component';
import { NewPostComponent } from './new-post/new-post.component';
import { PostsRoutingModule } from './posts-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SinglePostComponent } from './single-post/single-post.component';
import { EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { PostEntityService } from './post-entity.service';
import { Post } from '../models/post';

const entityMetadata: EntityMetadataMap = {
  Post: {
    sortComparer: (a: Post, b: Post) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  }
};

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
  ],
  providers: [
    PostEntityService
  ]
})
export class PostsModule {
  constructor(private eds: EntityDefinitionService) {
    eds.registerMetadataMap(entityMetadata);
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { NewPostComponent } from './new-post/new-post.component';
import { AuthGuard } from '../services/auth-guard.service';
import { SinglePostComponent } from './single-post/single-post.component';
import { PostResolver } from '../services/post-resolver.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: PostListComponent },
  { path: 'new', canActivate: [AuthGuard] , component: NewPostComponent },
  { path: ':id', resolve: { post: PostResolver }, component: SinglePostComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PostsRoutingModule {

}

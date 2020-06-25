import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Post } from '../models/post';
import { PostsService } from './posts.service';

@Injectable({ providedIn: 'root' })
export class PostResolver implements Resolve<Post> {

  constructor(private postsService: PostsService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Post {
    return this.postsService.getPostById(+route.params.id);
  }
}

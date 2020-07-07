import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { HttpClient } from '@angular/common/http';
import { concatMap, exhaustMap, map, mergeMap, switchMap, tap, toArray } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class PostsService {

  private posts: Post[] = [];

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiUrl}/posts`);
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.apiUrl}/posts/${id}`).pipe(
      mergeMap(post => this.http.get<User>(`${environment.apiUrl}/users/${post.userId}`).pipe(
        map(user => ({...post, user}))
      ))
    );
  }

  clickPost(title: string) {
    alert(title + ' was clicked!');
  }

  addPost(post: Post) {
    return this.http.post<any>(`${environment.apiUrl}/posts`, post);
  }

}

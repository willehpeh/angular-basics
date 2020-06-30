import { Injectable } from '@angular/core';
import { BackendPost, Post } from '../models/post';
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
    return this.http.get<BackendPost[]>(`${environment.apiUrl}/posts`).pipe(
      mergeMap((posts: BackendPost[]) => from(posts)),
      mergeMap((post: BackendPost) => this.http.get<User>(`${environment.apiUrl}/users/${post.userId}`).pipe(
        // generate Date object as well as populating User
        map((user: User) => ({ ...post, created_at: new Date(post.created_at), user }))
      )),
      toArray(),
      // sort posts by created Date, latest to earliest
      map(posts => posts.sort((a, b) => b.created_at.getTime() - a.created_at.getTime()))
    );
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<BackendPost>(`${environment.apiUrl}/posts/${id}`).pipe(
      mergeMap(post => this.http.get<User>(`${environment.apiUrl}/users/${post.userId}`).pipe(
        map(user => ({...post, user}))
      ))
    );
  }

  clickPost(title: string) {
    alert(title + ' was clicked!');
  }

  addPost(post: BackendPost) {
    return this.http.post<any>(`${environment.apiUrl}/posts`, post);
  }

}

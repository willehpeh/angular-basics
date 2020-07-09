import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { HttpClient } from '@angular/common/http';
import { concatMap, exhaustMap, map, mergeMap, switchMap, tap, toArray } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class PostsService {

  private posts: Post[] = [];

  private posts$: BehaviorSubject<Post[]>;

  constructor(private http: HttpClient) {}

  getPosts$(): Observable<Post[]> {
    return of(this.posts);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiUrl}/posts`).pipe(
      mergeMap((posts: Post[]) => from(posts)),
      mergeMap((post: Post) => this.http.get<User>(`${environment.apiUrl}/users/${post.userId}`).pipe(
        // generate Date object as well as populating User
        map((user: User) => ({ ...post, created_at: new Date(post.created_at), user }))
      )),
      toArray(),
      // sort posts by created Date, latest to earliest
      map(posts => posts.sort((a, b) => b.created_at.getTime() - a.created_at.getTime()))
    );
  }

  getJustPosts() {
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

  getStaticPosts() {
    return this.posts;
  }

}

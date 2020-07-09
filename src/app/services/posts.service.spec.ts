import { PostsService } from './posts.service';
import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { DUMMYPOSTS, DUMMYUSERS } from '../tests/dummy-posts';

describe('PostsService', () => {

  let postsService: PostsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        PostsService
      ]
    });
    postsService = TestBed.inject(PostsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should return the posts', () => {
    const posts = postsService.getStaticPosts();
    expect(posts.length).toBe(0, 'Array should be empty');
  });

  it('should return the posts from the server', () => {
    postsService.getJustPosts().subscribe(posts => {
      expect(posts).toBeTruthy();
      expect(posts.length).toBe(DUMMYPOSTS.length);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/posts`);
    expect(req.request.method).toBe('GET');

    req.flush(DUMMYPOSTS);
  });

  it('should get posts from server, add users, and create Dates', fakeAsync(() => {
    postsService.getPosts().subscribe(posts => {
      expect(posts).toBeTruthy();
      expect(posts.length).toBe(2);
      const janesPost = posts.find(post => post.title === 'My post');
      expect(janesPost['user'].username).toBe('Jane');
    });

    const postsReq = httpTestingController.expectOne(`${environment.apiUrl}/posts`);
    expect(postsReq.request.method).toBe('GET');

    postsReq.flush([DUMMYPOSTS[0], DUMMYPOSTS[1]]);

    const userReq1 = httpTestingController.expectOne(`${environment.apiUrl}/users/${DUMMYPOSTS[0].userId}`);
    expect(userReq1.request.method).toBe('GET');

    userReq1.flush(DUMMYUSERS[0]);

    const userReq2 = httpTestingController.expectOne(`${environment.apiUrl}/users/${DUMMYPOSTS[1].userId}`);
    expect(userReq2.request.method).toBe('GET');

    userReq2.flush(DUMMYUSERS[1]);
  }));

  afterEach(() => {
    httpTestingController.verify();
  });

});

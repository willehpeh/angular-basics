import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PostListComponent } from './post-list.component';
import SpyObj = jasmine.SpyObj;
import { PostsService } from '../../services/posts.service';
import { PostEntityService } from '../post-entity.service';
import { PostItemComponent } from '../post-item/post-item.component';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DUMMYPOSTS } from '../../tests/dummy-posts';
import { Router } from '@angular/router';

describe('PostListComponent', () => {

  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;

  let postsServiceSpy: SpyObj<PostsService>;
  let postEntityService: any;
  let router: SpyObj<Router>;

  beforeEach(async(() => {

    postsServiceSpy = jasmine.createSpyObj(PostsService, ['clickPost']);
    router = jasmine.createSpyObj(Router, ['navigate']);
    postEntityService = {
      entities$: null,
      loaded$: null,
      getAll: () => {}
    };

    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        NoopAnimationsModule
      ],
      declarations: [
        PostListComponent,
        PostItemComponent
      ],
      providers: [
        FormBuilder,
        { provide: PostsService, useValue: postsServiceSpy },
        { provide: PostEntityService, useValue: postEntityService },
        { provide: Router, useValue: router }
      ]
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(PostListComponent);
      component = fixture.componentInstance;
    });

  }));

  it('should call getAll() if posts not loaded', () => {
    postEntityService.entities$ = of('');
    postEntityService.loaded$ = of(false);
    postEntityService.getAll = createSpy('getAll');
    fixture.detectChanges();

    expect(postEntityService.getAll).toHaveBeenCalledTimes(1);
  });

  it('should not call getAll() if posts loaded', () => {
    postEntityService.entities$ = of('');
    postEntityService.loaded$ = of(true);
    postEntityService.getAll = createSpy('getAll');
    fixture.detectChanges();

    expect(postEntityService.getAll).toHaveBeenCalledTimes(0);
  });

  it('should display all the posts', () => {
    postEntityService.entities$ = of(DUMMYPOSTS);
    postEntityService.loaded$ = of(true);
    fixture.detectChanges();

    const posts = fixture.nativeElement.querySelectorAll('app-post-item');
    expect(posts.length).toBe(DUMMYPOSTS.length);
  });

});

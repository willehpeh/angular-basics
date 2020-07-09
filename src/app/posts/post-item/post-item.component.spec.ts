import { PostItemComponent } from './post-item.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import SpyObj = jasmine.SpyObj;
import { Router } from '@angular/router';
import { DUMMYPOSTS } from '../../tests/dummy-posts';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PostItemComponent', () => {

  let component: PostItemComponent;
  let fixture: ComponentFixture<PostItemComponent>;

  let router: SpyObj<Router>;

  beforeEach(async(() => {
    router = jasmine.createSpyObj(Router, ['navigate']);

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        PostItemComponent
      ],
      providers: [
        { provide: Router, useValue: router }
      ]
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(PostItemComponent);
      component = fixture.componentInstance;
    });

  }));

  it('should display the correct post', () => {
    component.post = { ...DUMMYPOSTS[0], created_at: new Date(DUMMYPOSTS[0].created_at) };
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('mat-card-title').innerText;

    expect(title).toBe(DUMMYPOSTS[0].title);
  });

  it('should enter dark mode when button is clicked', () => {
    component.post = { ...DUMMYPOSTS[0], created_at: new Date(DUMMYPOSTS[0].created_at) };
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    const card = fixture.nativeElement.querySelector('mat-card');
    button.click();
    fixture.detectChanges();
    expect(card.style.backgroundColor).toBe('black');
  });

})

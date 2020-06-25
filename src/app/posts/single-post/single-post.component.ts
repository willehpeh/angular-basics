import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Post } from '../../models/post';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {

  post$: Observable<Post>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.post$ = this.route.data.pipe(
      map(data => data.post)
    );
  }

}

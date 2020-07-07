import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Post } from '../models/post';

@Injectable()
export class PostEntityService extends EntityCollectionServiceBase<Post> {
  constructor(private elements: EntityCollectionServiceElementsFactory) {
    super('Post', elements);
  }
}

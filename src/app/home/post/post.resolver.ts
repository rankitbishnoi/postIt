import { Injectable } from '@angular/core';

import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from '../../../models/post.modal';
import { PostService } from '../services/post/post.service';

@Injectable()
export class PostResolver implements Resolve<Post> {
  constructor(private postService: PostService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Post> {
    return this.postService.getPostById(parseInt(route.params['id'], 10));
  }
}

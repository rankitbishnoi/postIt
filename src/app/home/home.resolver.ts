import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';
import { PostService } from './services/post/post.service';
import { Observable, forkJoin } from 'rxjs';
import { Post } from '../../models/post.modal';
import { UserService } from './services/user/user.service';
import { User } from '../../models/user.modal';

@Injectable()
export class HomeResolver implements Resolve<[Post[], User[]]> {
  constructor(
    private postService: PostService,
    private userService: UserService
  ) {}

  resolve(): Observable<[Post[], User[]]> {
    return forkJoin(
      this.postService.getAllPosts(),
      this.userService.getAllUsers()
    );
  }
}

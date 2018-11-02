import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store/store.service';
import { User } from '../../../models/user.modal';
import { PostService } from '../services/post/post.service';
import { noop } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  public userList: User[];

  constructor(
    private store: StoreService,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userList = this.store.getAllUsers();
  }

  createPost(data) {
    this.postService
      .createPost(data.title, data.body, data.authorId)
      .pipe(
        tap(response => {
          const tempObj = {
            id: response.id,
            title: data.title,
            body: data.body,
            userId: data.authorId
          };
          this.store.addNewPost(tempObj);
          this.router.navigate(['/', 'post', response.id]);
        })
      )
      .subscribe(noop);
  }
}

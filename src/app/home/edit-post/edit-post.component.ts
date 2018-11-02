import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.modal';
import { StoreService } from '../store/store.service';
import { PostService } from '../services/post/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { noop } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Post } from '../../../models/post.modal';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  public userList: User[];
  public post: Post;

  constructor(
    private store: StoreService,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.post = this.route.snapshot.data.post;
    this.userList = this.store.getAllUsers();
  }

  savePost(data) {
    const tempObj: Post = {
      id: data.id,
      title: data.title,
      body: data.body,
      userId: data.authorId
    };

    this.postService
      .updatePost(tempObj)
      .pipe(
        tap(response => {
          this.store.updatePost(tempObj);
          this.router.navigate(['/', 'post', response.id]);
        })
      )
      .subscribe(noop);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../../models/post.modal';
import { PostService } from '../services/post/post.service';
import { StoreService } from '../store/store.service';
import { tap } from 'rxjs/operators';
import { noop } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  public post: Post;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private store: StoreService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(value => {
      this.post = this.route.snapshot.data.post;
    });
  }

  delete() {
    this.postService.deletePost(this.post.id).subscribe(response => {
      this.store.deletePost(this.post.id);
      this.router.navigate(['/']);
    });
  }
}

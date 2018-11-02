import { Component, OnInit } from '@angular/core';
import {
  Router,
  RouterEvent,
  NavigationEnd,
  ActivatedRoute
} from '@angular/router';
import { Post } from '../../models/post.modal';
import { User } from '../../models/user.modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public postList: Post[] = [];
  public userList: User[] = [];
  public showList = true;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.initData();
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.initData();
      }
    });
  }

  initData() {
    // post list fetched by the resolver
    const data = this.route.snapshot.data.list;
    if (data) {
      this.postList = data[0];
      this.userList = data[1];
    }
  }
}

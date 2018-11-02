import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../../models/user.modal';
import { Post } from '../../../models/post.modal';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  public postId: number;
  public body: string;
  public title: string;
  public author: User;
  public authorName = '';
  public _userList: User[];
  public _post: Post;
  public showErrorMsg = false;

  public openDropdownMenu = false;

  @Input()
  set post(data: Post) {
    this._post = data;
    if (data) {
      this.postId = data.id;
      this.body = data.body;
      this.title = data.title;
    }
  }

  get post() {
    return this._post;
  }

  @Input()
  set userList(data: User[]) {
    this._userList = data;
  }

  get userList() {
    return this._userList;
  }

  @Output()
  formSubmited = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  createPost(formData: NgForm) {
    const title = formData.value.title;
    const body = formData.value.body;
    const authorId = this.author ? this.author.id : undefined;

    this.showErrorMsg = false;

    if (this.validateFormData(title, body, authorId)) {
      this.formSubmited.emit({ title, body, authorId, id: this.postId });
    } else {
      this.showErrorMsg = true;
    }
  }

  validateFormData(title, body, authorId) {
    if (
      title &&
      body &&
      authorId &&
      title !== '' &&
      body !== '' &&
      authorId !== 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  openDropdown() {
    this.openDropdownMenu = !this.openDropdownMenu;
  }
}
